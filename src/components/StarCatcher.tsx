import { motion, AnimatePresence } from "motion/react";
import { Star, Trophy } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface FallingStar {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function StarCatcher() {
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState<FallingStar[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const spawnStar = useCallback(() => {
    const newStar: FallingStar = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // 10% to 90%
      y: -10,
      size: Math.random() * 20 + 30,
      color: ["text-yellow-400", "text-pink-400", "text-blue-400", "text-purple-400"][Math.floor(Math.random() * 4)],
    };
    setStars((prev) => [...prev, newStar]);
  }, []);

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      spawnStar();
    }, 1000);

    return () => clearInterval(interval);
  }, [gameActive, spawnStar]);

  const catchStar = (id: number) => {
    setScore((prev) => prev + 1);
    setStars((prev) => prev.filter((s) => s.id !== id));
  };

  const startGame = () => {
    setScore(0);
    setStars([]);
    setGameActive(true);
    setTimeout(() => {
      setGameActive(false);
      setHighScore((prev) => Math.max(prev, score));
    }, 30000); // 30 seconds game
  };

  return (
    <div className="relative h-full w-full bg-indigo-900 rounded-3xl overflow-hidden shadow-inner flex flex-col items-center justify-center">
      {/* Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute star-animation text-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Star size={Math.random() * 10 + 5} fill="currentColor" />
          </div>
        ))}
      </div>

      {!gameActive ? (
        <div className="z-10 text-center space-y-6 bg-white/10 backdrop-blur-md p-12 rounded-3xl border-2 border-white/20">
          <Trophy size={80} className="mx-auto text-yellow-400" />
          <h2 className="text-4xl font-bold text-white">لعبة صيد النجوم</h2>
          <p className="text-xl text-indigo-200">أعلى نتيجة: {highScore}</p>
          <button
            onClick={startGame}
            className="px-12 py-6 bg-yellow-400 text-indigo-900 rounded-full font-bold text-2xl shadow-xl hover:bg-yellow-300 transition-all transform active:scale-95"
          >
            ابدئي اللعب!
          </button>
        </div>
      ) : (
        <>
          <div className="absolute top-8 left-8 text-white text-3xl font-bold z-20">
            النتيجة: {score}
          </div>
          
          <AnimatePresence>
            {stars.map((star) => (
              <motion.div
                key={star.id}
                initial={{ y: -50, x: `${star.x}%`, opacity: 0 }}
                animate={{ y: "110vh", opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 4, ease: "linear" }}
                onAnimationComplete={() => {
                  setStars((prev) => prev.filter((s) => s.id !== star.id));
                }}
                className={`absolute cursor-pointer z-20 ${star.color} hover:scale-125 transition-transform`}
                onClick={() => catchStar(star.id)}
              >
                <Star size={star.size} fill="currentColor" />
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
