import { useState } from "react";
import { Compass, Gem, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type TravelPersona = "budzet" | "udobnost" | "brzi" | null;

interface TravelPersonaQuizProps {
  onSelect: (persona: TravelPersona) => void;
  selected: TravelPersona;
}

const personas = [
  {
    id: "budzet" as const,
    icon: Compass,
    label: "Budžet istraživač",
    emoji: "🎒",
    description: "Volim pristupačne avanture",
    color: "from-success/20 to-success/5 border-success/25 hover:border-success/40",
    activeColor: "from-success/30 to-success/10 border-success/40 shadow-[0_0_20px_hsl(152_60%_48%/0.15)]",
    iconColor: "text-success",
  },
  {
    id: "udobnost" as const,
    icon: Gem,
    label: "Ljubitelj udobnosti",
    emoji: "✨",
    description: "Kvalitet i komfor na prvom mestu",
    color: "from-accent/20 to-accent/5 border-accent/25 hover:border-accent/40",
    activeColor: "from-accent/30 to-accent/10 border-accent/40 shadow-[0_0_20px_hsl(248_55%_65%/0.15)]",
    iconColor: "text-accent",
  },
  {
    id: "brzi" as const,
    icon: Zap,
    label: "Brzi putnik",
    emoji: "⚡",
    description: "Najbrži dolazak, bez čekanja",
    color: "from-warning/20 to-warning/5 border-warning/25 hover:border-warning/40",
    activeColor: "from-warning/30 to-warning/10 border-warning/40 shadow-[0_0_20px_hsl(38_90%_55%/0.15)]",
    iconColor: "text-warning",
  },
];

const TravelPersonaQuiz = ({ onSelect, selected }: TravelPersonaQuizProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Chat bubble tail */}
      <div className="flex items-start gap-3 mb-5">
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-hero shadow-button"
        >
          <span className="text-lg">🧠</span>
        </motion.div>
        <div className="relative glass-card rounded-2xl rounded-tl-md px-5 py-3.5 shadow-card max-w-md">
          <p className="font-display font-semibold text-foreground text-sm">
            Kakav si putnik danas?
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Izaberi svoj stil i prilagodićemo preporuke za tebe ✨
          </p>
          {/* Bubble tail */}
          <div className="absolute -left-2 top-3 w-3 h-3 bg-card rotate-45 border-l border-b border-border/35" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {personas.map((persona, i) => {
          const isActive = selected === persona.id;
          return (
            <motion.button
              key={persona.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(isActive ? null : persona.id)}
              className={`relative text-left p-5 rounded-3xl border bg-gradient-to-br transition-all duration-300 ${
                isActive ? persona.activeColor : persona.color
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-background/60 ${persona.iconColor}`}>
                  <persona.icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-lg">{persona.emoji}</span>
              </div>
              <p className="font-display font-bold text-foreground text-sm">{persona.label}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{persona.description}</p>

              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground"
                >
                  <span className="text-[10px]">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex justify-center"
        >
          <Link to="/letovi">
            <Button
              variant="outline"
              size="sm"
              className="rounded-2xl gap-2 text-xs font-semibold border-accent/20 hover:border-accent/40"
            >
              Prikaži letove za moj stil
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TravelPersonaQuiz;
