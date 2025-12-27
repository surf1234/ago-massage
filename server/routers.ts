import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createBooking, getBookingsByUserId, getAllBookings, updateBookingStatus, getBookingStats, getBookingsByDateAndTherapist } from "./db";
import type { Booking } from "../drizzle/schema";

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
          // 時間帯の重複チェック
          const startDate = new Date(input.reservationDate);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 1);

          const existingBookings = await getBookingsByDateAndTherapist(
            input.therapistName,
            startDate,
            endDate
          );

          const newBookingStart = new Date(input.reservationDate);
          const newBookingEnd = new Date(newBookingStart.getTime() + input.duration * 60000);

          for (const booking of existingBookings) {
            if (booking.status === 'cancelled') continue;
            
            const bookingStart = new Date(booking.reservationDate);
            const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);

            if (newBookingStart < bookingEnd && newBookingEnd > bookingStart) {
              throw new Error("この時間帯は既に予約が入っています。別の時間をお選びください。");
            }
          }

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
          throw error instanceof Error ? error : new Error("予約の作成に失敗しました");
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

    getAllBookings: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error("管理者のみアクセス可能");
        }
        try {
          const bookings = await getAllBookings();
          return bookings;
        } catch (error) {
          console.error("Failed to get all bookings:", error);
          return [];
        }
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        bookingId: z.number(),
        status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error("管理者のみアクセス可能");
        }
        try {
          await updateBookingStatus(input.bookingId, input.status);
          return { success: true };
        } catch (error) {
          console.error("Failed to update booking status:", error);
          throw new Error("予約ステータスの更新に失敗しました");
        }
      }),

    getStats: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error("管理者のみアクセス可能");
        }
        try {
          const stats = await getBookingStats();
          return stats;
        } catch (error) {
          console.error("Failed to get booking stats:", error);
          return { total: 0, confirmed: 0, pending: 0, completed: 0, cancelled: 0, totalRevenue: 0 };
        }
      }),

    getAvailableSlots: publicProcedure
      .input(z.object({
        date: z.string(),
        therapistName: z.string(),
        duration: z.number().int().positive(),
      }))
      .query(async ({ input }) => {
        try {
          const [year, month, day] = input.date.split("-").map(Number);
          const dateStart = new Date(year, month - 1, day, 0, 0, 0);
          const dateEnd = new Date(year, month - 1, day, 23, 59, 59);

          const bookings = await getBookingsByDateAndTherapist(input.therapistName, dateStart, dateEnd);

          // 15分刻みのスロットを生成（11:00～21:45）
          const allSlots: { hour: number; minute: number; time: string }[] = [];
          for (let hour = 11; hour <= 21; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
              const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              allSlots.push({ hour, minute, time: timeStr });
            }
          }

          const bookedSlots = new Set<string>();
          bookings.forEach((booking: Booking) => {
            if (booking.status === 'cancelled') return;
            
            const bookingStart = new Date(booking.reservationDate);
            const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);

            allSlots.forEach(slot => {
              const slotStart = new Date(year, month - 1, day, slot.hour, slot.minute, 0);
              const slotEnd = new Date(slotStart.getTime() + input.duration * 60000);

              if (slotStart < bookingEnd && slotEnd > bookingStart) {
                bookedSlots.add(slot.time);
              }
            });
          });

          const availableSlots = allSlots
            .filter(slot => !bookedSlots.has(slot.time))
            .map(slot => slot.time);

          return availableSlots;
        } catch (error) {
          console.error("Failed to get available slots:", error);
          return [];
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
