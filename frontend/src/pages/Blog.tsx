import { Cloud, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  {
    title: "5 saveta za jeftinije letove ovog proleća",
    excerpt: "Otkrijte kako naš pametni algoritam pronalazi najniže cene i koji je najbolji trenutak za kupovinu karata.",
    date: "5. feb 2026",
    tag: "Saveti",
    tagColor: "bg-success/10 text-success",
  },
  {
    title: "CelesteAir Favorit — kako biramo najbolji let za vas",
    excerpt: "Naš sistem automatski analizira cenu, trajanje i status leta da vam preporuči savršen spoj.",
    date: "28. jan 2026",
    tag: "Tehnologija",
    tagColor: "bg-accent/10 text-accent",
  },
  {
    title: "Novi pravci: Istanbul i Rim od proleća!",
    excerpt: "Uzbudljive vesti — dodajemo nove direktne linije iz Beograda. Saznajte više o promocionim cenama.",
    date: "15. jan 2026",
    tag: "Vesti",
    tagColor: "bg-primary/10 text-primary",
  },
  {
    title: "Kako koristiti Zen režim za stres-free pretragu",
    excerpt: "Naša nova funkcija pojednostavljuje prikaz letova — savršeno za putnike koji vole minimalizm.",
    date: "8. jan 2026",
    tag: "Funkcije",
    tagColor: "bg-warning/10 text-warning",
  },
];

const Blog = () => (
  <div className="bg-gradient-sky min-h-screen">
    {/* Hero */}
    <div className="bg-gradient-hero py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-60 pointer-events-none" />
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[600px] h-24 bg-background rounded-[50%] blur-sm" />
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary-foreground/10 mb-5 shadow-glow">
            <Cloud className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">Blog</h1>
          <p className="mt-3 text-primary-foreground/70 max-w-lg mx-auto text-lg leading-relaxed">
            Saveti, vesti i inspiracija za vaša putovanja
          </p>
        </motion.div>
      </div>
    </div>

    <div className="container mx-auto px-4 lg:px-8 py-16 -mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {posts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="glass-card rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden group cursor-pointer"
          >
            <div className="h-1.5 bg-gradient-hero" />
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${post.tagColor}`}>
                  {post.tag}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
              </div>
              <h3 className="font-display font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-accent pt-1">
                Pročitaj više
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
