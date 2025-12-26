import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, Leaf } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/_core/hooks/useAuth";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-zen-massage.png" 
            alt="Zen Massage Room" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80" />
        </div>
        
        <div className="container relative z-10 text-center pt-20">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="space-y-8"
          >
            <motion.p variants={fadeIn} className="text-sm md:text-base tracking-[0.3em] uppercase text-primary/80 font-medium">
              Silence & Serenity
            </motion.p>
            <motion.h1 variants={fadeIn} className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-wider leading-tight text-foreground">
              静寂の中で、<br className="md:hidden" />整う。
            </motion.h1>
            <motion.p variants={fadeIn} className="text-muted-foreground max-w-lg mx-auto leading-loose text-sm md:text-base">
              日常の喧騒を離れ、心と体が本来のリズムを取り戻す場所。<br />
              五感を癒す、極上のリラクゼーション体験を。
            </motion.p>
            <motion.div variants={fadeIn} className="pt-8">
              <Link href="/menu">
                <Button size="lg" className="rounded-full px-10 py-7 text-base tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  メニューを見る
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-muted-foreground/30 overflow-hidden">
            <div className="w-full h-1/2 bg-primary/50 animate-scroll-down" />
          </div>
        </motion.div>
      </section>

      {/* Concept Section */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/20 -z-10 blur-3xl opacity-50" />
        
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                <img 
                  src="/images/therapist-hands.png" 
                  alt="Therapist Hands" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-background p-4 shadow-xl hidden md:block">
                <img 
                  src="/images/oil-bottles.png" 
                  alt="Oil Bottles" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-8 order-1 md:order-2">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-primary/30" />
                <span className="text-xs tracking-[0.2em] text-primary uppercase">Concept</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-relaxed tracking-wide">
                「余白」を感じる、<br />
                贅沢なひととき。
              </h2>
              <p className="text-muted-foreground leading-loose">
                ago（アゴ）は、ただ筋肉をほぐすだけの場所ではありません。<br />
                情報過多な現代社会において、意図的に「何もしない時間」を作り出し、<br />
                内側から湧き出るエネルギーを感じていただくためのサンクチュアリです。
              </p>
              <p className="text-muted-foreground leading-loose">
                和の静寂と北欧の温かみを融合した空間で、<br />
                熟練のセラピストが一人ひとりの呼吸に合わせた施術を行います。
              </p>
              <div className="pt-4">
                <Link href="/about">
                  <a className="inline-flex items-center gap-2 text-primary hover:text-primary/70 transition-colors border-b border-primary/30 pb-1 tracking-wider text-sm">
                    agoについて詳しく <ArrowRight size={14} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="font-serif text-3xl tracking-widest">3つのこだわり</h2>
            <p className="text-muted-foreground text-sm">Three Commitments</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-6 h-6" />,
                title: "厳選されたオーガニック素材",
                desc: "肌に直接触れるオイルやリネンは、すべて世界基準のオーガニック認証を取得したものを使用しています。"
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: "五感を癒す空間設計",
                desc: "照明、音響、香り、温度。すべてが計算された空間で、深いリラクゼーション状態へと導きます。"
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "パーソナライズされた施術",
                desc: "その日の体調や気分に合わせて、施術内容やアロマのブレンドを毎回カスタマイズいたします。"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-background p-8 md:p-10 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/50 group">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-loose">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-primary/30" />
                <span className="text-xs tracking-[0.2em] text-primary uppercase">Menu</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-widest">施術メニュー</h2>
            </div>
            <Link href="/menu">
              <Button variant="outline" className="rounded-full px-8 border-primary/20 hover:bg-primary hover:text-primary-foreground">
                すべてのメニューを見る
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-sm aspect-[16/9] md:aspect-auto md:h-[400px]">
              <img 
                src="/images/tea-relaxation.png" 
                alt="Relaxation" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-serif text-2xl mb-2 tracking-wide">Body Care</h3>
                <p className="text-white/80 text-sm mb-4">全身もみほぐし / 整体</p>
                <span className="inline-block border-b border-white/50 pb-1 text-sm tracking-wider">60min ¥8,800〜</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "アロマオイルトリートメント", time: "90min", price: "¥14,300", desc: "厳選された精油を使用し、リンパの流れを整えます。" },
                { name: "ドライヘッドスパ", time: "45min", price: "¥6,600", desc: "水を使わず、頭皮のコリを集中的にほぐします。" },
                { name: "リフレクソロジー", time: "45min", price: "¥5,500", desc: "足裏の反射区を刺激し、内臓の働きを活性化させます。" },
                { name: "スペシャルセットコース", time: "120min", price: "¥18,000", desc: "ボディケアとオイルトリートメントを組み合わせた贅沢コース。" }
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between p-6 border-b border-border hover:bg-secondary/20 transition-colors cursor-pointer group">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg tracking-wide group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-sm font-medium tracking-wider">{item.time}</div>
                    <div className="text-sm text-muted-foreground">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
        <div className="container text-center relative z-10 space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl tracking-widest leading-tight">
            心と体が、<br />
            深呼吸する場所。
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto leading-loose">
            完全予約制のプライベート空間で、<br />
            あなただけの癒しの時間をお過ごしください。
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" variant="secondary" className="rounded-full px-10 py-6 text-base tracking-widest shadow-lg">
                オンライン予約
              </Button>
            </Link>
            <a href="tel:03-1234-5678">
              <Button size="lg" variant="outline" className="rounded-full px-10 py-6 text-base tracking-widest border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                お問い合わせ
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
