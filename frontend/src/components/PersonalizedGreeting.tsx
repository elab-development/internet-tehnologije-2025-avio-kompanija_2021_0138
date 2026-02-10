import { Bell, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface UserProfile {
  name: string;
  avatar?: string;
  hasNotification?: boolean;
}

const PersonalizedGreeting = ({ user }: { user: UserProfile }) => {
  const [showNotif, setShowNotif] = useState(true);

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="relative">
        <div className="h-9 w-9 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-display font-bold text-sm shadow-button">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>
        {user.hasNotification && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent border-2 border-card"
          />
        )}
      </div>

      {/* Greeting text */}
      <div className="hidden sm:block">
        <p className="text-xs text-muted-foreground font-medium leading-none">Dobro došli nazad</p>
        <p className="text-sm font-display font-semibold text-foreground leading-tight mt-0.5">
          Zdravo {user.name}! ✨
        </p>
      </div>

      {/* Notification bell */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowNotif(!showNotif)}
        className="relative ml-1 p-2 rounded-xl hover:bg-lavender/50 transition-colors"
      >
        <Bell className="h-4 w-4 text-muted-foreground" />
        <AnimatePresence>
          {showNotif && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent animate-pulse-soft"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default PersonalizedGreeting;
