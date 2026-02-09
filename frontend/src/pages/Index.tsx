import { useState } from "react";
import { ArrowRight, Shield, Globe, Clock, Sparkles, Cloud, Star, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import DestinationStories from "@/components/DestinationStories";
import RecommendedFlights from "@/components/RecommendedFlights";
import PopularDestinations from "@/components/PopularDestinations";
import PersonalizedAlert from "@/components/PersonalizedAlert";
import TravelPersonaQuiz, { type TravelPersona } from "@/components/TravelPersonaQuiz";
import PersonalDestination from "@/components/PersonalDestination";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Sigurna rezervacija",
    description: "Vaši podaci su zaštićeni najsavremenijom enkripcijom i sigurnosnim protokolima.",
  },
  {
    icon: Globe,
    title: "Globalna mreža",
    description: "Letovi ka preko 200 destinacija širom sveta po najpovoljnijim cenama.",
  },
  {
    icon: Clock,
    title: "24/7 Podrška",
    description: "Naš tim stručnjaka je uvek dostupan za sva vaša pitanja i pomoć.",
  },
];

const stats = [
  { value: "200+", label: "Destinacija" },
  { value: "50K+", label: "Zadovoljnih putnika" },
  { value: "99%", label: "Na vreme" },
  { value: "4.9", label: "Ocena", icon: Star },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const Index = () => {
  const [persona, setPersona] = useState<TravelPersona>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [-15, 15, -15], x: [-8, 8, -8] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-[8%] w-72 h-72 rounded-full bg-primary-foreground/5 blur-3xl"
          />
          <motion.div
            animate={{ y: [12, -12, 12], x: [6, -6, 6] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 right-[12%] w-96 h-96 rounded-full bg-primary-foreground/4 blur-3xl"
          />
          <motion.div
            animate={{ y: [8, -18, 8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-[30%] w-48 h-48 rounded-full bg-primary-foreground/3 blur-3xl"
          />
          <motion.div
            animate={{ x: ["-10%", "110%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] left-0"
          >
            <Plane className="h-6 w-6 text-primary-foreground/10 rotate-45" />
          </motion.div>
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-24 md:py-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-primary-foreground/90 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Putujte bez napora
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] tracking-tight"
            >
              Dobro došli u{" "}
              <span className="relative inline-block">
                CelesteAir
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-foreground/25 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-primary-foreground/65 max-w-xl mx-auto leading-relaxed"
            >
              Otkrijte svet sa nama. Najpovoljnije ponude, elegantna putovanja i besprekorna usluga na dohvat ruke.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/letovi">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button className="h-13 px-7 bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/25 font-semibold text-base gap-2 rounded-2xl backdrop-blur-sm transition-all duration-300">
                    Pregledaj letove
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/rezervacije">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="ghost" className="h-13 px-7 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 font-medium text-base rounded-2xl transition-all duration-300">
                    Moje rezervacije
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <p className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</p>
                    {stat.icon && <stat.icon className="h-4 w-4 text-warning fill-warning" />}
                  </div>
                  <p className="text-xs text-primary-foreground/50 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="mt-16 max-w-4xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Personalized Alert */}
      <section className="container mx-auto px-4 lg:px-8 -mt-4 mb-4 relative z-10">
        <PersonalizedAlert userName="Teodora" destination="Pariza" discount={15} />
      </section>

      {/* Travel Persona Quiz */}
      <section className="container mx-auto px-4 lg:px-8 py-10">
        <TravelPersonaQuiz onSelect={setPersona} selected={persona} />
      </section>

      {/* Personal Destination Suggestion */}
      <section className="container mx-auto px-4 lg:px-8 pb-10">
        <PersonalDestination
          userName="Teodora"
          destination="Pariz"
          season="ovog proleća"
          reason="Na osnovu tvojih prethodnih pretraga i omiljenih destinacija, Pariz nudi savršen spoj kulture, hrane i romantike po odličnim cenama."
        />
      </section>

      {/* Destination Stories */}
      <section className="container mx-auto px-4 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Popularne destinacije za tvoj stil putovanja
          </p>
          <DestinationStories />
        </motion.div>
      </section>

      {/* Recommended Flights */}
      <RecommendedFlights />

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Features */}
      <section className="bg-gradient-sky py-28 relative">
        <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Naše prednosti</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Zašto izabrati nas?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto text-lg leading-relaxed">
              Pružamo vam najbolje iskustvo putovanja od samog početka.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <div className="glass-strong rounded-3xl p-9 text-center shadow-card hover:shadow-card-hover transition-all duration-500 h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender mb-6 shadow-sm">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-hero rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-[30%] left-0 right-0"
            >
              <Plane className="h-5 w-5 text-primary-foreground/8 rotate-45" />
            </motion.div>

            <div className="relative z-10 space-y-7">
              <Cloud className="h-14 w-14 text-primary-foreground/40 mx-auto" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
                Spremni za sledeće putovanje?
              </h2>
              <p className="text-primary-foreground/60 max-w-lg mx-auto text-lg leading-relaxed">
                Pronađite najpovoljnije letove i rezervišite za samo par klikova. Vaša avantura počinje ovde.
              </p>
              <div className="pt-2">
                <Link to="/letovi">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                    <Button className="h-13 px-8 bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/25 font-semibold text-base rounded-2xl backdrop-blur-sm gap-2 transition-all duration-300">
                      Pretražite letove
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
