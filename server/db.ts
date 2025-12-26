import { eq, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, bookings, InsertBooking, Booking } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Booking-related queries
export async function createBooking(booking: InsertBooking) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create booking: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(bookings).values(booking);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create booking:", error);
    throw error;
  }
}

export async function getBookingsByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }

  try {
    const result = await db.select().from(bookings).where(eq(bookings.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get bookings:", error);
    return [];
  }
}

// Get all bookings (for admin dashboard)
export async function getAllBookings() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }

  try {
    const result = await db.select().from(bookings).orderBy(bookings.reservationDate);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get all bookings:", error);
    return [];
  }
}

// Get bookings by status
export async function getBookingsByStatus(status: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }

  try {
    const result = await db.select().from(bookings).where(eq(bookings.status, status as any));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get bookings by status:", error);
    return [];
  }
}

// Update booking status
export async function updateBookingStatus(bookingId: number, status: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update booking: database not available");
    return undefined;
  }

  try {
    const result = await db.update(bookings)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(bookings.id, bookingId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update booking status:", error);
    throw error;
  }
}

// Get booking by ID
export async function getBookingById(bookingId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get booking: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get booking:", error);
    return undefined;
  }
}

// Get bookings by date range
export async function getBookingsByDateRange(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }

  try {
    const result = await db.select().from(bookings)
      .where(and(
        gte(bookings.reservationDate, startDate),
        lte(bookings.reservationDate, endDate)
      ));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get bookings by date range:", error);
    return [];
  }
}

// Get booking statistics
export async function getBookingStats() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get stats: database not available");
    return { total: 0, confirmed: 0, pending: 0, completed: 0, cancelled: 0, totalRevenue: 0 };
  }

  try {
    const allBookings = await db.select().from(bookings);
    const stats = {
      total: allBookings.length,
      confirmed: allBookings.filter(b => b.status === 'confirmed').length,
      pending: allBookings.filter(b => b.status === 'pending').length,
      completed: allBookings.filter(b => b.status === 'completed').length,
      cancelled: allBookings.filter(b => b.status === 'cancelled').length,
      totalRevenue: allBookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + b.price, 0)
    };
    return stats;
  } catch (error) {
    console.error("[Database] Failed to get booking stats:", error);
    return { total: 0, confirmed: 0, pending: 0, completed: 0, cancelled: 0, totalRevenue: 0 };
  }
}
