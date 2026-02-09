import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, MapPin, CreditCard, CheckCircle2, QrCode, Clock, Shield, Lock } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import type { Flight } from "./FlightCard";

interface BookingModalProps {
  flight: Flight;
  open: boolean;
  onClose: () => void;
}

type Step = "details" | "payment" | "success";

const BookingModal = ({ flight, open, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<Step>("details");
  const [agreed, setAgreed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const { toast } = useToast();

  // ACID countdown timer
  useEffect(() => {
    if (!open || step === "success") return;
    setTimeLeft(300);
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          toast({
            title: "⏰ Vreme je isteklo",
            description: "Rezervisana cena je istekla. Molimo pokušajte ponovo.",
            variant: "destructive",
          });
          handleClose();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open, step]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const baseCena = Math.round(flight.cena * 0.82);
  const taxCena = flight.cena - baseCena;

  const handleConfirm = () => {
    if (!agreed) {
      toast({ title: "Molimo prihvatite uslove korišćenja", variant: "destructive" });
      return;
    }
    setStep("payment");
  };

  const handlePayment = () => {
    setStep("success");
    toast({
      title: "✅ Rezervacija uspešna!",
      description: `Vaša karta za let ${flight.polaziste} → ${flight.odrediste} je potvrđena.`,
    });
  };

  const handleClose = useCallback(() => {
    setStep("details");
    setAgreed(false);
    onClose();
  }, [onClose]);

  const timerWarning = timeLeft < 60;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card rounded-3xl border-border max-w-md p-0 overflow-hidden shadow-card-hover">
        {/* Header */}
        <div className="bg-gradient-hero p-6 pb-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="font-display text-xl font-bold text-primary-foreground">
              {step === "payment" ? "Plaćanje" : step === "success" ? "Potvrda" : "Potvrda rezervacije"}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/70 text-sm">
              {step === "payment"
                ? "Unesite podatke za plaćanje"
                : step === "success"
                ? "Vaša rezervacija je potvrđena"
                : "Pregledajte detalje vašeg leta"}
            </DialogDescription>
          </DialogHeader>

          {/* Countdown timer - cute pill */}
          {step !== "success" && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-semibold backdrop-blur-sm ${
                timerWarning
                  ? "bg-destructive/20 text-primary-foreground border border-destructive/30"
                  : "bg-primary-foreground/10 text-primary-foreground/90 border border-primary-foreground/15"
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Clock className={`h-4 w-4 ${timerWarning ? "text-destructive-foreground" : ""}`} />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider opacity-70 leading-none">
                  Čuvamo tvoju cenu
                </span>
                <span className="font-display text-base font-bold leading-tight tracking-wider">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-6 space-y-5 -mt-3">
          <AnimatePresence mode="wait">
            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* Airline */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lavender">
                    <Plane className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{flight.aviokompanija}</p>
                    <p className="text-xs text-muted-foreground">
                      {flight.broj_leta ? `Let ${flight.broj_leta} · ` : ""}Direktan let
                    </p>
                  </div>
                </div>

                {/* Route */}
                <div className="bg-lavender/25 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">Polazište</p>
                      <p className="font-semibold text-foreground">{flight.polaziste}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{flight.vreme_polaska}</p>
                  </div>
                  <div className="ml-2 border-l-2 border-dashed border-primary/20 h-5" />
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-accent shrink-0" />
                    <div className="flex-1">
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">Odredište</p>
                      <p className="font-semibold text-foreground">{flight.odrediste}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{flight.vreme_dolaska || "—"}</p>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="bg-muted/40 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Osnovna cena</span>
                    <span className="font-medium text-foreground">{baseCena.toLocaleString("sr-RS")} RSD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Takse i naknade</span>
                    <span className="font-medium text-foreground">{taxCena.toLocaleString("sr-RS")} RSD</span>
                  </div>
                  <div className="border-t border-border/50 pt-2 flex justify-between">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      Ukupno
                    </span>
                    <p className="font-display text-xl font-bold text-foreground">
                      {flight.cena.toLocaleString("sr-RS")} RSD
                    </p>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                      agreed
                        ? "bg-accent border-accent"
                        : "border-border group-hover:border-accent/50"
                    }`}
                    onClick={() => setAgreed(!agreed)}
                  >
                    {agreed && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-foreground" />
                      </motion.div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    Prihvatam{" "}
                    <a href="#" className="text-accent font-medium hover:underline">
                      Uslove korišćenja
                    </a>{" "}
                    i{" "}
                    <a href="#" className="text-accent font-medium hover:underline">
                      Politiku privatnosti
                    </a>{" "}
                    kompanije CelesteAir.
                  </span>
                </label>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleConfirm}
                    className={`w-full h-12 font-semibold text-base rounded-2xl shadow-button transition-all duration-300 ${
                      agreed
                        ? "bg-gradient-hero text-primary-foreground hover:opacity-90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    Nastavi na plaćanje
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* Security badge */}
                <div className="flex items-center gap-2 bg-success/8 border border-success/15 rounded-2xl px-3 py-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-xs font-medium text-success">Sigurno SSL enkripcija plaćanja</span>
                </div>

                {/* Card inputs */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Broj kartice</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      className="h-11 bg-lavender/30 border-0 rounded-xl font-medium tracking-wider"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-foreground">Datum isteka</Label>
                      <Input
                        placeholder="MM/GG"
                        className="h-11 bg-lavender/30 border-0 rounded-xl font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-foreground">CVV</Label>
                      <Input
                        type="password"
                        placeholder="•••"
                        className="h-11 bg-lavender/30 border-0 rounded-xl font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Ime na kartici</Label>
                    <Input
                      placeholder="IME PREZIME"
                      className="h-11 bg-lavender/30 border-0 rounded-xl font-medium uppercase"
                    />
                  </div>
                </div>

                {/* Payment method badges */}
                <div className="flex items-center justify-center gap-3 py-3">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-lavender/30 border border-accent/10 cursor-pointer hover:border-accent/25 transition-all"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-accent/10">
                      <CreditCard className="h-4 w-4 text-accent" />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-bold text-foreground leading-none">Visa / Master</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Kreditna kartica</p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-lavender/30 border border-accent/10 cursor-pointer hover:border-accent/25 transition-all"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10">
                      <span className="text-sm font-bold text-primary">P</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-bold text-foreground leading-none">PayPal</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Siguran transfer</p>
                    </div>
                  </motion.div>
                </div>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Lock className="h-3 w-3" /> PCI DSS
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" /> 256-bit SSL
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span>3D Secure</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between bg-muted/40 rounded-2xl p-4">
                  <span className="font-medium text-foreground text-sm">Ukupno za plaćanje</span>
                  <p className="font-display text-xl font-bold text-foreground">
                    {flight.cena.toLocaleString("sr-RS")} RSD
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep("details")}
                    className="flex-1 rounded-2xl h-12"
                  >
                    Nazad
                  </Button>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex-[2]">
                    <Button
                      onClick={handlePayment}
                      className="w-full h-12 bg-gradient-hero text-primary-foreground hover:opacity-90 font-semibold text-base rounded-2xl shadow-button"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Plati {flight.cena.toLocaleString("sr-RS")} RSD
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="flex items-center justify-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-success mx-auto" />
                </motion.div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Rezervacija uspešna!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2 leading-relaxed">
                    Vaša karta za let {flight.polaziste} → {flight.odrediste} je potvrđena.
                  </p>
                </div>

                <div className="inline-flex flex-col items-center gap-2 bg-lavender/30 rounded-2xl p-4">
                  <QrCode className="h-12 w-12 text-accent/60" />
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    Boarding pass
                  </span>
                </div>

                <Button onClick={handleClose} variant="outline" className="rounded-2xl mt-2">
                  Zatvori
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
