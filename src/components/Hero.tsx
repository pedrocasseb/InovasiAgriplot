import { Grip } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="relative z-10 text-center px-6 flex flex-col gap-6 md:gap-10 max-w-xl md:max-w-none mx-auto pt-28 pb-12 md:py-0">
        {/* Badge */}
        <div className="flex gap-2 bg-white shadow-md w-fit mx-auto items-center text-[10px] sm:text-xs font-semibold p-1.5 px-3 rounded-full border border-zinc-100 text-teal-600">
          <Grip size={14} className="md:w-4 md:h-4" />
          <p className="tracking-wide">EUDR Specialist</p>
        </div>

        {/* Title */}
        <div className="text-[36px] sm:text-4xl md:text-6xl font-[450] flex flex-col gap-2 md:gap-4 tracking-tight leading-tight text-zinc-900">
          <h1>Ensure Compliance</h1>
          <h1>Regulation With Agriplot&apos;s</h1>
          <h1>Due Diligence System</h1>
        </div>

        {/* Description */}
        <div className="text-zinc-500 text-xs sm:text-sm md:text-base max-w-sm md:max-w-none mx-auto leading-relaxed">
          <p>Introducing the Agriplot Due-Diligence System:</p>
          <p>Your partner for compliance with EU Deforestation Regulation.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 w-full max-w-65 sm:max-w-none mx-auto">
          <button className="w-full sm:w-auto cursor-pointer px-6 py-3.5 sm:py-3 bg-black text-white rounded-md text-sm md:text-base font-medium active:scale-[0.98] hover:bg-zinc-900 transition-all">
            Book a demo
          </button>
          <button className="w-full sm:w-auto cursor-pointer px-6 py-3.5 sm:py-3 bg-white text-black rounded-md border border-zinc-300 text-sm md:text-base font-medium hover:bg-zinc-50 active:scale-[0.98] transition-all">
            Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}
