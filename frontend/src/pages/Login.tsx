import { useState } from "react";
import { Cloud, Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Prijava:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-sky px-4 py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        animate={{ y: [8, -12, 8] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[15%] w-72 h-72 rounded-full bg-accent/5 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="glass-strong rounded-3xl shadow-card-hover p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero mb-4 shadow-button"
            >
              <Cloud className="h-7 w-7 text-primary-foreground" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Prijavite se
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              Pristupite svom CelesteAir nalogu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email adresa
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="vas@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-lavender/40 border-0 font-medium rounded-2xl focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Lozinka
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-lavender/40 border-0 font-medium pr-12 rounded-2xl focus:ring-2 focus:ring-primary/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-xs text-primary hover:underline font-medium">
                Zaboravili ste lozinku?
              </a>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-hero text-primary-foreground hover:opacity-90 font-semibold text-base rounded-2xl shadow-button transition-all duration-300"
              >
                Prijavite se
              </Button>
            </motion.div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Nemate nalog?{" "}
            <a href="#" className="text-primary font-semibold hover:underline">
              Registrujte se
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
