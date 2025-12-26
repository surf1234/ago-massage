import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Booking } from "../../../drizzle/schema";

interface DailyBookingsListProps {
  date: Date | null;
  bookings: Booking[];
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusLabels = {
  pending: "未確認",
  confirmed: "確認済み",
  completed: "完了",
  cancelled: "キャンセル"
};

export default function DailyBookingsList({ date, bookings }: DailyBookingsListProps) {
  if (!date) {
    return (
      <Card className="p-8 text-center border-border/50">
        <p className="text-muted-foreground">日付を選択してください</p>
      </Card>
    );
  }

  const dateStr = date.toISOString().split("T")[0];
  const dayBookings = bookings.filter(b => {
    const bookingDateStr = new Date(b.reservationDate).toISOString().split("T")[0];
    return bookingDateStr === dateStr;
  });

  const dayName = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
  const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日(${dayName})`;

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-2xl tracking-widest">{formattedDate}</h3>

      {dayBookings.length === 0 ? (
        <Card className="p-8 text-center border-border/50">
          <p className="text-muted-foreground">この日の予約はありません</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {dayBookings
            .sort((a, b) => new Date(a.reservationDate).getTime() - new Date(b.reservationDate).getTime())
            .map((booking) => (
              <Card key={booking.id} className="p-4 border-border/50 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">時間</p>
                    <p className="font-medium">
                      {new Date(booking.reservationDate).toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">顧客名</p>
                    <p className="font-medium">{booking.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">セラピスト</p>
                    <p className="font-medium">{booking.therapistName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">メニュー</p>
                    <p className="font-medium text-sm">{booking.menuName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">金額</p>
                    <p className="font-medium">¥{booking.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">ステータス</p>
                    <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                      {statusLabels[booking.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
