import { Bell, TrendingDown, TrendingUp, Minus, Sparkles, Plane } from "lucide-react";
import { motion } from "framer-motion";

interface WatchedFlight {
  id: number;
  route: string;
  currentPrice: number;
  previousPrice: number;
  trend: "raste" | "pada" | "stabilna";
}

const watchedFlights: WatchedFlight[] = [
  { id: 1, route: "Beograd → Pariz", currentPrice: 19800, previousPrice: 23000, trend: "pada" },
  { id: 2, route: "Beograd → London", currentPrice: 24500, previousPrice: 22000, trend: "raste" },
  { id: 3, route: "Beograd → Istanbul", currentPrice: 12900, previousPrice: 12900, trend: "stabilna" },
];

const trendIcons = {
  raste: { icon: TrendingUp, color: "text-destructive", bg: "bg-destructive/8" },
  pada: { icon: TrendingDown, color: "text-success", bg: "bg-success/8" },
  stabilna: { icon: Minus, color: "text-muted-foreground", bg: "bg-muted/40" },
};

const PriceWatchlist = () => (
  <div className="glass-card rounded-3xl shadow-card p-6 space-y-4">
    <div className="flex items-center gap-2">
      <Bell className="h-4 w-4 text-accent" />
      <h3 className="font-display font-bold text-foreground text-sm">Pratim cene</h3>
    </div>

    <div className="space-y-3">
      {watchedFlights.map((flight, i) => {
        const trend = trendIcons[flight.trend];
        const TrendIcon = trend.icon;
        const priceDiff = flight.currentPrice - flight.previousPrice;
        const pctChange = Math.abs(Math.round((priceDiff / flight.previousPrice) * 100));

        return (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors group"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${trend.bg} shrink-0`}>
              <Plane className={`h-4 w-4 ${trend.color}`} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{flight.route}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <TrendIcon className={`h-3 w-3 ${trend.color}`} />
                <span className={`text-[11px] font-medium ${trend.color}`}>
                  {flight.trend === "pada" ? "−" : flight.trend === "raste" ? "+" : ""}{pctChange}%
                </span>
              </div>
            </div>

            {/* Mini sparkline visualization */}
            <div className="flex items-end gap-px h-6">
              {[0.4, 0.6, 0.8, 0.5, 0.7, 0.3, flight.trend === "pada" ? 0.25 : flight.trend === "raste" ? 0.9 : 0.5].map((h, j) => (
                <motion.div
                  key={j}
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 100}%` }}
                  transition={{ delay: i * 0.1 + j * 0.04 }}
                  className={`w-1 rounded-full ${j === 6 ? trend.color.replace("text-", "bg-") : "bg-muted"}`}
                />
              ))}
            </div>

            <p className="font-display text-sm font-bold text-foreground shrink-0">
              {flight.currentPrice.toLocaleString("sr-RS")}
              <span className="text-[10px] font-medium text-muted-foreground ml-0.5">RSD</span>
            </p>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default PriceWatchlist;
