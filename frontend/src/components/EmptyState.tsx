import { Cloud, Plane, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type?: "flights" | "reservations" | "search";
  message?: string;
}

const configs = {
  flights: {
    icon: Plane,
    title: "Nema dostupnih letova",
    description: "Trenutno nema letova koji odgovaraju vašim kriterijumima. Probajte da promenite filtere.",
    cta: null,
  },
  reservations: {
    icon: Cloud,
    title: "Nemate rezervacija",
    description: "Pretražite letove i rezervišite vaše sledeće putovanje uz CelesteAir.",
    cta: { label: "Pretražite letove", path: "/letovi" },
  },
  search: {
    icon: Search,
    title: "Nema rezultata pretrage",
    description: "Pokušajte sa drugim terminima ili resetujte filtere za više rezultata.",
    cta: null,
  },
};

const EmptyState = ({ type = "flights", message }: EmptyStateProps) => {
  const config = configs[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-3xl p-14 text-center shadow-card max-w-lg mx-auto relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />

      <div className="relative z-10">
        {/* Animated icon */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-lavender/50 mb-6"
        >
          <Icon className="h-10 w-10 text-accent/40" />
        </motion.div>

        <h2 className="font-display text-xl font-bold text-foreground mb-2">
          {config.title}
        </h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto leading-relaxed">
          {message || config.description}
        </p>

        {config.cta && (
          <Link to={config.cta.path}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90 font-semibold rounded-2xl shadow-button">
                {config.cta.label}
              </Button>
            </motion.div>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyState;
