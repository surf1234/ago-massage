import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { useState } from "react";
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
  const bookingMutation = trpc.booking.create.useMutation();

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
                        {Array.from({ length: 11 }, (_, i) => {
                          const hour = 11 + i;
                          return `${hour}:00`;
                        }).map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

                {/* Notes */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">ご質問・ご要望（任意）</Label>
                  <Textarea
                    placeholder="施術に関するご要望やご質問がございましたら、こちらにご記入ください。"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="min-h-24 resize-none"
                  />
                </div>

                {/* Summary */}
                {selectedMenu && (
                  <div className="bg-secondary/30 p-6 rounded-sm space-y-2 border border-border/50">
                    <h3 className="font-serif text-lg tracking-wide">ご予約内容</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>セラピスト：{formData.therapistName}</p>
                      <p>メニュー：{formData.menuName}</p>
                      <p>日時：{formData.reservationDate} {formData.reservationTime}</p>
                      <p>所要時間：{selectedMenu.duration}分</p>
                      <p className="font-medium text-foreground pt-2">
                        料金：¥{selectedMenu.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="w-full h-12 bg-primary text-primary-foreground rounded-full text-base tracking-widest font-medium hover:bg-primary/90 transition-all duration-500"
                >
                  {bookingMutation.isPending ? "予約中..." : "予約を確定する"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  ご予約後、確認メールをお送りします。<br />
                  ご不明な点はお気軽にお問い合わせください。
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-3xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-serif text-2xl tracking-widest">ご予約に関するご注意</h2>
            <div className="space-y-4 text-muted-foreground leading-loose">
              <p>
                <span className="font-medium text-foreground">・ご予約について</span><br />
                完全予約制となっております。ご予約は3日前までにお願いいたします。
              </p>
              <p>
                <span className="font-medium text-foreground">・キャンセルについて</span><br />
                ご予約日の3日前までのキャンセルは無料です。それ以降のキャンセルはキャンセル料が発生いたします。
              </p>
              <p>
                <span className="font-medium text-foreground">・初回のお客様へ</span><br />
                初回は30分程度のカウンセリングを含みます。ご希望の時間より早めにご来店ください。
              </p>
              <p>
                <span className="font-medium text-foreground">・ご不明な点</span><br />
                ご質問やご不明な点がございましたら、お気軽にお電話ください。<br />
                <span className="text-primary font-medium">03-1234-5678</span>（11:00 - 20:30）
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
