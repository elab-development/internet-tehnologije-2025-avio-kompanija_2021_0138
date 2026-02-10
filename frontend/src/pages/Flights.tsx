import { useState, useEffect, useMemo } from "react";
import { Plane, Cloud, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import FlightCard, { type Flight } from "@/components/FlightCard";
import FlightFilters from "@/components/FlightFilters";
import SortDropdown, { type SortOption } from "@/components/SortDropdown";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

const mockFlights: Flight[] = [];

const Flights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<SortOption>("pametni");
  const [zenMode, setZenMode] = useState(false);
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/letovi/");       
        if (!response.ok) throw new Error("Greška pri učitavanju letova");
        const data = await response.json();
       const mapped: Flight[] = data.map((item: any) => ({
  id: item.id,
  // Broj leta verovatno treba da bude 'relacija' ili neki drugi podatak iz baze
  broj_leta: item.relacija || "Nepoznato", 
  aviokompanija: item.aviokompanija || "Air Serbia",
  
  // Ovde pristupamo gradu unutar objekata polaziste i odrediste
  polaziste: item.polaziste?.grad || "Beograd", 
  odrediste: item.odrediste?.grad || "Pariz",
  
  // Vreme polaska iz baze (možda ćeš morati da ga skratiš jer je u ISO formatu)
  vreme_polaska: item.vreme_polaska ? item.vreme_polaska.substring(11, 16) : "--:--",
  vreme_dolaska: "--:--", // Dodaj ako Ognjen doda ovo polje u bazu
  
  cena: item.cena || 0,
  status: "na_vreme",
  trend_cene: "stabilna",
  najniza_cena: false,
}));
        setFlights(mapped);
      } catch (err) {
        console.error("Greška:", err);
        setError("Nije moguće učitati letove iz baze.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const airlines = useMemo(() => [...new Set(flights.map((f) => f.aviokompanija))], [flights]);
  const maxPrice = useMemo(() => Math.max(...flights.map((f) => f.cena), 0), [flights]);

  // Calculate CelesteAir Favorit — best balance of low price + short travel time
  const favoritId = useMemo(() => {
    const eligible = flights.filter((f) => f.status !== "otkazan" && f.vreme_dolaska);
    if (eligible.length === 0) return null;
    const minPrice = Math.min(...eligible.map((f) => f.cena));
    const maxPriceVal = Math.max(...eligible.map((f) => f.cena));
    const scored = eligible.map((f) => {
      const priceScore = maxPriceVal > minPrice ? (f.cena - minPrice) / (maxPriceVal - minPrice) : 0;
      // Simple duration heuristic from departure/arrival times
      const dep = f.vreme_polaska.split(":").map(Number);
      const arr = (f.vreme_dolaska || "").split(":").map(Number);
      const duration = ((arr[0] || 0) * 60 + (arr[1] || 0)) - (dep[0] * 60 + dep[1]);
      const maxDur = 300;
      const durationScore = Math.max(0, Math.min(1, duration / maxDur));
      return { id: f.id, score: priceScore * 0.6 + durationScore * 0.4 };
    });
    scored.sort((a, b) => a.score - b.score);
    return scored[0]?.id ?? null;
  }, [flights]);

  // Smart tags per flight
  const getSmartTags = useMemo(() => {
    const cheapest = flights.filter((f) => f.status !== "otkazan").sort((a, b) => a.cena - b.cena)[0];
    const earliest = flights.filter((f) => f.status !== "otkazan").sort((a, b) => a.vreme_polaska.localeCompare(b.vreme_polaska))[0];

    return (flight: Flight) => {
      const tags: { label: string; emoji: string }[] = [];
      if (cheapest && flight.id === cheapest.id) tags.push({ label: "Najpovoljnije", emoji: "💰" });
      if (earliest && flight.id === earliest.id) tags.push({ label: "Najbrži dolazak", emoji: "⚡" });
      if (flight.aviokompanija === "CelesteAir") tags.push({ label: "Najbolja kafa", emoji: "☕" });
      if (flight.cena < 15000) tags.push({ label: "Ekološki", emoji: "🌿" });
      return tags;
    };
  }, [flights]);

  const filteredAndSorted = useMemo(() => {
    let result = flights.filter((f) => {
      const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(f.aviokompanija);
      const priceMatch = f.cena >= priceRange[0] && f.cena <= priceRange[1];
      return airlineMatch && priceMatch;
    });

    switch (sortBy) {
      case "najjeftinije":
        result = [...result].sort((a, b) => a.cena - b.cena);
        break;
      case "najskuplje":
        result = [...result].sort((a, b) => b.cena - a.cena);
        break;
      case "najranije":
        result = [...result].sort((a, b) => a.vreme_polaska.localeCompare(b.vreme_polaska));
        break;
      case "najkasnije":
        result = [...result].sort((a, b) => b.vreme_polaska.localeCompare(a.vreme_polaska));
        break;
      case "pametni":
        result = [...result].sort((a, b) => {
          const scoreA = (a.status === "na_vreme" ? 0 : 100) + a.cena / 100 + (a.trend_cene === "pada" ? -50 : 0);
          const scoreB = (b.status === "na_vreme" ? 0 : 100) + b.cena / 100 + (b.trend_cene === "pada" ? -50 : 0);
          return scoreA - scoreB;
        });
        break;
    }
    return result;
  }, [flights, selectedAirlines, priceRange, sortBy]);

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
              Pretražite letove
            </h1>
            <p className="mt-3 text-primary-foreground/70 max-w-lg mx-auto text-lg leading-relaxed">
              Pronađite savršen let za vaše sledeće putovanje
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10 -mt-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl bg-lavender/50 border border-lavender px-4 py-3 text-sm text-foreground glass"
          >
            ℹ️ {error}
          </motion.div>
        )}

        {!loading && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <FlightFilters
              airlines={airlines}
              selectedAirlines={selectedAirlines}
              onAirlinesChange={setSelectedAirlines}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
            />
            <div className="flex items-center gap-3">
              {/* Zen Mode Toggle */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant={zenMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setZenMode(!zenMode)}
                  className={`rounded-2xl gap-2 text-xs font-semibold transition-all duration-300 ${
                    zenMode
                      ? "bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-button"
                      : "border-accent/20 hover:border-accent/40"
                  }`}
                >
                  {zenMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  Zen režim
                </Button>
              </motion.div>
              <SortDropdown value={sortBy} onChange={setSortBy} />
              <span className="text-xs text-muted-foreground font-medium">
                {filteredAndSorted.length} {filteredAndSorted.length === 1 ? "let" : "letova"}
              </span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-5">
            {/* Cute animated paper plane */}
            <div className="relative">
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-lavender/50 shadow-card">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], x: [0, 4, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Plane className="h-9 w-9 text-accent rotate-45" />
                  </motion.div>
                </div>
              </motion.div>
              {/* Trail dots */}
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                <span className="w-1 h-1 rounded-full bg-accent/20" />
                <span className="w-0.5 h-0.5 rounded-full bg-accent/10" />
              </motion.div>
            </div>
            <div className="text-center">
              <p className="font-display font-semibold text-foreground">Tražimo letove za vas...</p>
              <p className="text-sm text-muted-foreground mt-1">Samo trenutak ✨</p>
            </div>
          </div>
        ) : filteredAndSorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((flight, i) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <FlightCard
                  flight={flight}
                  zenMode={zenMode}
                  isFavorit={flight.id === favoritId}
                  smartTags={getSmartTags(flight)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState type="flights" />
        )}
      </div>
    </div>
  );
};

export default Flights;
