import React, { useRef, useState, useEffect } from "react";
import { Palette, Trash2, Download } from "lucide-react";

export default function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ff69b4");
  const [brushSize, setBrushSize] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set initial canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [color, brushSize]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "my-drawing.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-3xl overflow-hidden shadow-xl border-8 border-pink-200">
      {/* Toolbar */}
      <div className="bg-pink-100 p-4 flex items-center justify-between border-b-4 border-pink-200">
        <div className="flex space-x-4 items-center">
          <button
            onClick={clearCanvas}
            className="p-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition-colors"
            title="مسح الكل"
          >
            <Trash2 size={24} />
          </button>
          <button
            onClick={downloadImage}
            className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
            title="حفظ الرسمة"
          >
            <Download size={24} />
          </button>
        </div>

        <div className="flex space-x-4 items-center">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 rounded-full cursor-pointer border-4 border-white shadow-sm"
          />
          <input
            type="range"
            min="2"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32 accent-pink-500"
          />
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative cursor-crosshair touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="absolute inset-0"
        />
      </div>
      
      <div className="p-4 bg-pink-50 text-center font-bold text-pink-600">
        ارسمي شيئاً جميلاً يا مبدعة!
      </div>
    </div>
  );
}
