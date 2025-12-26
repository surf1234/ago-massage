import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createBooking, getBookingsByUserId } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  booking: router({
    create: publicProcedure
      .input(z.object({
        therapistName: z.string().min(1),
        menuName: z.string().min(1),
        reservationDate: z.date(),
        duration: z.number().int().positive(),
        price: z.number().int().positive(),
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          const userId = ctx.user?.id || 0;
          const result = await createBooking({
            userId,
            therapistName: input.therapistName,
            menuName: input.menuName,
            reservationDate: input.reservationDate,
            duration: input.duration,
            price: input.price,
            customerName: input.customerName,
            customerEmail: input.customerEmail,
            customerPhone: input.customerPhone,
            notes: input.notes,
            status: "pending",
          });
          return { success: true, bookingId: (result as any)?.insertId || 0 };
        } catch (error) {
          console.error("Failed to create booking:", error);
          throw new Error("予約の作成に失敗しました");
        }
      }),

    getMyBookings: protectedProcedure
      .query(async ({ ctx }) => {
        try {
          const bookings = await getBookingsByUserId(ctx.user.id);
          return bookings;
        } catch (error) {
          console.error("Failed to get bookings:", error);
          return [];
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
