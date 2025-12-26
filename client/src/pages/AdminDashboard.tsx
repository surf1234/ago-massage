import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, Users, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import type { Booking } from "../../../drizzle/schema";
import BookingCalendar from "@/components/BookingCalendar";
import DailyBookingsList from "@/components/DailyBookingsList";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

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

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const bookingsQuery = trpc.booking.getAllBookings.useQuery();
  const statsQuery = trpc.booking.getStats.useQuery();
  const updateStatusMutation = trpc.booking.updateStatus.useMutation();

  useEffect(() => {
    if (bookingsQuery.data) {
      setBookings(bookingsQuery.data);
    }
  }, [bookingsQuery.data]);

  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    setUpdatingId(bookingId);
    try {
      await updateStatusMutation.mutateAsync({
        bookingId,
        status: newStatus as "pending" | "confirmed" | "cancelled" | "completed"
      });
      
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus as any } : b)
      );
      toast.success("ステータスを更新しました");
    } catch (error) {
      toast.error("ステータスの更新に失敗しました");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = selectedStatus
    ? bookings.filter(b => b.status === selectedStatus)
    : bookings;

  const stats = statsQuery.data || { total: 0, confirmed: 0, pending: 0, completed: 0, cancelled: 0, totalRevenue: 0 };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-secondary/20">
        <div className="container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h1 className="font-serif text-4xl md:text-5xl tracking-widest">予約管理</h1>
            <p className="text-muted-foreground text-lg">
              すべての予約を一元管理します。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            <Card className="p-6 text-center border-border/50">
              <div className="flex justify-center mb-3">
                <Calendar size={24} className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground mt-2">総予約数</p>
            </Card>

            <Card className="p-6 text-center border-border/50">
              <div className="flex justify-center mb-3">
                <Clock size={24} className="text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
              <p className="text-xs text-muted-foreground mt-2">未確認</p>
            </Card>

            <Card className="p-6 text-center border-border/50">
              <div className="flex justify-center mb-3">
                <CheckCircle size={24} className="text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.confirmed}</p>
              <p className="text-xs text-muted-foreground mt-2">確認済み</p>
            </Card>

            <Card className="p-6 text-center border-border/50">
              <div className="flex justify-center mb-3">
                <Users size={24} className="text-green-600" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
              <p className="text-xs text-muted-foreground mt-2">完了</p>
            </Card>

            <Card className="p-6 text-center border-border/50">
              <div className="flex justify-center mb-3">
                <TrendingUp size={24} className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">¥{(stats.totalRevenue / 10000).toFixed(1)}万</p>
              <p className="text-xs text-muted-foreground mt-2">売上</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* View Mode Toggle */}
      <section className="py-8 border-b border-border/30">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              onClick={() => setViewMode("list")}
              variant={viewMode === "list" ? "default" : "outline"}
              className="rounded-full"
            >
              リスト表示
            </Button>
            <Button
              onClick={() => setViewMode("calendar")}
              variant={viewMode === "calendar" ? "default" : "outline"}
              className="rounded-full"
            >
              カレンダー表示
            </Button>
          </div>

          {viewMode === "list" && (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSelectedStatus(null)}
                variant={selectedStatus === null ? "default" : "outline"}
                className="rounded-full"
              >
                すべて
              </Button>
              <Button
                onClick={() => setSelectedStatus("pending")}
                variant={selectedStatus === "pending" ? "default" : "outline"}
                className="rounded-full"
              >
                未確認
              </Button>
              <Button
                onClick={() => setSelectedStatus("confirmed")}
                variant={selectedStatus === "confirmed" ? "default" : "outline"}
                className="rounded-full"
              >
                確認済み
              </Button>
              <Button
                onClick={() => setSelectedStatus("completed")}
                variant={selectedStatus === "completed" ? "default" : "outline"}
                className="rounded-full"
              >
                完了
              </Button>
              <Button
                onClick={() => setSelectedStatus("cancelled")}
                variant={selectedStatus === "cancelled" ? "default" : "outline"}
                className="rounded-full"
              >
                キャンセル
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            {viewMode === "calendar" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <BookingCalendar
                    bookings={bookings}
                    onDateSelect={setSelectedDate}
                  />
                </div>
                <div>
                  <DailyBookingsList
                    date={selectedDate}
                    bookings={bookings}
                  />
                </div>
              </div>
            ) : (
              <>
                {filteredBookings.length === 0 ? (
                  <Card className="p-12 text-center border-border/50">
                    <p className="text-muted-foreground">予約がありません</p>
                  </Card>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left py-4 px-4 font-medium text-sm">日時</th>
                          <th className="text-left py-4 px-4 font-medium text-sm">顧客名</th>
                          <th className="text-left py-4 px-4 font-medium text-sm">セラピスト</th>
                          <th className="text-left py-4 px-4 font-medium text-sm">メニュー</th>
                          <th className="text-left py-4 px-4 font-medium text-sm">金額</th>
                          <th className="text-left py-4 px-4 font-medium text-sm">ステータス</th>
                          <th className="text-left py-4 px-4 font-medium text-sm">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((booking) => (
                          <tr key={booking.id} className="border-b border-border/20 hover:bg-secondary/10 transition-colors">
                            <td className="py-4 px-4 text-sm">
                              {new Date(booking.reservationDate).toLocaleString("ja-JP")}
                            </td>
                            <td className="py-4 px-4 text-sm">{booking.customerName}</td>
                            <td className="py-4 px-4 text-sm">{booking.therapistName}</td>
                            <td className="py-4 px-4 text-sm">{booking.menuName}</td>
                            <td className="py-4 px-4 text-sm font-medium">¥{booking.price.toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm">
                              <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                                {statusLabels[booking.status as keyof typeof statusLabels]}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-sm">
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                disabled={updatingId === booking.id}
                                className="px-2 py-1 border border-border rounded text-xs bg-background text-foreground cursor-pointer"
                              >
                                <option value="pending">未確認</option>
                                <option value="confirmed">確認済み</option>
                                <option value="completed">完了</option>
                                <option value="cancelled">キャンセル</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
