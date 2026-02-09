import { useState, useMemo } from "react";
import { Plane, Clock, TrendingUp, TrendingDown, Minus, Sparkles, Bell, BellRing, Heart, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import BookingModal from "./BookingModal";
import AdvisorBubble from "./AdvisorBubble";
import SmartTag from "./SmartTag";
import PriceLockTooltip from "./PriceLockTooltip";

export interface Flight {
  id: number;
  broj_leta?: string;
  aviokompanija: string;
  polaziste: string;
  odrediste: string;
  vreme_polaska: string;
  vreme_dolaska?: string;
  cena: number;
  status?: "na_vreme" | "kasni" | "otkazan";
  trend_cene?: "raste" | "pada" | "stabilna";
  najniza_cena?: boolean;
}

interface FlightCardProps {
  flight: Flight;
  zenMode?: boolean;
  isFavorit?: boolean;
  smartTags?: { label: string; emoji: string }[];
}

const statusConfig = {
  na_vreme: {
    label: "Na vreme",
    dotClass: "bg-success",
    pillClass: "bg-success/10 text-success border-success/20",
  },
  kasni: {
    label: "Kasni",
    dotClass: "bg-warning",
    pillClass: "bg-warning/10 text-warning border-warning/20",
  },
  otkazan: {
    label: "Otkazan",
    dotClass: "bg-destructive",
    pillClass: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const trendConfig = {
  raste: { icon: TrendingUp, label: "Cena raste", className: "text-destructive" },
  pada: { icon: TrendingDown, label: "Cena pada", className: "text-success" },
  stabilna: { icon: Minus, label: "Stabilna", className: "text-muted-foreground" },
};

// Floating heart animation particles
const HeartParticle = ({ index }: { index: number }) => {
  const angle = (index * 72) + Math.random() * 30;
  const distance = 30 + Math.random() * 20;
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 0, x, y: y - 20 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <Heart className="h-3 w-3 text-rose fill-rose" />
    </motion.div>
  );
};

const FlightCard = ({ flight, zenMode = false, isFavorit = false, smartTags = [] }: FlightCardProps) => {
  const [showBooking, setShowBooking] = useState(false);
  const [watching, setWatching] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const { toast } = useToast();

  const status = flight.status || "na_vreme";
  const trend = flight.trend_cene || "stabilna";
  const statusInfo = statusConfig[status];
  const trendInfo = trendConfig[trend];
  const TrendIcon = trendInfo.icon;

  const viewers = useMemo(() => Math.floor(Math.random() * 6) + 2, []);

  // Price advisor messages
  const priceAdvisor = useMemo(() => {
    if (trend === "pada")
      return { emoji: "✨", message: "Odlična prilika! Cena je 15% niža od uobičajene.", variant: "success" as const };
    if (trend === "raste")
      return { emoji: "⏳", message: "Naš savet: Sačekaj još malo, predviđamo pad cene uskoro.", variant: "warning" as const };
    return null;
  }, [trend]);

  const handleWatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWatching(!watching);
    toast({
      title: watching ? "🔕 Obaveštenje isključeno" : "🔔 Pratite cenu",
      description: watching
        ? `Nećete više dobijati obaveštenja za let ${flight.polaziste} → ${flight.odrediste}.`
        : `Obavestićemo vas kada cena za let ${flight.polaziste} → ${flight.odrediste} padne.`,
    });
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = !saved;
    setSaved(newSaved);
    if (newSaved) {
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 800);
    }
    toast({
      title: newSaved ? "💜 Sačuvano!" : "Uklonjeno iz sačuvanih",
      description: newSaved
        ? `Let ${flight.polaziste} → ${flight.odrediste} je dodat u omiljene.`
        : `Let je uklonjen iz omiljenih.`,
    });
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={`group glass-card rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden relative ${
          isFavorit ? "ring-2 ring-accent/30 ring-offset-2 ring-offset-background" : ""
        }`}
      >
        {/* CelesteAir Favorit badge */}
        {isFavorit && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-hero shadow-button"
          >
            <Award className="h-3.5 w-3.5 text-primary-foreground" />
            <span className="text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
              CelesteAir Favorit
            </span>
          </motion.div>
        )}

        {/* Top gradient accent */}
        <div className={`h-1.5 ${isFavorit ? "bg-gradient-gold" : "bg-gradient-hero"}`} />

        {/* Glow on hover */}
        <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative p-6 space-y-4">
          {/* Header: Airline + Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender shadow-sm">
                <Plane className="h-4.5 w-4.5 text-accent" />
              </div>
              <div>
                <span className="font-display font-semibold text-foreground text-sm">
                  {flight.aviokompanija}
                </span>
                {flight.broj_leta && (
                  <p className="text-[11px] text-muted-foreground font-medium">{flight.broj_leta}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {/* Save / heart button */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleSave}
                className="relative p-2 rounded-xl transition-all duration-200 hover:bg-rose/10"
                title={saved ? "Ukloni iz omiljenih" : "Sačuvaj let"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={saved ? "saved" : "unsaved"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${
                        saved ? "text-rose fill-rose" : "text-muted-foreground"
                      }`}
                    />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                  {showHearts && (
                    <>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <HeartParticle key={i} index={i} />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Price alert bell */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWatch}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  watching
                    ? "bg-accent/10 text-accent"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
                title={watching ? "Prestani pratiti cenu" : "Prati cenu"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={watching ? "active" : "inactive"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {watching ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {!isFavorit && (
                <Badge
                  variant="outline"
                  className={`rounded-full text-[11px] font-semibold px-2.5 py-1 gap-1.5 border ${statusInfo.pillClass}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                  {statusInfo.label}
                </Badge>
              )}
            </div>
          </div>

          {/* Smart Tags */}
          {!zenMode && smartTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {smartTags.map((tag) => (
                <SmartTag key={tag.label} label={tag.label} emoji={tag.emoji} />
              ))}
            </div>
          )}

          {/* Route */}
          <div className="flex items-center gap-2">
            <div className="flex-1 text-center">
              <p className="font-display text-xl font-bold text-foreground leading-none">{flight.polaziste}</p>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium">{flight.vreme_polaska}</p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground px-2">
              <div className="w-5 h-px bg-border" />
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Plane className="h-4 w-4 text-primary rotate-45" />
              </motion.div>
              <div className="w-5 h-px bg-border" />
            </div>
            <div className="flex-1 text-center">
              <p className="font-display text-xl font-bold text-foreground leading-none">{flight.odrediste}</p>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium">{flight.vreme_dolaska || "—"}</p>
            </div>
          </div>

          {/* Info row */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-medium">Direktan let</span>
            </div>
            {!zenMode && (
              <div className="flex items-center gap-1.5" title={trendInfo.label}>
                <TrendIcon className={`h-3.5 w-3.5 ${trendInfo.className}`} />
                <span className={`font-medium ${trendInfo.className}`}>{trendInfo.label}</span>
              </div>
            )}
          </div>

          {/* Social proof */}
          {!zenMode && (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Users className="h-3 w-3 text-accent/60" />
              <span>{viewers} osobe gledaju ovaj let</span>
            </div>
          )}

          {/* Price Advisor chat bubble */}
          {!zenMode && priceAdvisor && (
            <AdvisorBubble
              emoji={priceAdvisor.emoji}
              message={priceAdvisor.message}
              variant={priceAdvisor.variant}
            />
          )}

          {/* Lowest price badge */}
          {flight.najniza_cena && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 bg-success/8 border border-success/15 rounded-2xl px-3 py-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-success" />
              <span className="text-[11px] font-semibold text-success">Najniža cena u 30 dana</span>
            </motion.div>
          )}

          {/* Watching indicator */}
          {watching && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-1.5 bg-accent/6 border border-accent/12 rounded-2xl px-3 py-1.5"
            >
              <BellRing className="h-3.5 w-3.5 text-accent animate-pulse-soft" />
              <span className="text-[11px] font-semibold text-accent">Pratite ovu cenu</span>
            </motion.div>
          )}

          {/* Price + CTA */}
          <div className="flex items-end justify-between pt-3 border-t border-border/60">
            <PriceLockTooltip>
              <div className="cursor-help">
                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">Cena od</p>
                <p className="font-display text-2xl font-bold text-foreground leading-none mt-1">
                  {flight.cena.toLocaleString("sr-RS")}
                  <span className="text-xs font-medium text-muted-foreground ml-1">RSD</span>
                </p>
              </div>
            </PriceLockTooltip>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => setShowBooking(true)}
                className="bg-gradient-hero text-primary-foreground hover:opacity-90 font-semibold rounded-2xl shadow-button transition-all duration-300 hover:shadow-glow"
              >
                Rezerviši odmah
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <BookingModal
        flight={flight}
        open={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </>
  );
};

export default FlightCard;
