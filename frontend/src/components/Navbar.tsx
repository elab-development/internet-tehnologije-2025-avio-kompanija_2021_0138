import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import PersonalizedGreeting from "./PersonalizedGreeting";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Početna", path: "/" },
  { label: "Letovi", path: "/letovi" },
  { label: "Moje Rezervacije", path: "/rezervacije" },
];
const mockUser = {
  name: "",  
  hasNotification: true,
};


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass shadow-nav">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-hero shadow-button"
            >
              <Cloud className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <span className="font-display text-xl font-bold text-foreground tracking-tight">
              Celeste<span className="text-gradient-hero">Air</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-secondary rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? "text-secondary-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right: Theme + Greeting + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <PersonalizedGreeting user={mockUser} />
            <Link to="/prijava">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90 font-semibold rounded-xl shadow-button transition-all duration-300">
                  Prijavite se
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meni"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </header>

      {/* Mobile Slide-out */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-[280px] bg-card shadow-card-hover md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <span className="font-display text-lg font-bold text-foreground">
                    Celeste<span className="text-gradient-hero">Air</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile greeting + theme */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <PersonalizedGreeting user={mockUser} />
                  <ThemeToggle />
                </div>

                <nav className="flex flex-col gap-1 p-4 flex-1">
                  {navItems.map((item, i) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center px-4 py-3.5 rounded-2xl text-sm font-medium transition-all ${
                            isActive
                              ? "bg-secondary text-secondary-foreground font-semibold"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-border">
                  <Link to="/prijava" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 font-semibold rounded-2xl h-12 shadow-button">
                      Prijavite se
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
