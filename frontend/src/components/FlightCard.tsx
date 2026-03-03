import React, { useState, useMemo } from "react";
import { Plane, Clock, TrendingUp, TrendingDown, Minus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "./BookingModal";

// Definisanje tipova
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
}

interface FlightCardProps {
  flight: any; // Koristimo any jer podatke mapiramo u Flights.tsx
  zenMode?: boolean;
  isFavorit?: boolean;
}

const statusConfig = {
  na_vreme: { label: "Na vreme", dotClass: "bg-success", pillClass: "bg-success/10 text-success border-success/20" },
  kasni: { label: "Kasni", dotClass: "bg-warning", pillClass: "bg-warning/10 text-warning border-warning/20" },
  otkazan: { label: "Otkazan", dotClass: "bg-destructive", pillClass: "bg-destructive/10 text-destructive border-destructive/20" },
};

// Čestice za animaciju srca
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

const FlightCard = ({ flight, zenMode = false, isFavorit = false }: FlightCardProps) => {
  const [showBooking, setShowBooking] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const status = flight.status || "na_vreme";
  const statusInfo = statusConfig[status as keyof typeof statusConfig] || statusConfig.na_vreme;

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
        {/* Header: Avio kompanija i Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-primary/10">
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">{flight.aviokompanija}</p>
              <p className="text-[10px] text-muted-foreground">{flight.broj_leta}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="p-2 hover:bg-white/10 rounded-xl relative">
              <Heart className={`h-4 w-4 ${saved ? "fill-rose text-rose" : "text-muted-foreground"}`} />
              {showHearts && [0,1,2,3,4].map(i => <HeartParticle key={i} index={i} />)}
            </button>
            {!zenMode && <Badge variant="outline" className={statusInfo.pillClass}>{statusInfo.label}</Badge>}
          </div>
        </div>

        {/* Relacija i Vremena */}
        <div className="flex items-center justify-between text-center py-2">
          <div className="flex-1 text-white">
            <p className="text-xl font-bold">{flight.polaziste}</p>
            <p className="text-xs text-muted-foreground mt-1">{flight.vreme_polaska}</p>
          </div>
          
          <div className="flex flex-col items-center px-4">
            <Plane className="h-4 w-4 text-muted-foreground rotate-90" />
            <div className="w-12 h-px bg-white/10 my-2" />
          </div>

          <div className="flex-1 text-white">
            <p className="text-xl font-bold">{flight.odrediste}</p>
            {/* OVO JE KLJUČNA PROMENA: Prikazuje +3h iz Flights.tsx */}
            <p className="text-xs text-muted-foreground mt-1">{flight.vreme_dolaska || "—"}</p>
          </div>
        </div>

        {/* Donji deo: Cena i Dugme */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Cena od</p>
            <p className="text-2xl font-bold text-white">
              {/* Siguran prikaz cene: pretvara u broj i formatira sa tačkama */}
              {Number(flight.cena || 0).toLocaleString("sr-RS")}
              <span className="text-xs ml-1 text-muted-foreground">RSD</span>
            </p>
          </div>
          <Button 
            onClick={() => setShowBooking(true)} 
            className="rounded-2xl bg-primary hover:bg-primary/80 transition-all font-semibold"
          >
            Rezerviši
          </Button>
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