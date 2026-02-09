import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Flight } from "./FlightCard";

const recommendedFlights: Flight[] = [
  {
    id: 101,
    broj_leta: "CA-205",
    aviokompanija: "CelesteAir",
    polaziste: "Beograd",
    odrediste: "Pariz",
    vreme_polaska: "12:15",
    vreme_dolaska: "14:30",
    cena: 19800,
    status: "na_vreme",
    trend_cene: "pada",
    najniza_cena: true,
  },
  {
    id: 102,
    broj_leta: "TK-812",
    aviokompanija: "Turkish Airlines",
    polaziste: "Beograd",
    odrediste: "Istanbul",
    vreme_polaska: "16:45",
    vreme_dolaska: "19:30",
    cena: 12900,
    status: "na_vreme",
    trend_cene: "pada",
    najniza_cena: true,
  },
  {
    id: 103,
    broj_leta: "CA-333",
    aviokompanija: "Air Serbia",
    polaziste: "Beograd",
    odrediste: "Rim",
    vreme_polaska: "14:00",
    vreme_dolaska: "15:40",
    cena: 17300,
    status: "na_vreme",
    trend_cene: "stabilna",
    najniza_cena: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const RecommendedFlights = () => (
  <section className="py-20 relative">
    <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/8 border border-accent/15 text-accent text-xs font-semibold mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Prilagođeno za vas
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Preporučeno za Vas
        </h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
          Na osnovu vaših prethodnih pretraga pronašli smo savršene letove
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {recommendedFlights.map((flight) => (
          <motion.div key={flight.id} variants={cardVariants}>
            <div className="glass-card rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden group relative">
              {/* Recommended glow */}
              <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="h-1.5 bg-gradient-hero" />

              <div className="relative p-5 space-y-3">
                {/* Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/8 border border-accent/15">
                    <Heart className="h-3 w-3 text-accent fill-accent" />
                    <span className="text-[10px] font-semibold text-accent">Najbolji spoj cene i udobnosti</span>
                  </div>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg font-bold text-foreground">{flight.polaziste}</p>
                    <p className="text-xs text-muted-foreground font-medium">{flight.vreme_polaska}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-foreground">{flight.odrediste}</p>
                    <p className="text-xs text-muted-foreground font-medium">{flight.vreme_dolaska}</p>
                  </div>
                </div>

                {/* Airline + Price */}
                <div className="flex items-end justify-between pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground font-medium">{flight.aviokompanija}</p>
                  <p className="font-display text-xl font-bold text-foreground">
                    {flight.cena.toLocaleString("sr-RS")}
                    <span className="text-xs font-medium text-muted-foreground ml-1">RSD</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-8">
        <Link to="/letovi">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Button variant="outline" className="rounded-2xl gap-2 font-semibold glass-card border-border">
              Pogledaj sve letove
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </Link>
      </div>
    </div>
  </section>
);

export default RecommendedFlights;
