import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Star, Palette, Home, Sparkles } from "lucide-react";
import Pet from "./components/Pet";
import StarCatcher from "./components/StarCatcher";
import DrawingBoard from "./components/DrawingBoard";

type Tab = "home" | "pet" | "game" | "draw";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-12 p-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 text-yellow-400 star-animation">
                <Star size={48} fill="currentColor" />
              </div>
              <div className="absolute -bottom-10 -right-10 text-pink-400 star-animation">
                <Heart size={48} fill="currentColor" />
              </div>
              <div className="w-64 h-64 bg-white rounded-full shadow-2xl flex items-center justify-center border-8 border-pink-200">
                <Sparkles size={120} className="text-pink-500" />
              </div>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-pink-600 drop-shadow-lg">عالم طفلتي السحري</h1>
              <p className="text-2xl text-pink-400 font-medium">مرحباً بكِ في عالمكِ الخاص المليء بالمرح!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
              <button
                onClick={() => setActiveTab("pet")}
                className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-pink-100 group"
              >
                <Heart size={48} className="mx-auto text-pink-500 group-hover:scale-125 transition-transform" />
                <span className="block mt-4 text-xl font-bold text-pink-600">صديقي الأليف</span>
              </button>
              <button
                onClick={() => setActiveTab("game")}
                className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-yellow-100 group"
              >
                <Star size={48} className="mx-auto text-yellow-500 group-hover:scale-125 transition-transform" />
                <span className="block mt-4 text-xl font-bold text-yellow-600">صيد النجوم</span>
              </button>
              <button
                onClick={() => setActiveTab("draw")}
                className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-blue-100 group"
              >
                <Palette size={48} className="mx-auto text-blue-500 group-hover:scale-125 transition-transform" />
                <span className="block mt-4 text-xl font-bold text-blue-600">مرسمي الصغير</span>
              </button>
            </div>
          </motion.div>
        );
      case "pet":
        return <Pet />;
      case "game":
        return <StarCatcher />;
      case "draw":
        return <DrawingBoard />;
    }
  };

  return (
    <div 
      className="h-screen w-screen flex flex-col bg-pink-50 overflow-hidden font-sans relative" 
      dir="rtl"
    >
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url("https://picsum.photos/seed/castle/1080/1920")' }}
      />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute star-animation"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              color: i % 2 === 0 ? "#ec4899" : "#f59e0b",
            }}
          >
            <Star size={Math.random() * 40 + 20} fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Header */}
      {activeTab !== "home" && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="p-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b-2 border-pink-100 z-50"
        >
          <button
            onClick={() => setActiveTab("home")}
            className="p-3 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
          >
            <Home size={28} />
          </button>
          <h2 className="text-2xl font-bold text-pink-600">
            {activeTab === "pet" && "صديقي الأليف"}
            {activeTab === "game" && "صيد النجوم"}
            {activeTab === "draw" && "مرسمي الصغير"}
          </h2>
          <div className="w-12" /> {/* Spacer */}
        </motion.header>
      )}

      {/* Main Content */}
      <main className="flex-1 relative p-4 md:p-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full max-w-5xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      {activeTab !== "home" && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="p-4 bg-white/80 backdrop-blur-md border-t-2 border-pink-100 flex justify-around items-center z-50"
        >
          <NavButton
            active={activeTab === "pet"}
            onClick={() => setActiveTab("pet")}
            icon={<Heart />}
            label="الأليف"
            color="pink"
          />
          <NavButton
            active={activeTab === "game"}
            onClick={() => setActiveTab("game")}
            icon={<Star />}
            label="اللعبة"
            color="yellow"
          />
          <NavButton
            active={activeTab === "draw"}
            onClick={() => setActiveTab("draw")}
            icon={<Palette />}
            label="الرسم"
            color="blue"
          />
        </motion.nav>
      )}
    </div>
  );
}

function NavButton({
  active,
  onClick,
  icon,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: "pink" | "yellow" | "blue";
}) {
  const colors = {
    pink: "text-pink-500 bg-pink-50",
    yellow: "text-yellow-500 bg-yellow-50",
    blue: "text-blue-500 bg-blue-50",
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-2xl transition-all ${
        active ? colors[color] + " scale-110" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      <div className="p-1">{icon}</div>
      <span className="text-xs font-bold mt-1">{label}</span>
    </button>
  );
}
