import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const therapists = [
  "田中 美咲",
  "佐藤 由美",
  "鈴木 健太",
  "山田 麻衣"
];

const menus = [
  { name: "全身ボディケア", duration: 60, price: 8800 },
  { name: "アロマオイルトリートメント", duration: 90, price: 14300 },
  { name: "ドライヘッドスパ", duration: 45, price: 6600 },
  { name: "リフレクソロジー", duration: 45, price: 5500 },
  { name: "スペシャルセットコース", duration: 120, price: 18000 }
];

export default function Booking() {
  const [formData, setFormData] = useState({
    therapistName: "",
    menuName: "",
    reservationDate: "",
    reservationTime: "11:00",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: ""
  });

  const [selectedMenu, setSelectedMenu] = useState<typeof menus[0] | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const bookingMutation = trpc.booking.create.useMutation();
  const availableSlotsQuery = trpc.booking.getAvailableSlots.useQuery(
    {
      date: formData.reservationDate,
      therapistName: formData.therapistName,
      duration: selectedMenu?.duration || 60,
    },
    {
      enabled: !!(formData.reservationDate && formData.therapistName && selectedMenu),
    }
  );

  useEffect(() => {
    if (availableSlotsQuery.data) {
      setAvailableSlots(availableSlotsQuery.data);
      // 最初の利用可能な時間を選択
      if (availableSlotsQuery.data.length > 0 && !availableSlotsQuery.data.includes(formData.reservationTime)) {
        setFormData(prev => ({ ...prev, reservationTime: availableSlotsQuery.data[0] }));
      }
    }
  }, [availableSlotsQuery.data]);

  const handleMenuChange = (menuName: string) => {
    const menu = menus.find(m => m.name === menuName);
    setSelectedMenu(menu || null);
    setFormData(prev => ({ ...prev, menuName }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.therapistName || !formData.menuName || !formData.reservationDate || !formData.customerName || !formData.customerEmail) {
      toast.error("必須項目をすべて入力してください");
      return;
    }

    try {
      const [year, month, day] = formData.reservationDate.split("-");
      const [hours, minutes] = formData.reservationTime.split(":");
      const reservationDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );

      await bookingMutation.mutateAsync({
        therapistName: formData.therapistName,
        menuName: formData.menuName,
        reservationDate,
        duration: selectedMenu?.duration || 60,
        price: selectedMenu?.price || 0,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        notes: formData.notes
      });

      toast.success("予約が完了しました。確認メールをお送りします。");
      setFormData({
        therapistName: "",
        menuName: "",
        reservationDate: "",
        reservationTime: "11:00",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        notes: ""
      });
      setSelectedMenu(null);
      setAvailableSlots([]);
    } catch (error) {
      toast.error("予約の送信に失敗しました。もう一度お試しください。");
    }
  };

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
            <h1 className="font-serif text-4xl md:text-5xl tracking-widest">ご予約</h1>
            <p className="text-muted-foreground text-lg leading-loose">
              あなたの癒しの時間を、<br />
              お作りします。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 md:py-32">
        <div className="container max-w-2xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <Card className="p-8 md:p-12 shadow-lg border-border/50">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Therapist Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <User size={18} className="text-primary" />
                    セラピスト選択
                  </Label>
                  <Select value={formData.therapistName} onValueChange={(value) => setFormData(prev => ({ ...prev, therapistName: value }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="セラピストを選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapists.map((therapist) => (
                        <SelectItem key={therapist} value={therapist}>
                          {therapist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">初回の場合は、カウンセリングで最適なセラピストをご提案させていただきます。</p>
                </div>

                {/* Menu Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">施術メニュー</Label>
                  <Select value={formData.menuName} onValueChange={handleMenuChange}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="メニューを選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {menus.map((menu) => (
                        <SelectItem key={menu.name} value={menu.name}>
                          {menu.name} ({menu.duration}分 ¥{menu.price.toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Calendar size={18} className="text-primary" />
                      ご希望日
                    </Label>
                    <Input
                      type="date"
                      value={formData.reservationDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, reservationDate: e.target.value }))}
                      className="h-12"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Clock size={18} className="text-primary" />
                      ご希望時間
                    </Label>
                    <Select value={formData.reservationTime} onValueChange={(value) => setFormData(prev => ({ ...prev, reservationTime: value }))}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSlots.length > 0 ? (
                          availableSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-slots" disabled>
                            {formData.reservationDate && formData.therapistName ? "利用可能な時間帯がありません" : "日付とセラピストを選択してください"}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {availableSlotsQuery.isLoading && (
                      <p className="text-xs text-muted-foreground">利用可能な時間帯を読み込み中...</p>
                    )}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">お名前</Label>
                  <Input
                    type="text"
                    placeholder="山田 太郎"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Mail size={18} className="text-primary" />
                    メールアドレス
                  </Label>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    className="h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Phone size={18} className="text-primary" />
                    電話番号（任意）
                  </Label>
                  <Input
                    type="tel"
                    placeholder="090-1234-5678"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                    className="h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">ご質問・ご要望（任意）</Label>
                  <Textarea
                    placeholder="施術に関するご質問やご要望がございましたら、こちらにご記入ください。"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="min-h-24 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full py-6 text-base tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500"
                    disabled={bookingMutation.isPending || availableSlots.length === 0}
                  >
                    {bookingMutation.isPending ? "予約中..." : "予約を確定する"}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
