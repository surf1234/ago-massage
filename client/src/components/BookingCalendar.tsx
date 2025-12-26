import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Booking } from "../../../drizzle/schema";

interface BookingCalendarProps {
  bookings: Booking[];
  onDateSelect?: (date: Date) => void;
}

export default function BookingCalendar({ bookings, onDateSelect }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getBookingsForDate = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toISOString()
      .split("T")[0];
    
    return bookings.filter(b => {
      const bookingDateStr = new Date(b.reservationDate).toISOString().split("T")[0];
      return bookingDateStr === dateStr;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const monthNames = [
    "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月"
  ];

  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // 前月の日付を埋める
  const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i)
    });
  }

  // 当月の日付
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
    });
  }

  // 翌月の日付を埋める
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i)
    });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl tracking-widest">
          {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={handlePrevMonth}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <ChevronLeft size={18} />
          </Button>
          <Button
            onClick={handleNextMonth}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center font-medium text-sm text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((dayObj, idx) => {
          const dayBookings = dayObj.isCurrentMonth ? getBookingsForDate(dayObj.day) : [];
          const hasBookings = dayBookings.length > 0;
          const isToday =
            dayObj.date.toDateString() === new Date().toDateString();

          return (
            <div
              key={idx}
              onClick={() => dayObj.isCurrentMonth && handleDateClick(dayObj.date)}
              className={`
                min-h-24 p-2 rounded-sm border border-border/30 cursor-pointer transition-all
                ${dayObj.isCurrentMonth ? "bg-background hover:bg-secondary/50" : "bg-secondary/10"}
                ${isToday ? "ring-2 ring-primary" : ""}
                ${hasBookings ? "bg-primary/5" : ""}
              `}
            >
              <div className={`text-sm font-medium mb-1 ${dayObj.isCurrentMonth ? "text-foreground" : "text-muted-foreground"}`}>
                {dayObj.day}
              </div>
              <div className="space-y-1">
                {dayBookings.slice(0, 2).map((booking, i) => (
                  <div key={i} className="text-xs truncate">
                    <Badge className={`${getStatusColor(booking.status)} text-xs py-0 px-1`}>
                      {booking.therapistName.split(" ")[1]}
                    </Badge>
                  </div>
                ))}
                {dayBookings.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayBookings.length - 2}件
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border/30">
        <div className="text-sm font-medium mb-3">ステータス凡例</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-xs text-muted-foreground">未確認</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-xs text-muted-foreground">確認済み</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-xs text-muted-foreground">完了</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-xs text-muted-foreground">キャンセル</span>
          </div>
        </div>
      </div>
    </div>
  );
}
