import { Heart, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PersonalDestinationProps {
  userName: string;
  destination: string;
  season: string;
  reason: string;
}

const PersonalDestination = ({
  userName,
  destination,
  season,
  reason,
}: PersonalDestinationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Advisor chat bubble */}
      <div className="flex items-start gap-3">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-hero shadow-button"
        >
          <Heart className="h-5 w-5 text-primary-foreground" />
        </motion.div>

        <div className="relative flex-1 glass-card rounded-2xl rounded-tl-md overflow-hidden shadow-card-hover">
          {/* Lavender glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-lavender/40 via-transparent to-accent/5 pointer-events-none" />
          
          <div className="relative p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                Preporuka za tebe
              </span>
            </div>
            
            <p className="font-display text-base font-bold text-foreground leading-snug">
              {userName}, mislimo da bi ti se dopao{" "}
              <span className="text-gradient-hero">{destination}</span>{" "}
              {season} 💜
            </p>
            
            <p className="text-xs text-muted-foreground leading-relaxed">
              {reason}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3 text-accent/60" />
                <span>{destination}</span>
              </div>
              <Link to="/letovi">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="sm"
                    className="h-7 px-3 text-[11px] font-semibold bg-gradient-hero text-primary-foreground hover:opacity-90 rounded-xl shadow-button"
                  >
                    Pogledaj letove ✈️
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Bubble tail */}
          <div className="absolute -left-2 top-4 w-3 h-3 bg-card rotate-45 border-l border-b border-border/35" />
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalDestination;
