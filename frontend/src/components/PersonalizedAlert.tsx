import { TrendingDown, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface AlertProps {
  userName: string;
  destination: string;
  discount: number;
}

const PersonalizedAlert = ({ userName, destination, discount }: AlertProps) => {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="glass-card rounded-2xl p-4 border border-accent/20 relative overflow-hidden group"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-glow opacity-40 pointer-events-none" />

          <div className="relative z-10 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
              <TrendingDown className="h-5 w-5 text-accent" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="text-[11px] font-semibold text-accent uppercase tracking-wide">
                  Personalizovano obaveštenje
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">{userName}</span>, cena za tvoj omiljeni let do{" "}
                <span className="font-semibold text-accent">{destination}</span> je upravo pala za{" "}
                <span className="font-bold text-success">{discount}%</span>! 🎉
              </p>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="p-1 rounded-lg hover:bg-muted transition-colors shrink-0"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PersonalizedAlert;
