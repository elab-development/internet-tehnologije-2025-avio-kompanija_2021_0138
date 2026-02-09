import type { Flight } from "@/components/FlightCard";

const API_BASE = "http://127.0.0.1:8000/api";

export async function fetchFlights(): Promise<Flight[]> {
  const response = await fetch(`${API_BASE}/letovi-api/`);
  if (!response.ok) throw new Error("Greška pri učitavanju letova");
  const data = await response.json();
  return data.map((item: Record<string, unknown>) => ({
    id: item.id,
    broj_leta: item.broj_leta || "",
    aviokompanija: item.aviokompanija || "",
    polaziste: item.polaziste || "",
    odrediste: item.odrediste || "",
    vreme_polaska: item.vreme_polaska || "",
    vreme_dolaska: item.vreme_dolaska || "",
    cena: item.cena || 0,
    status: item.status || "na_vreme",
    trend_cene: item.trend_cene || "stabilna",
    najniza_cena: item.najniza_cena || false,
  }));
}
