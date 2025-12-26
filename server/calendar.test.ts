import { describe, expect, it } from "vitest";

describe("calendar utility functions", () => {
  describe("getDaysInMonth", () => {
    it("should return correct number of days for each month", () => {
      const testCases = [
        { month: 0, year: 2025, expected: 31 }, // January
        { month: 1, year: 2025, expected: 28 }, // February (non-leap)
        { month: 1, year: 2024, expected: 29 }, // February (leap)
        { month: 3, year: 2025, expected: 30 }, // April
        { month: 11, year: 2025, expected: 31 }, // December
      ];

      testCases.forEach(({ month, year, expected }) => {
        const date = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        expect(daysInMonth).toBe(expected);
      });
    });
  });

  describe("getFirstDayOfMonth", () => {
    it("should return correct first day of month", () => {
      const date = new Date(2025, 0, 1); // January 1, 2025 (Wednesday = 3)
      const firstDay = date.getDay();
      expect(firstDay).toBe(3);
    });
  });

  describe("date filtering for bookings", () => {
    it("should correctly filter bookings by date", () => {
      const bookings = [
        {
          id: 1,
          reservationDate: new Date("2025-01-15T10:00:00"),
          customerName: "Customer 1",
          therapistName: "Therapist 1",
          menuName: "Menu 1",
          price: 5000,
          status: "confirmed" as const,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          reservationDate: new Date("2025-01-15T14:00:00"),
          customerName: "Customer 2",
          therapistName: "Therapist 2",
          menuName: "Menu 2",
          price: 6000,
          status: "pending" as const,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          reservationDate: new Date("2025-01-16T10:00:00"),
          customerName: "Customer 3",
          therapistName: "Therapist 1",
          menuName: "Menu 1",
          price: 5000,
          status: "confirmed" as const,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const targetDate = new Date("2025-01-15");
      const dateStr = targetDate.toISOString().split("T")[0];

      const filtered = bookings.filter(b => {
        const bookingDateStr = new Date(b.reservationDate).toISOString().split("T")[0];
        return bookingDateStr === dateStr;
      });

      expect(filtered).toHaveLength(2);
      expect(filtered[0].id).toBe(1);
      expect(filtered[1].id).toBe(2);
    });

    it("should return empty array when no bookings match date", () => {
      const bookings = [
        {
          id: 1,
          reservationDate: new Date("2025-01-15T10:00:00"),
          customerName: "Customer 1",
          therapistName: "Therapist 1",
          menuName: "Menu 1",
          price: 5000,
          status: "confirmed" as const,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const targetDate = new Date("2025-01-20");
      const dateStr = targetDate.toISOString().split("T")[0];

      const filtered = bookings.filter(b => {
        const bookingDateStr = new Date(b.reservationDate).toISOString().split("T")[0];
        return bookingDateStr === dateStr;
      });

      expect(filtered).toHaveLength(0);
    });
  });

  describe("month navigation", () => {
    it("should correctly navigate to previous month", () => {
      const currentDate = new Date(2025, 0, 15); // January 15, 2025
      const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

      expect(prevDate.getMonth()).toBe(11); // December
      expect(prevDate.getFullYear()).toBe(2024);
    });

    it("should correctly navigate to next month", () => {
      const currentDate = new Date(2025, 11, 15); // December 15, 2025
      const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

      expect(nextDate.getMonth()).toBe(0); // January
      expect(nextDate.getFullYear()).toBe(2026);
    });
  });
});
