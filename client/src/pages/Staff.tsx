import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Award, Heart, Sparkles } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staffMembers = [
  {
    id: 1,
    name: "田中 美咲",
    title: "セラピスト・ディレクター",
    specialty: "全身ボディケア・アロマテラピー",
    experience: "12年",
    bio: "agoの創設者。国際的なマッサージ資格を取得し、東京・京都・バリでの修行を経て、独自の「触覚対話」メソッドを確立。クライアントの心身の声を聞き、その瞬間に最適な施術を提供することを信条としている。",
    qualifications: [
      "国際ボディケアセラピスト資格",
      "アロマテラピー検定1級",
      "リフレクソロジー認定セラピスト",
      "瞑想ガイダンス講師"
    ],
    philosophy: "施術とは、クライアントとセラピストが呼吸を合わせ、心で対話する時間。技術だけでなく、その人全体を感じ、整えることが私たちの役割です。"
  },
  {
    id: 2,
    name: "佐藤 由美",
    title: "シニアセラピスト",
    specialty: "ドライヘッドスパ・リフレクソロジー",
    experience: "8年",
    bio: "脳疲労の専門家。スマートフォン時代の現代人の悩みに特化した施術を開発。頭皮のコリを一瞬で見抜き、その人に必要な刺激を正確に提供する。クライアントからは『施術後、人生が変わった』とのお声も。",
    qualifications: [
      "ドライヘッドスパ認定セラピスト",
      "リフレクソロジー上級資格",
      "解剖学・生理学修了",
      "ストレスマネジメント講師"
    ],
    philosophy: "頭が整えば、心も整う。脳疲労をリセットすることで、本来の自分を取り戻すお手伝いをしています。"
  },
  {
    id: 3,
    name: "鈴木 健太",
    title: "セラピスト",
    specialty: "全身ボディケア・スポーツマッサージ",
    experience: "5年",
    bio: "元アスリート。自身の怪我からセラピストの道へ。筋肉の構造を深く理解し、スポーツ選手から一般の方まで、あらゆる体の悩みに対応。力強いながらも優しい施術が特徴。",
    qualifications: [
      "スポーツマッサージセラピスト",
      "解剖学・運動学修了",
      "アスレティックトレーナー資格",
      "パーソナルトレーニング指導資格"
    ],
    philosophy: "体は正直です。その人の生活習慣や心の状態が、筋肉に表れます。その声を聞き、本当の改善をもたらすことが目標です。"
  },
  {
    id: 4,
    name: "山田 麻衣",
    title: "セラピスト",
    specialty: "アロマオイルトリートメント・リンパドレナージュ",
    experience: "6年",
    bio: "アロマテラピーのスペシャリスト。世界中のオーガニック農園から直仕入れした精油を使い分け、その日のクライアントの心身に最適なブレンドを創出。香りによる心理的アプローチも得意。",
    qualifications: [
      "アロマテラピー検定1級",
      "リンパドレナージュセラピスト",
      "ハーバルメディシン修了",
      "香りの心理学講師"
    ],
    philosophy: "香りは、言葉を超えた癒しの言語。精油の力とセラピストの手が合わさるとき、真の変容が起こります。"
  }
];

export default function Staff() {
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
            <h1 className="font-serif text-4xl md:text-5xl tracking-widest">スタッフ紹介</h1>
            <p className="text-muted-foreground text-lg leading-loose">
              あなたの癒しをお手伝いする、<br />
              agoのセラピストたちをご紹介します
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Members */}
      <section className="py-24 md:py-32">
        <div className="container max-w-5xl">
          <div className="space-y-24">
            {staffMembers.map((staff, index) => (
              <motion.div
                key={staff.id}
                initial="initial"
                whileInView="animate"
                variants={fadeIn}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="aspect-[3/4] bg-secondary/30 rounded-sm overflow-hidden relative group">
                    <div className="w-full h-full bg-gradient-to-br from-secondary/50 to-primary/20 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                          <Heart className="w-12 h-12 text-primary/40" />
                        </div>
                        <p className="text-muted-foreground text-sm">Photo</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                </div>

                {/* Info */}
                <div className={`space-y-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  {/* Header */}
                  <div className="space-y-3">
                    <h2 className="font-serif text-3xl tracking-widest">{staff.name}</h2>
                    <p className="text-primary font-medium tracking-wider text-sm">{staff.title}</p>
                    <p className="text-muted-foreground">{staff.specialty}</p>
                    <p className="text-sm text-muted-foreground">経歴：{staff.experience}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-loose">
                    {staff.bio}
                  </p>

                  {/* Philosophy */}
                  <div className="bg-secondary/30 p-6 rounded-sm border-l-4 border-primary/50 space-y-2">
                    <div className="flex items-center gap-2 text-primary text-sm font-medium tracking-wider">
                      <Sparkles size={16} />
                      <span>Philosophy</span>
                    </div>
                    <p className="text-muted-foreground italic leading-loose">
                      "{staff.philosophy}"
                    </p>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg tracking-wider flex items-center gap-2">
                      <Award size={20} className="text-primary" />
                      資格・認定
                    </h3>
                    <ul className="space-y-2">
                      {staff.qualifications.map((qual, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="text-primary">✓</span>
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <button className="w-full md:w-auto px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-500 tracking-wider text-sm font-medium">
                    {staff.name}を指名予約
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-3xl text-center space-y-8">
          <h2 className="font-serif text-3xl tracking-widest">agoのセラピスト像</h2>
          <p className="text-muted-foreground leading-loose text-lg">
            agoのセラピストは、単なる「技術者」ではなく、<br />
            クライアントの心身の声を聞く「聴き手」であり、<br />
            その人の内なる力を引き出す「ファシリテーター」です。<br />
            <br />
            継続的な学習と自己修養を通じて、<br />
            常に最高品質の施術を提供することをお約束します。
          </p>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl tracking-widest">
            セラピストとの出会いを、<br />
            大切にしてください。
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto leading-loose">
            初回のカウンセリングで、あなたに最適なセラピストをご提案いたします。<br />
            もちろん、指名予約も可能です。
          </p>
          <button className="inline-block mt-8 px-10 py-4 bg-primary-foreground text-primary rounded-full tracking-widest font-medium hover:bg-primary-foreground/90 transition-all duration-500 shadow-lg">
            ご予約はこちら
          </button>
        </div>
      </section>
    </Layout>
  );
}
