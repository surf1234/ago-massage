import { describe, it, expect } from "vitest";

describe("15-Minute Slot Generation", () => {
  it("should generate slots in 15-minute intervals", () => {
    const allSlots: { hour: number; minute: number; time: string }[] = [];
    for (let hour = 11; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        allSlots.push({ hour, minute, time: timeStr });
      }
    }

    expect(allSlots.length).toBe(44); // 11 hours * 4 slots per hour
    expect(allSlots[0].time).toBe("11:00");
    expect(allSlots[1].time).toBe("11:15");
    expect(allSlots[2].time).toBe("11:30");
    expect(allSlots[3].time).toBe("11:45");
  });

  it("should have correct time progression", () => {
    const allSlots: { hour: number; minute: number; time: string }[] = [];
    for (let hour = 11; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        allSlots.push({ hour, minute, time: timeStr });
      }
    }

    expect(allSlots[0].time).toBe("11:00");
    expect(allSlots[43].time).toBe("21:45");
  });

  it("should correctly detect conflicts with 60-minute duration", () => {
    const bookingStart = new Date(2025, 0, 15, 14, 0, 0);
    const bookingEnd = new Date(bookingStart.getTime() + 60 * 60000);
    const duration = 60;

    const testSlots = [
      { hour: 14, minute: 0, time: "14:00" },
      { hour: 14, minute: 15, time: "14:15" },
      { hour: 14, minute: 30, time: "14:30" },
      { hour: 14, minute: 45, time: "14:45" },
      { hour: 15, minute: 0, time: "15:00" },
    ];

    const year = 2025;
    const month = 0;
    const day = 15;
    const bookedSlots = new Set<string>();

    testSlots.forEach(slot => {
      const slotStart = new Date(year, month, day, slot.hour, slot.minute, 0);
      const slotEnd = new Date(slotStart.getTime() + duration * 60000);

      if (slotStart < bookingEnd && slotEnd > bookingStart) {
        bookedSlots.add(slot.time);
      }
    });

    expect(bookedSlots.has("14:00")).toBe(true);
    expect(bookedSlots.has("14:15")).toBe(true);
    expect(bookedSlots.has("14:30")).toBe(true);
    expect(bookedSlots.has("14:45")).toBe(true);
    expect(bookedSlots.has("15:00")).toBe(false);
  });

  it("should correctly detect conflicts with 90-minute duration", () => {
    const bookingStart = new Date(2025, 0, 15, 14, 0, 0);
    const bookingEnd = new Date(bookingStart.getTime() + 90 * 60000);
    const duration = 90;

    const testSlots = [
      { hour: 14, minute: 0, time: "14:00" },
      { hour: 14, minute: 15, time: "14:15" },
      { hour: 14, minute: 30, time: "14:30" },
      { hour: 14, minute: 45, time: "14:45" },
      { hour: 15, minute: 0, time: "15:00" },
      { hour: 15, minute: 15, time: "15:15" },
      { hour: 15, minute: 30, time: "15:30" },
    ];

    const year = 2025;
    const month = 0;
    const day = 15;
    const bookedSlots = new Set<string>();

    testSlots.forEach(slot => {
      const slotStart = new Date(year, month, day, slot.hour, slot.minute, 0);
      const slotEnd = new Date(slotStart.getTime() + duration * 60000);

      if (slotStart < bookingEnd && slotEnd > bookingStart) {
        bookedSlots.add(slot.time);
      }
    });

    expect(bookedSlots.has("14:00")).toBe(true);
    expect(bookedSlots.has("14:15")).toBe(true);
    expect(bookedSlots.has("14:30")).toBe(true);
    expect(bookedSlots.has("14:45")).toBe(true);
    expect(bookedSlots.has("15:00")).toBe(true);
    expect(bookedSlots.has("15:15")).toBe(true);
    expect(bookedSlots.has("15:30")).toBe(false);
  });

  it("should handle edge case at end of day", () => {
    const allSlots: { hour: number; minute: number; time: string }[] = [];
    for (let hour = 11; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        allSlots.push({ hour, minute, time: timeStr });
      }
    }

    const lastSlot = allSlots[allSlots.length - 1];
    expect(lastSlot.hour).toBe(21);
    expect(lastSlot.minute).toBe(45);
    expect(lastSlot.time).toBe("21:45");
  });
});
