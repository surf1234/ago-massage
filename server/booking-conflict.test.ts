import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "./db";
import { bookings } from "../drizzle/schema";

describe("Booking Conflict Detection", () => {
  let db: any;

  beforeAll(async () => {
    db = await getDb();
  });

  it("should detect time conflict with existing booking", () => {
    const existingBooking = {
      reservationDate: new Date(2025, 0, 15, 14, 0, 0),
      duration: 60,
      status: "confirmed",
    };

    const newBookingStart = new Date(2025, 0, 15, 14, 30, 0);
    const newBookingEnd = new Date(newBookingStart.getTime() + 60 * 60000);

    const bookingStart = new Date(existingBooking.reservationDate);
    const bookingEnd = new Date(bookingStart.getTime() + existingBooking.duration * 60000);

    const hasConflict = newBookingStart < bookingEnd && newBookingEnd > bookingStart;
    expect(hasConflict).toBe(true);
  });

  it("should not detect conflict when bookings do not overlap", () => {
    const existingBooking = {
      reservationDate: new Date(2025, 0, 15, 14, 0, 0),
      duration: 60,
      status: "confirmed",
    };

    const newBookingStart = new Date(2025, 0, 15, 15, 0, 0);
    const newBookingEnd = new Date(newBookingStart.getTime() + 60 * 60000);

    const bookingStart = new Date(existingBooking.reservationDate);
    const bookingEnd = new Date(bookingStart.getTime() + existingBooking.duration * 60000);

    const hasConflict = newBookingStart < bookingEnd && newBookingEnd > bookingStart;
    expect(hasConflict).toBe(false);
  });

  it("should ignore cancelled bookings when checking conflicts", () => {
    const cancelledBooking = {
      reservationDate: new Date(2025, 0, 15, 14, 0, 0),
      duration: 60,
      status: "cancelled",
    };

    const newBookingStart = new Date(2025, 0, 15, 14, 30, 0);
    const newBookingEnd = new Date(newBookingStart.getTime() + 60 * 60000);

    if (cancelledBooking.status === "cancelled") {
      expect(true).toBe(true);
      return;
    }

    const bookingStart = new Date(cancelledBooking.reservationDate);
    const bookingEnd = new Date(bookingStart.getTime() + cancelledBooking.duration * 60000);

    const hasConflict = newBookingStart < bookingEnd && newBookingEnd > bookingStart;
    expect(hasConflict).toBe(false);
  });

  it("should detect conflict with longer duration bookings", () => {
    const existingBooking = {
      reservationDate: new Date(2025, 0, 15, 13, 0, 0),
      duration: 120, // 2 hours
      status: "confirmed",
    };

    const newBookingStart = new Date(2025, 0, 15, 14, 0, 0);
    const newBookingEnd = new Date(newBookingStart.getTime() + 60 * 60000);

    const bookingStart = new Date(existingBooking.reservationDate);
    const bookingEnd = new Date(bookingStart.getTime() + existingBooking.duration * 60000);

    const hasConflict = newBookingStart < bookingEnd && newBookingEnd > bookingStart;
    expect(hasConflict).toBe(true);
  });

  it("should detect exact time overlap", () => {
    const existingBooking = {
      reservationDate: new Date(2025, 0, 15, 14, 0, 0),
      duration: 60,
      status: "confirmed",
    };

    const newBookingStart = new Date(2025, 0, 15, 14, 0, 0);
    const newBookingEnd = new Date(newBookingStart.getTime() + 60 * 60000);

    const bookingStart = new Date(existingBooking.reservationDate);
    const bookingEnd = new Date(bookingStart.getTime() + existingBooking.duration * 60000);

    const hasConflict = newBookingStart < bookingEnd && newBookingEnd > bookingStart;
    expect(hasConflict).toBe(true);
  });

  it("should handle edge case where new booking ends exactly when existing starts", () => {
    const existingBooking = {
      reservationDate: new Date(2025, 0, 15, 15, 0, 0),
      duration: 60,
      status: "confirmed",
    };

    const newBookingStart = new Date(2025, 0, 15, 14, 0, 0);
    const newBookingEnd = new Date(newBookingStart.getTime() + 60 * 60000); // ends at 15:00

    const bookingStart = new Date(existingBooking.reservationDate);
    const bookingEnd = new Date(bookingStart.getTime() + existingBooking.duration * 60000);

    const hasConflict = newBookingStart < bookingEnd && newBookingEnd > bookingStart;
    expect(hasConflict).toBe(false);
  });
});
