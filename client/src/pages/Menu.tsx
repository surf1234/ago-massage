import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Clock, Users, Leaf } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const menuItems = [
  {
    id: "body-care",
    title: "Body Care",
    subtitle: "全身もみほぐし・整体",
    duration: "60分 / 90分",
    price: "¥8,800 / ¥12,100",
    description: "日常の疲れが蓄積した筋肉をほぐし、体本来の柔軟性と血流を取り戻します。",
    details: [
      "首・肩・背中の凝りを集中的にアプローチ",
      "腰痛や脚の疲れにも対応",
      "体全体のバランスを整える整体テクニック",
      "施術後は深いリラックス状態へ"
    ],
    benefits: [
      "筋肉の緊張が緩和される",
      "血行が促進され、新陳代謝が向上",
      "姿勢が改善される",
      "質の高い睡眠をもたらす"
    ],
    recommended: "デスクワークが多い方、運動不足の方、全身の疲れを感じている方"
  },
  {
    id: "aroma-oil",
    title: "Aroma Oil Treatment",
    subtitle: "アロマオイルトリートメント",
    duration: "90分 / 120分",
    price: "¥14,300 / ¥18,000",
    description: "厳選された精油の香りと、セラピストの手による優雅な動きで、リンパの流れを整えます。",
    details: [
      "初回はアロマカウンセリングで最適な精油をセレクト",
      "全身のリンパドレナージュで老廃物を排出",
      "肌の潤いと輝きが蘇る",
      "心身のバランスが整う"
    ],
    benefits: [
      "むくみが改善される",
      "肌が柔らかく、透明感が出る",
      "ホルモンバランスが整う",
      "ストレスが軽減される",
      "免疫力が向上する"
    ],
    recommended: "むくみが気になる方、肌トラブルがある方、ホルモンバランスを整えたい方"
  },
  {
    id: "head-spa",
    title: "Dry Head Spa",
    subtitle: "ドライヘッドスパ",
    duration: "45分",
    price: "¥6,600",
    description: "水を使わず、頭皮のコリを集中的にほぐします。脳疲労をリセットする最高峰の体験。",
    details: [
      "頭皮の筋肉と経穴を丁寧に刺激",
      "眼精疲労、頭痛の緩和",
      "脳のリセット効果で思考がクリアに",
      "髪質の改善も期待できる"
    ],
    benefits: [
      "頭がスッキリ、思考が明確になる",
      "眼精疲労が軽減される",
      "頭痛が緩和される",
      "睡眠の質が向上",
      "髪のツヤが戻る"
    ],
    recommended: "スマートフォンやPC作業が多い方、頭痛持ちの方、脳疲労を感じている方"
  },
  {
    id: "reflexology",
    title: "Reflexology",
    subtitle: "リフレクソロジー",
    duration: "45分 / 60分",
    price: "¥5,500 / ¥7,700",
    description: "足裏の反射区を刺激し、内臓の働きを活性化させます。全身の調和を取り戻す施術。",
    details: [
      "足裏の反射区を丁寧にほぐす",
      "内臓機能の活性化",
      "免疫力の向上",
      "体温が上がり、冷え性が改善"
    ],
    benefits: [
      "内臓機能が活性化される",
      "冷え性が改善される",
      "便秘が解消される",
      "免疫力が向上",
      "全身の調和が整う"
    ],
    recommended: "冷え性でお悩みの方、便秘気味の方、免疫力を高めたい方"
  },
  {
    id: "special-course",
    title: "Special Set Course",
    subtitle: "スペシャルセットコース",
    duration: "150分",
    price: "¥22,000",
    description: "ボディケア、アロマオイルトリートメント、ドライヘッドスパを組み合わせた、最上級の癒し体験。",
    details: [
      "全身のもみほぐしで筋肉の緊張を解放",
      "厳選精油によるリンパドレナージュ",
      "脳疲労をリセットするヘッドスパ",
      "最後は瞑想ガイダンスで深い統合を"
    ],
    benefits: [
      "全身が深くリラックスする",
      "心身の統合が起こる",
      "3日間は施術の効果が続く",
      "人生が変わるような体験"
    ],
    recommended: "初めての方、自分へのご褒美をお探しの方、人生を変える体験をしたい方"
  }
];

export default function Menu() {
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
            <h1 className="font-serif text-4xl md:text-5xl tracking-widest">施術メニュー</h1>
            <p className="text-muted-foreground text-lg leading-loose">
              あなたの心身の状態に合わせた、<br />
              最適な施術をお選びください
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl">
          <div className="space-y-20">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial="initial"
                whileInView="animate"
                variants={fadeIn}
                viewport={{ once: true }}
                className="border-b border-border pb-20 last:border-b-0"
              >
                <div className="space-y-8">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs tracking-[0.2em] text-primary uppercase font-medium">
                        Menu {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-widest">{item.title}</h2>
                    <p className="text-muted-foreground text-lg">{item.subtitle}</p>
                  </div>

                  {/* Info Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-secondary/30 p-6 rounded-sm space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Clock size={18} />
                        <span className="text-xs tracking-widest uppercase font-medium">Duration</span>
                      </div>
                      <p className="font-serif text-lg">{item.duration}</p>
                    </div>
                    <div className="bg-secondary/30 p-6 rounded-sm space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Leaf size={18} />
                        <span className="text-xs tracking-widest uppercase font-medium">Price</span>
                      </div>
                      <p className="font-serif text-lg">{item.price}</p>
                    </div>
                    <div className="bg-secondary/30 p-6 rounded-sm space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Users size={18} />
                        <span className="text-xs tracking-widest uppercase font-medium">Recommended</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.recommended}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-loose text-lg">
                    {item.description}
                  </p>

                  {/* Details & Benefits */}
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg tracking-wider mb-6">施術の流れ</h3>
                      <ul className="space-y-3">
                        {item.details.map((detail, i) => (
                          <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-loose">
                            <span className="text-primary mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg tracking-wider mb-6">期待できる効果</h3>
                      <ul className="space-y-3">
                        {item.benefits.map((benefit, i) => (
                          <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-loose">
                            <span className="text-primary mt-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* First Time Info */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl tracking-widest">初めてのご来店の方へ</h2>
          <p className="leading-loose text-lg">
            初回ご来店時には、カウンセリングを丁寧に行わせていただきます。<br />
            現在のお体の状態、お悩み、ご希望をお聞きした上で、<br />
            最適な施術内容とアロマをご提案させていただきます。<br />
            <br />
            ご不安なことやご質問があれば、いつでもお気軽にお問い合わせください。
          </p>
          <button className="inline-block mt-8 px-10 py-4 bg-primary-foreground text-primary rounded-full tracking-widest font-medium hover:bg-primary-foreground/90 transition-all duration-500 shadow-lg">
            ご予約・お問い合わせ
          </button>
        </div>
      </section>
    </Layout>
  );
}
