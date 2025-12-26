import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function About() {
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
            <h1 className="font-serif text-4xl md:text-5xl tracking-widest">agoについて</h1>
            <p className="text-muted-foreground text-lg leading-loose">
              静寂の中で、心と体が本来のリズムを取り戻す場所
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl">
          <div className="space-y-16">
            {/* Origin */}
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeIn}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl tracking-widest mb-8">agoの誕生</h2>
              <p className="text-muted-foreground leading-loose text-lg">
                「ago」という名前は、日本語の「余す」から着想を得ました。<br />
                現代社会では、私たちは常に何かを「足す」ことを求められています。<br />
                スキル、知識、経験、物質……。
              </p>
              <p className="text-muted-foreground leading-loose text-lg">
                しかし本当に必要なのは、時には何かを「引く」こと。<br />
                情報を、期待を、焦りを。<br />
                そして、その空白に浮かぶ自分自身と向き合うこと。
              </p>
              <p className="text-muted-foreground leading-loose text-lg">
                agoは、そうした「余白」を意図的に作り出し、<br />
                あなたの内側に眠っている本来の力を引き出すお手伝いをする場所です。
              </p>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeIn}
              viewport={{ once: true }}
              className="space-y-6 border-t border-border pt-16"
            >
              <h2 className="font-serif text-3xl tracking-widest mb-8">私たちの想い</h2>
              <p className="text-muted-foreground leading-loose text-lg">
                agoでは、単なる「疲労回復」ではなく、「心身の統合」を目指しています。<br />
                マッサージは、筋肉をほぐすだけでなく、<br />
                その人の呼吸、脈拍、エネルギーの流れ全体に働きかけるものです。
              </p>
              <p className="text-muted-foreground leading-loose text-lg">
                セラピストは、施術を通じて、あなたの体が今、何を求めているのかを感じ取ります。<br />
                それは、言葉では伝えられない、触覚による対話です。
              </p>
              <p className="text-muted-foreground leading-loose text-lg">
                私たちは、あなたが「整う」その瞬間を、<br />
                心から応援する存在でありたいと考えています。
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeIn}
              viewport={{ once: true }}
              className="space-y-6 border-t border-border pt-16"
            >
              <h2 className="font-serif text-3xl tracking-widest mb-8">3つの価値観</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Silence",
                    desc: "静寂を大切にします。不要な音や光、情報を排除し、五感が本来の感度を取り戻す環境を整えます。"
                  },
                  {
                    title: "Authenticity",
                    desc: "本物だけを選びます。素材、技術、空間設計のすべてにおいて、妥協のない選択をしています。"
                  },
                  {
                    title: "Presence",
                    desc: "今この瞬間に集中します。セラピストとクライアント、両者が完全に現在に在ることで、真の癒しが生まれます。"
                  }
                ].map((value, i) => (
                  <div key={i} className="space-y-4">
                    <h3 className="font-serif text-xl tracking-wider text-primary">{value.title}</h3>
                    <p className="text-muted-foreground leading-loose text-sm">{value.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Commitment */}
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeIn}
              viewport={{ once: true }}
              className="space-y-6 border-t border-border pt-16"
            >
              <h2 className="font-serif text-3xl tracking-widest mb-8">こだわり</h2>
              <ul className="space-y-6">
                {[
                  {
                    title: "完全予約制・プライベート空間",
                    desc: "他のクライアントとの接触を避け、あなただけの時間を保証します。"
                  },
                  {
                    title: "オーガニック素材の厳選",
                    desc: "肌に直接触れるすべてのオイル、リネン、アロマは、世界基準のオーガニック認証を取得しています。"
                  },
                  {
                    title: "セラピストの継続的な研修",
                    desc: "解剖学、アロマテラピー、瞑想など、多角的な学習を通じて、施術の質を常に高めています。"
                  },
                  {
                    title: "カスタマイズされた施術",
                    desc: "その日の体調、気分、目的に合わせて、施術内容とアロマのブレンドを毎回調整いたします。"
                  },
                  {
                    title: "五感を癒す環境設計",
                    desc: "照明（色温度・明るさ）、音響（周波数）、香り、温度、湿度。すべてが計算された空間です。"
                  }
                ].map((item, i) => (
                  <li key={i} className="flex gap-6">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    <div>
                      <h4 className="font-serif text-lg tracking-wider mb-2">{item.title}</h4>
                      <p className="text-muted-foreground leading-loose text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container text-center space-y-8">
          <h2 className="font-serif text-3xl tracking-widest">
            agoの世界を、<br />
            体験してみませんか？
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-loose">
            初めてのご来店の方には、カウンセリングを丁寧に行い、<br />
            あなたにぴったりの施術をご提案させていただきます。
          </p>
          <button className="inline-block mt-8 px-10 py-4 bg-primary text-primary-foreground rounded-full tracking-widest font-medium hover:bg-primary/90 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
            ご予約はこちら
          </button>
        </div>
      </section>
    </Layout>
  );
}
