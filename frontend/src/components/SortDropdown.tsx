import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, ChevronDown, Zap, Clock, DollarSign, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type SortOption = "pametni" | "najjeftinije" | "najskuplje" | "najranije" | "najkasnije";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string; icon: typeof Zap }[] = [
  { value: "pametni", label: "Pametni izbor", icon: Sparkles },
  { value: "najjeftinije", label: "Najjeftinije", icon: DollarSign },
  { value: "najskuplje", label: "Najskuplje", icon: DollarSign },
  { value: "najranije", label: "Najranije", icon: Clock },
  { value: "najkasnije", label: "Najkasnije", icon: Clock },
];

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-card border border-border text-sm font-medium text-foreground hover:shadow-card transition-all"
      >
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        {selected.label}
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 z-50 w-48 glass-strong rounded-2xl border border-border shadow-card-hover p-1.5"
          >
            {options.map((option) => {
              const Icon = option.icon;
              const isActive = value === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => { onChange(option.value); setOpen(false); }}
                  className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  {option.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
