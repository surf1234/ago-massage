import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Train, Car, Accessibility } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function Access() {
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
            <h1 className="font-serif text-4xl md:text-5xl tracking-widest">アクセス</h1>
            <p className="text-muted-foreground text-lg leading-loose">
              静寂に包まれた、<br />
              agoへのアクセス情報
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-32">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Info */}
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeIn}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Address */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl tracking-widest flex items-center gap-3">
                  <MapPin className="text-primary" size={24} />
                  住所
                </h2>
                <p className="text-lg text-muted-foreground leading-loose">
                  〒107-0062<br />
                  東京都港区南青山5-1-1<br />
                  青南ビル 3F
                </p>
                <button className="text-primary hover:text-primary/70 transition-colors text-sm tracking-wider mt-4">
                  Google Mapで開く →
                </button>
              </div>

              {/* Phone */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl tracking-widest flex items-center gap-3">
                  <Phone className="text-primary" size={24} />
                  電話
                </h2>
                <a href="tel:0312345678" className="text-lg text-primary hover:text-primary/70 transition-colors">
                  03-1234-5678
                </a>
                <p className="text-sm text-muted-foreground">
                  受付時間：11:00 - 20:30
                </p>
              </div>

              {/* Hours */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl tracking-widest flex items-center gap-3">
                  <Clock className="text-primary" size={24} />
                  営業時間
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-medium">営業時間：</span><br />
                    11:00 - 21:00（最終受付 20:00）
                  </p>
                  <p>
                    <span className="font-medium">定休日：</span><br />
                    火曜日・年末年始
                  </p>
                  <p className="text-sm pt-2">
                    ※ 完全予約制のため、<br />
                    ご来店前に必ずご予約ください。
                  </p>
                </div>
              </div>

              {/* Access by Train */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl tracking-widest flex items-center gap-3">
                  <Train className="text-primary" size={24} />
                  電車でのアクセス
                </h2>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>
                    <span className="font-medium">東京メトロ銀座線</span><br />
                    赤坂見附駅 5番出口より徒歩8分
                  </p>
                  <p>
                    <span className="font-medium">東京メトロ丸ノ内線</span><br />
                    赤坂見附駅 5番出口より徒歩8分
                  </p>
                  <p>
                    <span className="font-medium">東京メトロ半蔵門線</span><br />
                    青山一丁目駅 3番出口より徒歩10分
                  </p>
                </div>
              </div>

              {/* Access by Car */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl tracking-widest flex items-center gap-3">
                  <Car className="text-primary" size={24} />
                  お車でのアクセス
                </h2>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>
                    首都高速3号線「赤坂見附」出口より<br />
                    約5分
                  </p>
                  <p className="font-medium pt-2">
                    駐車場
                  </p>
                  <p>
                    ビル地下1階に駐車場がございます。<br />
                    ご利用の際は、スタッフまでお気軽にお問い合わせください。
                  </p>
                </div>
              </div>

              {/* Accessibility */}
              <div className="space-y-4 bg-secondary/30 p-6 rounded-sm">
                <h2 className="font-serif text-lg tracking-widest flex items-center gap-3">
                  <Accessibility className="text-primary" size={20} />
                  バリアフリー対応
                </h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>ビル入口にスロープ完備</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>エレベーター利用可能</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>多機能トイレ完備</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>車いす利用者対応施術ルーム</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right: Map Placeholder */}
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeIn}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="relative w-full h-[400px] md:h-[600px] bg-secondary/30 rounded-sm overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 text-primary/30 mx-auto" />
                    <p className="text-muted-foreground">
                      Google Map<br />
                      <span className="text-xs">（実装時に統合）</span>
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>

              {/* Nearby Info */}
              <div className="space-y-6">
                <h3 className="font-serif text-xl tracking-widest">周辺施設</h3>
                <div className="space-y-4">
                  {[
                    { name: "赤坂見附駅", distance: "徒歩8分" },
                    { name: "青山一丁目駅", distance: "徒歩10分" },
                    { name: "赤坂Sacas", distance: "徒歩5分" },
                    { name: "国立新美術館", distance: "徒歩12分" }
                  ].map((place, i) => (
                    <div key={i} className="flex justify-between items-center pb-3 border-b border-border/50">
                      <span className="text-muted-foreground">{place.name}</span>
                      <span className="text-sm text-primary font-medium">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parking Info */}
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-3xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-serif text-2xl tracking-widest">駐車場のご案内</h2>
            <div className="space-y-4 text-muted-foreground leading-loose">
              <p>
                agoが入居する青南ビルの地下1階に駐車場がございます。<br />
                施術ご利用のお客様は、駐車料金の割引サービスをご用意しております。
              </p>
              <div className="bg-background p-6 rounded-sm border border-border space-y-3">
                <p className="font-medium text-foreground">駐車料金（通常）</p>
                <p className="text-sm">30分 ¥500</p>
                <p className="font-medium text-foreground pt-4">agoご利用時の割引</p>
                <p className="text-sm">最大3時間まで無料<br />（3時間以上は通常料金）</p>
              </div>
              <p className="text-sm">
                ご不明な点やご質問がございましたら、<br />
                お気軽にお問い合わせください。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl tracking-widest">
            ご質問やご不明な点は、<br />
            いつでもお気軽にお問い合わせください。
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-primary-foreground text-primary rounded-full tracking-widest font-medium hover:bg-primary-foreground/90 transition-all duration-500 shadow-lg">
              お電話でのお問い合わせ
            </button>
            <button className="px-10 py-4 border-2 border-primary-foreground text-primary-foreground rounded-full tracking-widest font-medium hover:bg-primary-foreground hover:text-primary transition-all duration-500">
              メールでのお問い合わせ
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
