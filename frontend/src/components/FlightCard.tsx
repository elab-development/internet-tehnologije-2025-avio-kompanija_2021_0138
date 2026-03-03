import React, { useState, useEffect, useMemo } from "react";
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
  flight: any; // Koristimo any da bismo bili sigurni da prihvata nase 'ubrizgane' podatke
  zenMode?: boolean;
  isFavorit?: boolean;
  smartTags?: { label: string; emoji: string }[];
}

const statusConfig = {
  na_vreme: { label: "Na vreme", dotClass: "bg-success", pillClass: "bg-success/10 text-success border-success/20" },
  kasni: { label: "Kasni", dotClass: "bg-warning", pillClass: "bg-warning/10 text-warning border-warning/20" },
  otkazan: { label: "Otkazan", dotClass: "bg-destructive", pillClass: "bg-destructive/10 text-destructive border-destructive/20" },
};

const trendConfig = {
  raste: { icon: TrendingUp, label: "Cena raste", className: "text-destructive" },
  pada: { icon: TrendingDown, label: "Cena pada", className: "text-success" },
  stabilna: { icon: Minus, label: "Stabilna", className: "text-muted-foreground" },
};

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
  const statusInfo = statusConfig[status as keyof typeof statusConfig] || statusConfig.na_vreme;
  const trendInfo = trendConfig[trend as keyof typeof trendConfig] || trendConfig.stabilna;
  const TrendIcon = trendInfo.icon;

  const viewers = useMemo(() => Math.floor(Math.random() * 6) + 2, []);

  const priceAdvisor = useMemo(() => {
    if (trend === "pada") return { emoji: "✨", message: "Odlična prilika! Cena je niža.", variant: "success" as const };
    if (trend === "raste") return { emoji: "⏳", message: "Sačekajte pad cene.", variant: "warning" as const };
    return null;
  }, [trend]);

  const handleWatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWatching(!watching);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    if (!saved) {
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 800);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.015 }}
        className={`group glass-card rounded-3xl shadow-card p-6 space-y-4 relative overflow-hidden bg-white/5 border border-white/10 ${
          isFavorit ? "ring-2 ring-accent" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-primary/10">
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-sm">{flight.aviokompanija}</p>
              <p className="text-[10px] text-muted-foreground">{flight.broj_leta}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="p-2 hover:bg-white/10 rounded-xl relative">
              <Heart className={`h-4 w-4 ${saved ? "fill-rose text-rose" : "text-muted-foreground"}`} />
              {showHearts && [0,1,2,3,4].map(i => <HeartParticle key={i} index={i} />)}
            </button>
            <Badge variant="outline" className={statusInfo.pillClass}>{statusInfo.label}</Badge>
          </div>
        </div>

        <div className="flex items-center justify-between text-center py-2">
          <div className="flex-1">
            <p className="text-xl font-bold">{flight.polaziste}</p>
            <p className="text-xs text-muted-foreground">{flight.vreme_polaska}</p>
          </div>
          <Plane className="h-4 w-4 text-muted-foreground rotate-90 mx-4" />
          <div className="flex-1">
            <p className="text-xl font-bold">{flight.odrediste}</p>
            <p className="text-xs text-muted-foreground">{flight.vreme_dolaska || "14:30"}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Cena od</p>
            <p className="text-2xl font-bold text-white">
            {/* Ako je flight.cena 0, ispisaće "NEMA", tako ćemo znati da li podatak uopšte stiže */}
            {flight.cena && flight.cena !== 0 
                ? Number(flight.cena).toLocaleString("sr-RS") 
                : "PROVERI API"} 
           <span className="text-xs ml-1 text-muted-foreground">RSD</span>
          </p>
          </div>
          <Button onClick={() => setShowBooking(true)} className="rounded-2xl bg-primary hover:bg-primary/80">
            Rezerviši
          </Button>
        </div>
      </motion.div>

      <BookingModal flight={flight} open={showBooking} onClose={() => setShowBooking(false)} />
    </>
  );
};

export default FlightCard;