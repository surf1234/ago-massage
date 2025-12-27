import { describe, it, expect } from "vitest";

describe("Available Slots Logic", () => {
  it("should return all slots when no bookings exist", () => {
    const allSlots = Array.from({ length: 11 }, (_, i) => {
      const hour = 11 + i;
      return { hour, time: `${hour}:00` };
    });

    const bookings: any[] = [];
    const bookedHours = new Set<number>();
    const duration = 60;

    const availableSlots = allSlots
      .filter(slot => !bookedHours.has(slot.hour))
      .map(slot => slot.time);

    expect(availableSlots).toHaveLength(11);
    expect(availableSlots[0]).toBe("11:00");
    expect(availableSlots[10]).toBe("21:00");
  });

  it("should exclude booked time slots", () => {
    const allSlots = Array.from({ length: 11 }, (_, i) => {
      const hour = 11 + i;
      return { hour, time: `${hour}:00` };
    });

    const year = 2025;
    const month = 1;
    const day = 1;
    const duration = 60;

    // Mock a booking from 14:00 to 15:00
    const bookings = [
      {
        reservationDate: new Date(year, month - 1, day, 14, 0, 0),
        duration: 60,
      },
    ];

    const bookedHours = new Set<number>();
    bookings.forEach(booking => {
      const bookingStart = new Date(booking.reservationDate);
      const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);

      allSlots.forEach(slot => {
        const slotStart = new Date(year, month - 1, day, slot.hour, 0, 0);
        const slotEnd = new Date(slotStart.getTime() + duration * 60000);

        if (slotStart < bookingEnd && slotEnd > bookingStart) {
          bookedHours.add(slot.hour);
        }
      });
    });

    const availableSlots = allSlots
      .filter(slot => !bookedHours.has(slot.hour))
      .map(slot => slot.time);

    expect(availableSlots).not.toContain("14:00");
    expect(availableSlots).toContain("13:00");
    expect(availableSlots).toContain("15:00");
    expect(availableSlots).toHaveLength(10);
  });

  it("should exclude overlapping slots for longer duration bookings", () => {
    const allSlots = Array.from({ length: 11 }, (_, i) => {
      const hour = 11 + i;
      return { hour, time: `${hour}:00` };
    });

    const year = 2025;
    const month = 1;
    const day = 1;
    const duration = 90; // 90-minute booking

    // Mock a booking from 13:00 to 14:30
    const bookings = [
      {
        reservationDate: new Date(year, month - 1, day, 13, 0, 0),
        duration: 90,
      },
    ];

    const bookedHours = new Set<number>();
    bookings.forEach(booking => {
      const bookingStart = new Date(booking.reservationDate);
      const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);

      allSlots.forEach(slot => {
        const slotStart = new Date(year, month - 1, day, slot.hour, 0, 0);
        const slotEnd = new Date(slotStart.getTime() + duration * 60000);

        if (slotStart < bookingEnd && slotEnd > bookingStart) {
          bookedHours.add(slot.hour);
        }
      });
    });

    const availableSlots = allSlots
      .filter(slot => !bookedHours.has(slot.hour))
      .map(slot => slot.time);

    // 13:00-14:30 booking conflicts with both 13:00 and 14:00 slots
    expect(availableSlots).not.toContain("13:00");
    expect(availableSlots).not.toContain("14:00");
    expect(availableSlots).toContain("15:00");
    expect(availableSlots).toHaveLength(8);
  });

  it("should handle multiple bookings", () => {
    const allSlots = Array.from({ length: 11 }, (_, i) => {
      const hour = 11 + i;
      return { hour, time: `${hour}:00` };
    });

    const year = 2025;
    const month = 1;
    const day = 1;
    const duration = 60;

    // Mock multiple bookings
    const bookings = [
      {
        reservationDate: new Date(year, month - 1, day, 12, 0, 0),
        duration: 60,
      },
      {
        reservationDate: new Date(year, month - 1, day, 15, 0, 0),
        duration: 60,
      },
      {
        reservationDate: new Date(year, month - 1, day, 18, 0, 0),
        duration: 60,
      },
    ];

    const bookedHours = new Set<number>();
    bookings.forEach(booking => {
      const bookingStart = new Date(booking.reservationDate);
      const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);

      allSlots.forEach(slot => {
        const slotStart = new Date(year, month - 1, day, slot.hour, 0, 0);
        const slotEnd = new Date(slotStart.getTime() + duration * 60000);

        if (slotStart < bookingEnd && slotEnd > bookingStart) {
          bookedHours.add(slot.hour);
        }
      });
    });

    const availableSlots = allSlots
      .filter(slot => !bookedHours.has(slot.hour))
      .map(slot => slot.time);

    expect(availableSlots).not.toContain("12:00");
    expect(availableSlots).not.toContain("15:00");
    expect(availableSlots).not.toContain("18:00");
    expect(availableSlots).toHaveLength(8);
  });
});
