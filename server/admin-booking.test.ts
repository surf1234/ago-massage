import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
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

function createRegularUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
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

describe("admin booking management", () => {
  describe("getAllBookings", () => {
    it("should return all bookings for admin", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.booking.getAllBookings();

      expect(Array.isArray(result)).toBe(true);
    });

    it("should deny access for regular users", async () => {
      const ctx = createRegularUserContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.booking.getAllBookings();
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
        expect((error as Error).message).toContain("管理者");
      }
    });
  });

  describe("updateStatus", () => {
    it("should update booking status for admin", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.booking.updateStatus({
        bookingId: 999,
        status: "confirmed",
      });

      expect(result).toHaveProperty("success");
      expect(result.success).toBe(true);
    });

    it("should deny status update for regular users", async () => {
      const ctx = createRegularUserContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.booking.updateStatus({
          bookingId: 999,
          status: "confirmed",
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
        expect((error as Error).message).toContain("管理者");
      }
    });
  });

  describe("getStats", () => {
    it("should return booking statistics for admin", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.booking.getStats();

      expect(result).toHaveProperty("total");
      expect(result).toHaveProperty("confirmed");
      expect(result).toHaveProperty("pending");
      expect(result).toHaveProperty("completed");
      expect(result).toHaveProperty("cancelled");
      expect(result).toHaveProperty("totalRevenue");
      expect(typeof result.total).toBe("number");
    });

    it("should deny stats access for regular users", async () => {
      const ctx = createRegularUserContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.booking.getStats();
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
        expect((error as Error).message).toContain("管理者");
      }
    });
  });
});
