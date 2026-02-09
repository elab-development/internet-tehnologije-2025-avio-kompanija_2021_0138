import { motion } from "framer-motion";

const stories = [
  { city: "Pariz", emoji: "🗼", color: "from-blue-400 to-purple-500" },
  { city: "Rim", emoji: "🏛️", color: "from-amber-400 to-orange-500" },
  { city: "London", emoji: "🎡", color: "from-sky-400 to-blue-500" },
  { city: "Istanbul", emoji: "🕌", color: "from-rose-400 to-red-500" },
  { city: "Berlin", emoji: "🏰", color: "from-emerald-400 to-teal-500" },
  { city: "Barcelona", emoji: "⛪", color: "from-orange-400 to-red-500" },
  { city: "Beč", emoji: "🎼", color: "from-violet-400 to-purple-500" },
];

const DestinationStories = () => (
  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
    {stories.map((story, i) => (
      <motion.button
        key={story.city}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05, duration: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-2 shrink-0"
      >
        <div className={`h-16 w-16 md:h-[72px] md:w-[72px] rounded-full bg-gradient-to-br ${story.color} p-[3px] shadow-button`}>
          <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
            <span className="text-2xl">{story.emoji}</span>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-foreground">{story.city}</span>
      </motion.button>
    ))}
  </div>
);

export default DestinationStories;
