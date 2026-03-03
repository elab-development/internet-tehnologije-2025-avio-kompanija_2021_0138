import React, { useState, useEffect, useMemo } from "react";
import { Plane, Cloud, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import FlightCard, { type Flight } from "@/components/FlightCard";
import FlightFilters from "@/components/FlightFilters";
import SortDropdown, { type SortOption } from "@/components/SortDropdown";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

const Flights = () => {
  const [flights, setFlights] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [sortBy, setSortBy] = useState<SortOption>("pametni");
  const [zenMode, setZenMode] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/ponude/");        
        if (!response.ok) throw new Error("Greška pri učitavanju letova");
        const data = await response.json();

        const mapped = data.map((item: any) => {
          // Ispravna kalkulacija cene
          const cenaURsd = Math.round(parseFloat(item.cena) * 117.5) || 15000; // Stavi 15000 kao test
          console.log("DEBUG - Cena koju šaljem kartici:", cenaURsd); // <--- DODAJ OVO
          return {
            id: item.id,
            broj_leta: item.let?.relacija || "Let",
            aviokompanija: item.let?.aviokompanija || "Air Serbia",
            polaziste: item.let?.polaziste?.grad || "Beograd",
            odrediste: item.let?.odrediste?.grad || "Pariz",
            vreme_polaska: item.let?.vreme_polaska ? item.let.vreme_polaska.substring(11, 16) : "12:00",
            vreme_dolaska: "14:30",
            cena: cenaURsd,
            price: cenaURsd,
            iznos: cenaURsd,
            status: "na_vreme",
            trend_cene: "stabilna",
            najniza_cena: false,
          };
        });

        setFlights(mapped);
      } catch (err) {
        console.error("Greška:", err);
        setError("Nije moguće učitati podatke iz baze.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const airlines = useMemo(() => [...new Set(flights.map((f) => f.aviokompanija))], [flights]);
  const maxPrice = useMemo(() => Math.max(...flights.map((f) => f.cena), 0), [flights]);

  const filteredAndSorted = useMemo(() => {
    let result = [...flights].filter((f) => {
      const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(f.aviokompanija);
      const priceMatch = f.cena >= priceRange[0] && f.cena <= priceRange[1];
      return airlineMatch && priceMatch;
    });

    switch (sortBy) {
      case "najjeftinije": result.sort((a, b) => a.cena - b.cena); break;
      case "najskuplje": result.sort((a, b) => b.cena - a.cena); break;
      case "najranije": result.sort((a, b) => a.vreme_polaska.localeCompare(b.vreme_polaska)); break;
      case "najkasnije": result.sort((a, b) => b.vreme_polaska.localeCompare(a.vreme_polaska)); break;
      case "pametni": result.sort((a, b) => a.cena - b.cena); break;
    }
    return result;
  }, [flights, selectedAirlines, priceRange, sortBy]);

  return (
    <div className="bg-gradient-sky min-h-screen">
      <div className="bg-gradient-hero py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10 text-white">
          <Cloud className="h-10 w-10 mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold font-display">Pretražite letove</h1>
          <p className="mt-3 opacity-70 text-lg">Pronađite savršen let za vaše putovanje</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10 -mt-6">
        {!loading && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <FlightFilters
              airlines={airlines}
              selectedAirlines={selectedAirlines}
              onAirlinesChange={setSelectedAirlines}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice > 0 ? maxPrice : 100000}
            />
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setZenMode(!zenMode)} className="rounded-2xl border-white/20">
                {zenMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                Zen režim
              </Button>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-32"><Plane className="h-12 w-12 animate-bounce mx-auto text-primary" /></div>
        ) : filteredAndSorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((flight) => (
              <FlightCard key={flight.id} flight={flight} zenMode={zenMode} />
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