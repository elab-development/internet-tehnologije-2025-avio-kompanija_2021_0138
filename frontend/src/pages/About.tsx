import { Cloud, Shield, Globe, Users, Heart, Plane } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Shield, title: "Sigurnost", desc: "Vaši podaci i putovanja su uvek zaštićeni." },
  { icon: Globe, title: "Globalnost", desc: "200+ destinacija širom sveta." },
  { icon: Users, title: "Zajednica", desc: "50.000+ zadovoljnih putnika." },
  { icon: Heart, title: "Strast", desc: "Svaki let je osmišljen sa ljubavlju." },
];

const About = () => (
  <div className="bg-gradient-sky min-h-screen">
    {/* Hero */}
    <div className="bg-gradient-hero py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-60 pointer-events-none" />
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[600px] h-24 bg-background rounded-[50%] blur-sm" />
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary-foreground/10 mb-5 shadow-glow">
            <Cloud className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">O nama</h1>
          <p className="mt-3 text-primary-foreground/70 max-w-lg mx-auto text-lg leading-relaxed">
            Upoznajte tim iza CelesteAir-a
          </p>
        </motion.div>
      </div>
    </div>

    <div className="container mx-auto px-4 lg:px-8 py-16 -mt-6 space-y-16">
      {/* Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center space-y-6"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Naša priča</h2>
        <p className="text-muted-foreground leading-relaxed">
          CelesteAir je nastao iz jednostavne ideje — putovanje treba da bude lako, pristupačno i lepo. 
          Naš tim strastvenih putnika i inženjera stvorio je platformu koja koristi pametne algoritme 
          za pronalaženje najboljih letova, dok svaki korak putovanja čini ugodnim i elegantnim.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Od Beograda do sveta — CelesteAir je vaš pouzdani saputnik u svakoj avanturi. 
          Koristimo napredne ACID transakcije za zaključavanje cena, praćenje trendova i 
          personalizovane preporuke bazirane na vašim preferencijama. ✨
        </p>
      </motion.div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-strong rounded-3xl p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-500"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender mb-4">
              <v.icon className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Team note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-hero rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <motion.div
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-0"
        >
          <Plane className="h-5 w-5 text-primary-foreground/8 rotate-45" />
        </motion.div>
        <div className="relative z-10 space-y-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
            Napravljeno sa 💜 u Beogradu
          </h2>
          <p className="text-primary-foreground/60 max-w-md mx-auto leading-relaxed">
            Mali tim, veliki snovi. Svaki dan radimo na tome da vaše putovanje bude savršeno.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default About;
