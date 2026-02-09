import { Plane, MapPin, Clock, QrCode, Calendar, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import UserPreferences from "@/components/UserPreferences";
import PriceWatchlist from "@/components/PriceWatchlist";
import EmptyState from "@/components/EmptyState";

interface Reservation {
  id: string;
  broj_leta: string;
  aviokompanija: string;
  polaziste: string;
  odrediste: string;
  vreme_polaska: string;
  vreme_dolaska: string;
  datum: string;
  cena: number;
  status: "potvrđena" | "čeka" | "otkazana";
  putnik: string;
  sediste: string;
  klasa: string;
}

const mockReservations: Reservation[] = [
  {
    id: "RES-001",
    broj_leta: "CA-205",
    aviokompanija: "CelesteAir",
    polaziste: "Beograd",
    odrediste: "Pariz",
    vreme_polaska: "12:15",
    vreme_dolaska: "14:30",
    datum: "2026-03-15",
    cena: 19800,
    status: "potvrđena",
    putnik: "Teodora Nikolić",
    sediste: "12A",
    klasa: "Ekonomska",
  },
  {
    id: "RES-002",
    broj_leta: "TK-812",
    aviokompanija: "Turkish Airlines",
    polaziste: "Beograd",
    odrediste: "Istanbul",
    vreme_polaska: "16:45",
    vreme_dolaska: "19:30",
    datum: "2026-04-02",
    cena: 12900,
    status: "potvrđena",
    putnik: "Teodora Nikolić",
    sediste: "7C",
    klasa: "Biznis",
  },
];

const statusStyles = {
  "potvrđena": "bg-success/10 text-success border-success/20",
  "čeka": "bg-warning/10 text-warning border-warning/20",
  "otkazana": "bg-destructive/10 text-destructive border-destructive/20",
};

const TicketCard = ({ reservation, index }: { reservation: Reservation; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -4 }}
    className="glass-strong rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden"
  >
    {/* Top gradient */}
    <div className="h-1.5 bg-gradient-hero" />

    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender">
            <Plane className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-sm">{reservation.aviokompanija}</p>
            <p className="text-[11px] text-muted-foreground font-medium">Let {reservation.broj_leta}</p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`rounded-full text-[11px] font-semibold px-2.5 py-1 border capitalize ${statusStyles[reservation.status]}`}
        >
          {reservation.status}
        </Badge>
      </div>

      {/* Route */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <p className="font-display text-2xl font-bold text-foreground leading-none">{reservation.polaziste}</p>
          <p className="text-xs text-muted-foreground mt-1 font-medium">{reservation.vreme_polaska}</p>
        </div>
        <div className="flex items-center gap-1 px-2">
          <div className="w-4 h-px bg-border" />
          <Plane className="h-4 w-4 text-primary rotate-45" />
          <div className="w-4 h-px bg-border" />
        </div>
        <div className="flex-1 text-right">
          <p className="font-display text-2xl font-bold text-foreground leading-none">{reservation.odrediste}</p>
          <p className="text-xs text-muted-foreground mt-1 font-medium">{reservation.vreme_dolaska}</p>
        </div>
      </div>

      {/* Dashed separator (ticket cut) */}
      <div className="ticket-cut relative py-4">
        <div className="border-t-2 border-dashed border-border/60 w-full" />
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Datum</p>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">{reservation.datum}</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Putnik</p>
          <span className="text-sm font-semibold text-foreground">{reservation.putnik}</span>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Sedište</p>
          <span className="text-sm font-semibold text-foreground">{reservation.sediste}</span>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Klasa putovanja</p>
          <span className="text-sm font-semibold text-foreground">{reservation.klasa}</span>
        </div>
      </div>

      {/* Bottom: Price + QR */}
      <div className="flex items-end justify-between pt-4 border-t border-border/50">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Ukupno</p>
          <p className="font-display text-2xl font-bold text-foreground leading-none mt-1">
            {reservation.cena.toLocaleString("sr-RS")}
            <span className="text-xs font-medium text-muted-foreground ml-1">RSD</span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 bg-lavender/30 rounded-2xl p-3">
          <QrCode className="h-10 w-10 text-accent/50" />
          <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">Boarding</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const Reservations = () => {
  const hasReservations = mockReservations.length > 0;

  return (
    <div className="bg-gradient-sky min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-60 pointer-events-none" />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[600px] h-24 bg-background rounded-[50%] blur-sm" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary-foreground/10 mb-5 shadow-glow">
              <Cloud className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">
              Moje Rezervacije
            </h1>
            <p className="mt-3 text-primary-foreground/70 max-w-lg mx-auto text-lg leading-relaxed">
              Pregledajte i upravljajte vašim kartama
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10 -mt-6">
        {hasReservations ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tickets */}
            <div className="lg:col-span-2 space-y-6">
              {mockReservations.map((reservation, i) => (
                <TicketCard key={reservation.id} reservation={reservation} index={i} />
              ))}
            </div>

            {/* Sidebar: Preferences + Watchlist */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <UserPreferences />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <PriceWatchlist />
              </motion.div>
            </div>
          </div>
        ) : (
          <EmptyState type="reservations" />
        )}
      </div>
    </div>
  );
};

export default Reservations;
