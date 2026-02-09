import { Sparkles, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface AdvisorBubbleProps {
  emoji: string;
  message: string;
  variant?: "success" | "warning" | "info";
}

const variantStyles = {
  success: {
    bg: "bg-success/6 border-success/15",
    text: "text-success",
    glow: "shadow-[0_0_12px_hsl(152_60%_48%/0.08)]",
  },
  warning: {
    bg: "bg-warning/6 border-warning/15",
    text: "text-warning",
    glow: "shadow-[0_0_12px_hsl(38_90%_55%/0.08)]",
  },
  info: {
    bg: "bg-accent/6 border-accent/15",
    text: "text-accent",
    glow: "shadow-[0_0_12px_hsl(248_55%_65%/0.08)]",
  },
};

const AdvisorBubble = ({ emoji, message, variant = "info" }: AdvisorBubbleProps) => {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`relative flex items-start gap-2 rounded-2xl rounded-bl-md border px-3 py-2.5 ${styles.bg} ${styles.glow}`}
    >
      <span className="text-sm shrink-0 mt-px">{emoji}</span>
      <p className={`text-[11px] font-medium leading-relaxed ${styles.text}`}>
        {message}
      </p>
      {/* Chat bubble tail */}
      <div className={`absolute -bottom-1.5 left-3 w-2.5 h-2.5 rotate-45 border-b border-r ${styles.bg}`} />
    </motion.div>
  );
};

export default AdvisorBubble;
