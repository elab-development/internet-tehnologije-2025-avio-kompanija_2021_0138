import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const destinations = [
  { name: "Pariz", country: "Francuska", price: "od 19.800 RSD", emoji: "🇫🇷", gradient: "from-blue-400/20 to-purple-400/20" },
  { name: "Istanbul", country: "Turska", price: "od 12.900 RSD", emoji: "🇹🇷", gradient: "from-orange-400/20 to-red-400/20" },
  { name: "London", country: "Engleska", price: "od 24.500 RSD", emoji: "🇬🇧", gradient: "from-sky-400/20 to-blue-400/20" },
  { name: "Rim", country: "Italija", price: "od 17.300 RSD", emoji: "🇮🇹", gradient: "from-green-400/20 to-emerald-400/20" },
  { name: "Berlin", country: "Nemačka", price: "od 8.700 RSD", emoji: "🇩🇪", gradient: "from-yellow-400/20 to-orange-400/20" },
  { name: "Barcelona", country: "Španija", price: "od 21.400 RSD", emoji: "🇪🇸", gradient: "from-red-400/20 to-yellow-400/20" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PopularDestinations = () => (
  <section className="py-20 bg-gradient-sky relative">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
          Popularne destinacije
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Najpopularnija odredišta
        </h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
          Otkrijte najtraženije destinacije naših putnika
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {destinations.map((dest) => (
          <motion.div
            key={dest.name}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer group relative"
          >
            <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className={`bg-gradient-to-br ${dest.gradient} p-8 flex items-center justify-center`}>
              <span className="text-5xl">{dest.emoji}</span>
            </div>

            <div className="relative p-4 space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <h3 className="font-display font-bold text-foreground">{dest.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{dest.country}</p>
              <p className="text-sm font-display font-bold text-accent mt-1">{dest.price}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default PopularDestinations;
