import { Cloud, Heart, Plane, MapPin, Mail, Phone, Instagram, Twitter, Share2, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Početna", path: "/" },
  { label: "Letovi", path: "/letovi" },
  { label: "Moje Rezervacije", path: "/rezervacije" },
  { label: "Prijava", path: "/prijava" },
];

const companyLinks = [
  { label: "O nama", path: "/o-nama" },
  { label: "Blog", path: "/blog" },
];

const legalLinks = [
  { label: "Uslovi korišćenja" },
  { label: "Politika privatnosti" },
  { label: "Kolačići" },
];

const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Decorative top wave */}
      <div className="h-1 bg-gradient-hero" />

      {/* Main footer content */}
      <div className="bg-navy text-navy-foreground">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="space-y-5 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-hero shadow-button"
                >
                  <Cloud className="h-5 w-5 text-primary-foreground" />
                </motion.div>
                <span className="font-display text-xl font-bold">
                  Celeste<span className="text-celeste">Air</span>
                </span>
              </div>
              <p className="text-sm text-navy-foreground/50 max-w-xs leading-relaxed">
                Putujte bez napora. Vaš pouzdani partner za elegantne letove i besprekorna iskustva širom sveta. ✨
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {[Instagram, Twitter, Mail].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-foreground/5 hover:bg-navy-foreground/10 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-navy-foreground/50" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-xs uppercase tracking-[0.15em] text-navy-foreground/35">
                Navigacija
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-navy-foreground/50 hover:text-navy-foreground transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <Plane className="h-3 w-3 text-navy-foreground/20 group-hover:text-celeste transition-colors rotate-45" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-xs uppercase tracking-[0.15em] text-navy-foreground/35">
                Kompanija
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-navy-foreground/50 hover:text-navy-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-xs uppercase tracking-[0.15em] text-navy-foreground/35">
                Kontakt
              </h4>
              <ul className="space-y-3 text-sm text-navy-foreground/50">
                <li className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-celeste/60" />
                  info@celesteair.rs
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-celeste/60" />
                  +381 11 123 4567
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 text-celeste/60" />
                  Beograd, Srbija
                </li>
              </ul>

              {/* Legal links */}
              <div className="pt-2 space-y-1.5">
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href="#"
                    className="block text-[11px] text-navy-foreground/30 hover:text-navy-foreground/50 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Coming Soon banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 mb-6 flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-navy-foreground/5 border border-navy-foreground/8">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15">
                <Share2 className="h-4 w-4 text-celeste" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-foreground/60 uppercase tracking-wider">Uskoro</span>
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Rocket className="h-3 w-3 text-celeste" />
                  </motion.div>
                </div>
                <p className="text-[11px] text-navy-foreground/40 mt-0.5">
                  Delite itinerare sa prijateljima i planiraite putovanja zajedno! ✈️
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-navy-foreground/8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-xs text-navy-foreground/30">
                © {new Date().getFullYear()} CelesteAir. Sva prava zadržana.
              </span>

              {/* Made with love */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-1.5 text-xs text-navy-foreground/35"
              >
                Napravljeno sa
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  💜
                </motion.span>
                za CelesteAir
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
