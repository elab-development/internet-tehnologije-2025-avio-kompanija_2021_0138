import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface FlightFiltersProps {
  airlines: string[];
  selectedAirlines: string[];
  onAirlinesChange: (airlines: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
}

const FlightFilters = ({
  airlines,
  selectedAirlines,
  onAirlinesChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
}: FlightFiltersProps) => {
  const [open, setOpen] = useState(false);

  const toggleAirline = (airline: string) => {
    if (selectedAirlines.includes(airline)) {
      onAirlinesChange(selectedAirlines.filter((a) => a !== airline));
    } else {
      onAirlinesChange([...selectedAirlines, airline]);
    }
  };

  const clearFilters = () => {
    onAirlinesChange([]);
    onPriceRangeChange([0, maxPrice]);
  };

  const hasFilters = selectedAirlines.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <div className="mb-8">
      {/* Toggle button */}
      <div className="flex items-center gap-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            onClick={() => setOpen(!open)}
            className="rounded-2xl gap-2.5 glass-card border-border font-medium"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filteri
            {hasFilters && (
              <Badge className="bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 py-0 min-w-[18px] h-[18px] flex items-center justify-center">
                {selectedAirlines.length + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </motion.div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground rounded-xl gap-1.5 text-xs font-medium"
          >
            <X className="h-3 w-3" />
            Obriši filtere
          </Button>
        )}
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="glass-strong rounded-3xl p-6 mt-4 space-y-6">
              {/* Price range */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">
                  Raspon cene (RSD)
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="Od"
                    value={priceRange[0] || ""}
                    onChange={(e) =>
                      onPriceRangeChange([Number(e.target.value) || 0, priceRange[1]])
                    }
                    className="h-11 bg-lavender/40 border-0 rounded-xl font-medium"
                  />
                  <span className="text-muted-foreground text-sm">—</span>
                  <Input
                    type="number"
                    placeholder="Do"
                    value={priceRange[1] === maxPrice ? "" : priceRange[1]}
                    onChange={(e) =>
                      onPriceRangeChange([priceRange[0], Number(e.target.value) || maxPrice])
                    }
                    className="h-11 bg-lavender/40 border-0 rounded-xl font-medium"
                  />
                </div>
              </div>

              {/* Airlines */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">
                  Avio-kompanija
                </Label>
                <div className="flex flex-wrap gap-2">
                  {airlines.map((airline) => {
                    const selected = selectedAirlines.includes(airline);
                    return (
                      <motion.button
                        key={airline}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleAirline(airline)}
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                          selected
                            ? "bg-primary text-primary-foreground border-primary shadow-button"
                            : "bg-lavender/40 text-foreground border-border hover:bg-lavender/70"
                        }`}
                      >
                        {airline}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlightFilters;
