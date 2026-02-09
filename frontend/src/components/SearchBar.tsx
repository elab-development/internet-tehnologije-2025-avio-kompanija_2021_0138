import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Calendar, Users, Crown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const klaseOptions = [
  { value: "ekonomska", label: "Ekonomska", icon: "✈️" },
  { value: "biznis", label: "Biznis", icon: "👔" },
  { value: "prva", label: "Prva klasa", icon: "👑" },
];

const putniciOptions = [1, 2, 3, 4, 5, 6];

interface DropdownProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dropdown = ({ open, onClose, children }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border rounded-2xl shadow-card-hover p-2 animate-fade-in">
      {children}
    </div>
  );
};

const SearchBar = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [klasa, setKlasa] = useState("ekonomska");
  const [putnici, setPutnici] = useState(1);
  const [klasaOpen, setKlasaOpen] = useState(false);
  const [putniciOpen, setPutniciOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Pretraga:", { from, to, date, klasa, putnici });
  };

  const selectedKlasa = klaseOptions.find((k) => k.value === klasa)!;

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="glass-strong rounded-3xl shadow-card-hover p-5 md:p-6"
    >
      {/* Row 1: From, To, Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Odakle"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="pl-10 h-12 bg-lavender/40 border-0 font-medium rounded-2xl focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Kuda"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="pl-10 h-12 bg-lavender/40 border-0 font-medium rounded-2xl focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-10 h-12 bg-lavender/40 border-0 font-medium rounded-2xl focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Row 2: Class, Passengers, Submit */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Klasa dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setKlasaOpen(!klasaOpen); setPutniciOpen(false); }}
            className="flex items-center gap-2 w-full h-12 px-4 bg-lavender/40 rounded-2xl text-sm font-medium text-foreground hover:bg-lavender/60 transition-colors"
          >
            <Crown className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-left">{selectedKlasa.icon} {selectedKlasa.label}</span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${klasaOpen ? "rotate-180" : ""}`} />
          </button>
          <Dropdown open={klasaOpen} onClose={() => setKlasaOpen(false)}>
            {klaseOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => { setKlasa(option.value); setKlasaOpen(false); }}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  klasa === option.value
                    ? "bg-secondary text-secondary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </Dropdown>
        </div>

        {/* Putnici dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setPutniciOpen(!putniciOpen); setKlasaOpen(false); }}
            className="flex items-center gap-2 w-full h-12 px-4 bg-lavender/40 rounded-2xl text-sm font-medium text-foreground hover:bg-lavender/60 transition-colors"
          >
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-left">{putnici} {putnici === 1 ? "putnik" : putnici < 5 ? "putnika" : "putnika"}</span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${putniciOpen ? "rotate-180" : ""}`} />
          </button>
          <Dropdown open={putniciOpen} onClose={() => setPutniciOpen(false)}>
            {putniciOptions.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => { setPutnici(num); setPutniciOpen(false); }}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  putnici === num
                    ? "bg-secondary text-secondary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{num} {num === 1 ? "putnik" : num < 5 ? "putnika" : "putnika"}</span>
              </button>
            ))}
          </Dropdown>
        </div>

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-hero text-primary-foreground hover:opacity-90 font-semibold text-base gap-2 rounded-2xl shadow-button transition-all duration-300"
          >
            <Search className="h-4 w-4" />
            Pretražite letove
          </Button>
        </motion.div>
      </div>
    </motion.form>
  );
};

export default SearchBar;
