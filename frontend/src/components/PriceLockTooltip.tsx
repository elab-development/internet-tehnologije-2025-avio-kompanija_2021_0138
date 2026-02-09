import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Timer } from "lucide-react";

interface PriceLockTooltipProps {
  children: React.ReactNode;
}

const PriceLockTooltip = ({ children }: PriceLockTooltipProps) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 w-64"
          >
            <div className="glass-strong rounded-2xl p-3.5 shadow-card-hover border border-accent/15 relative">
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <Lock className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-foreground leading-tight">
                    Zadrži cenu 🔒
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                    Ova cena je fiksirana na 5 minuta samo za tebe zahvaljujući našem pametnom sistemu.
                  </p>
                  <div className="flex items-center gap-1 mt-1.5 text-[9px] text-accent font-semibold">
                    <Timer className="h-3 w-3" />
                    ACID zaštita aktivna
                  </div>
                </div>
              </div>
              {/* Tooltip arrow */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-card border-b border-r border-accent/15" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceLockTooltip;
