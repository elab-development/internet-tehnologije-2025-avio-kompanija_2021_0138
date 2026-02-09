import { motion } from "framer-motion";

interface SmartTagProps {
  label: string;
  emoji: string;
}

const SmartTag = ({ label, emoji }: SmartTagProps) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-lavender/50 border border-accent/10 text-[10px] font-semibold text-accent"
  >
    <span>{emoji}</span>
    {label}
  </motion.span>
);

export default SmartTag;
