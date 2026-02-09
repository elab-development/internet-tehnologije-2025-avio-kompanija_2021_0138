import { Sun, Navigation, Wallet, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Preference {
  id: string;
  label: string;
  icon: typeof Sun;
  enabled: boolean;
}

const defaultPreferences: Preference[] = [
  { id: "jutarnji", label: "Volim jutarnje letove", icon: Sun, enabled: false },
  { id: "direktni", label: "Samo direktni letovi", icon: Navigation, enabled: true },
  { id: "budzet", label: "Budžet opcija", icon: Wallet, enabled: false },
];

const UserPreferences = () => {
  const [prefs, setPrefs] = useState(defaultPreferences);

  const toggle = (id: string) => {
    setPrefs(prefs.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  return (
    <div className="glass-card rounded-3xl shadow-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <h3 className="font-display font-bold text-foreground text-sm">Pametne preference</h3>
      </div>

      <div className="space-y-2">
        {prefs.map((pref) => {
          const Icon = pref.icon;
          return (
            <motion.button
              key={pref.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggle(pref.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-300 border text-left ${
                pref.enabled
                  ? "bg-accent/8 border-accent/20 text-foreground"
                  : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                pref.enabled ? "bg-accent/15" : "bg-muted/50"
              }`}>
                <Icon className={`h-4 w-4 ${pref.enabled ? "text-accent" : "text-muted-foreground"}`} />
              </div>
              <span className="text-sm font-medium flex-1">{pref.label}</span>
              {/* Toggle */}
              <div className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-300 ${
                pref.enabled ? "bg-accent" : "bg-muted"
              }`}>
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-5 h-5 rounded-full bg-card shadow-sm ${pref.enabled ? "ml-auto" : ""}`}
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default UserPreferences;
