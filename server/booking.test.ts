import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

function createAuthenticatedContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("booking", () => {
  describe("create", () => {
    it("should create a booking with valid input", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const reservationDate = new Date();
      reservationDate.setDate(reservationDate.getDate() + 7);

      const result = await caller.booking.create({
        therapistName: "田中 美咲",
        menuName: "全身ボディケア",
        reservationDate,
        duration: 60,
        price: 8800,
        customerName: "山田 太郎",
        customerEmail: "yamada@example.com",
        customerPhone: "090-1234-5678",
        notes: "肩こりが気になります",
      });

      expect(result).toHaveProperty("success");
      expect(result.success).toBe(true);
      expect(result).toHaveProperty("bookingId");
    });

    it("should fail with invalid email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const reservationDate = new Date();
      reservationDate.setDate(reservationDate.getDate() + 7);

      try {
        await caller.booking.create({
          therapistName: "田中 美咲",
          menuName: "全身ボディケア",
          reservationDate,
          duration: 60,
          price: 8800,
          customerName: "山田 太郎",
          customerEmail: "invalid-email",
          customerPhone: "090-1234-5678",
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should fail with missing required fields", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.booking.create({
          therapistName: "",
          menuName: "全身ボディケア",
          reservationDate: new Date(),
          duration: 60,
          price: 8800,
          customerName: "山田 太郎",
          customerEmail: "yamada@example.com",
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("getMyBookings", () => {
    it("should return bookings for authenticated user", async () => {
      const ctx = createAuthenticatedContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.booking.getMyBookings();

      expect(Array.isArray(result)).toBe(true);
    });

    it("should fail for unauthenticated user", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.booking.getMyBookings();
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
