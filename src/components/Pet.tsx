import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Apple, Cookie, Music, Volume2, Pizza } from "lucide-react";

type ReactionType = "happy" | "eating" | "dancing" | "surprised" | "none";

export default function Pet() {
  const [reaction, setReaction] = useState<ReactionType>("none");
  const [foodItem, setFoodItem] = useState<React.ReactNode | null>(null);

  const triggerReaction = (type: ReactionType, duration = 2000) => {
    setReaction(type);
    setTimeout(() => setReaction("none"), duration);
  };

  const handlePet = () => triggerReaction("happy");

  const handleFeed = (food: "apple" | "cookie" | "pizza") => {
    const icons = {
      apple: <Apple className="text-red-500" size={40} />,
      cookie: <Cookie className="text-amber-700" size={40} />,
      pizza: <Pizza className="text-yellow-600" size={40} />,
    };
    setFoodItem(icons[food]);
    triggerReaction("eating");
  };

  const handleMusic = () => triggerReaction("dancing", 3000);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
      <div className="relative">
        <AnimatePresence>
          {reaction === "happy" && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -80, scale: 1.2 }}
              exit={{ opacity: 0 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 text-red-500"
            >
              <Heart fill="currentColor" size={50} />
            </motion.div>
          )}

          {reaction === "eating" && (
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: -45 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -right-20 top-1/2 -translate-y-1/2"
            >
              <div className="bg-white p-3 rounded-full shadow-lg border-4 border-yellow-200">
                {foodItem}
              </div>
            </motion.div>
          )}

          {reaction === "dancing" && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-20 -left-10 text-purple-500"
            >
              <Music size={40} className="animate-bounce" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{
            y: reaction === "dancing" ? [0, -40, 0, -40, 0] : [0, -20, 0],
            scale: reaction === "eating" ? [1, 1.1, 1, 1.1, 1] : 1,
            rotate: reaction === "dancing" ? [0, 15, -15, 15, -15, 0] : (reaction === "happy" ? [0, 10, -10, 0] : 0),
            backgroundColor: reaction === "dancing" ? ["#f9a8d4", "#c084fc", "#f9a8d4"] : "#f9a8d4",
          }}
          transition={{
            y: { duration: reaction === "dancing" ? 0.5 : 2, repeat: reaction === "dancing" ? 5 : Infinity, ease: "easeInOut" },
            scale: { duration: 0.4, repeat: reaction === "eating" ? 4 : 0 },
            rotate: { duration: 0.5 },
            backgroundColor: { duration: 1, repeat: reaction === "dancing" ? 2 : 0 }
          }}
          className="w-64 h-64 rounded-full border-8 border-pink-400 flex items-center justify-center relative shadow-2xl cursor-pointer"
          onClick={handlePet}
        >
          {/* Eyes */}
          <div className="flex space-x-8">
            <motion.div 
              animate={{ 
                scaleY: reaction === "eating" ? 0.2 : (reaction === "dancing" ? [1, 0.5, 1] : [1, 0.1, 1]),
                height: reaction === "happy" ? "4px" : "32px"
              }}
              transition={{ duration: 0.2, repeat: reaction === "dancing" ? Infinity : 0 }}
              className="w-6 bg-gray-800 rounded-full" 
            />
            <motion.div 
              animate={{ 
                scaleY: reaction === "eating" ? 0.2 : (reaction === "dancing" ? [1, 0.5, 1] : [1, 0.1, 1]),
                height: reaction === "happy" ? "4px" : "32px"
              }}
              transition={{ duration: 0.2, repeat: reaction === "dancing" ? Infinity : 0 }}
              className="w-6 bg-gray-800 rounded-full" 
            />
          </div>
          
          {/* Mouth */}
          <motion.div 
            animate={{ 
              height: reaction === "eating" ? "20px" : "8px",
              width: reaction === "dancing" ? "40px" : "48px",
              borderRadius: reaction === "eating" ? "50%" : "0 0 50% 50%"
            }}
            className="absolute bottom-16 border-b-4 border-gray-800" 
          />
          
          {/* Cheeks */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-6">
            <motion.div 
              animate={{ scale: reaction === "happy" ? 1.5 : 1 }}
              className="w-8 h-8 bg-pink-400/50 rounded-full blur-sm" 
            />
            <motion.div 
              animate={{ scale: reaction === "happy" ? 1.5 : 1 }}
              className="w-8 h-8 bg-pink-400/50 rounded-full blur-sm" 
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg">
        <button
          onClick={handlePet}
          className="flex flex-col items-center p-4 bg-pink-500 text-white rounded-3xl font-bold shadow-lg hover:bg-pink-600 transition-all transform active:scale-95"
        >
          <Heart fill="currentColor" className="mb-2" />
          <span>مداعبة</span>
        </button>
        
        <div className="relative group">
          <button
            className="w-full flex flex-col items-center p-4 bg-yellow-400 text-white rounded-3xl font-bold shadow-lg group-hover:bg-yellow-500 transition-all"
          >
            <Sparkles className="mb-2" />
            <span>إطعام</span>
          </button>
          
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-col space-y-2 bg-white p-2 rounded-2xl shadow-xl border-2 border-yellow-100 z-20">
            <button onClick={() => handleFeed("apple")} className="p-2 hover:bg-pink-50 rounded-xl transition-colors"><Apple className="text-red-500" /></button>
            <button onClick={() => handleFeed("cookie")} className="p-2 hover:bg-pink-50 rounded-xl transition-colors"><Cookie className="text-amber-700" /></button>
            <button onClick={() => handleFeed("pizza")} className="p-2 hover:bg-pink-50 rounded-xl transition-colors"><Pizza className="text-yellow-600" /></button>
          </div>
        </div>

        <button
          onClick={handleMusic}
          className="flex flex-col items-center p-4 bg-purple-500 text-white rounded-3xl font-bold shadow-lg hover:bg-purple-600 transition-all transform active:scale-95"
        >
          <Music className="mb-2" />
          <span>موسيقى</span>
        </button>

        <button
          onClick={() => triggerReaction("surprised")}
          className="flex flex-col items-center p-4 bg-blue-400 text-white rounded-3xl font-bold shadow-lg hover:bg-blue-500 transition-all transform active:scale-95"
        >
          <Volume2 className="mb-2" />
          <span>صوت</span>
        </button>
      </div>
      
      <p className="text-2xl font-bold text-pink-600 text-center">
        {reaction === "none" && "أهلاً يا أميرتي! العبي معي"}
        {reaction === "happy" && "أنا أحبكِ جداً! ❤️"}
        {reaction === "eating" && "يممم! لذيذ جداً! 😋"}
        {reaction === "dancing" && "أنا أحب هذه الموسيقى! 💃"}
        {reaction === "surprised" && "أوه! ما هذا الصوت؟ 😮"}
      </p>
    </div>
  );
}
