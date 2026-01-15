

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { buildWhatsAppUrl } from "../utils/contactLinks";
import useContacts from "../hooks/useContacts";

export default function TrustCarousel() {
  const { whatsapp } = useContacts();
  const { data: slides = [] } = useQuery({
    queryKey: ["carousel"],
    queryFn: async () => (await api.get("/api/carousel")).data,
  });

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      4500
    );
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides.length) return null;

  return (
    <section className="relative h-[460px] rounded-3xl overflow-hidden shadow-2xl">
      {slides.map((s, i) => (
        <div
          key={s._id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            active === i ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={s.image.url}
            alt={s.title}
            className="w-full h-full object-cover scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="ml-6 md:ml-14 max-w-xl">
              <div className="  rounded-2xl p-6 md:p-8 shadow-xl">
                <span className="inline-block mb-3 px-3 py-1 text-xs tracking-widest uppercase 
                                 bg-emerald-500/20 text-emerald-300 rounded-full">
                  Trusted Farm
                </span>

                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  {s.title}
                </h2>

                <div className="w-16 h-[3px] bg-emerald-400 rounded-full my-4" />

                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  {s.description}
                </p>

                {/* CTA */}
                {/* <a
                  href={"https://wa.me/01753118588"}
                  target="_blank"
                  className="inline-flex items-center mt-6 px-6 py-3 
                             bg-emerald-500 hover:bg-emerald-600
                             text-white font-semibold rounded-xl
                             transition shadow-lg"
                >
                  Contact on WhatsApp
                </a> */}
                  {whatsapp && (
                    <button
                      type="button"
                      onClick={() => window.open(buildWhatsAppUrl(whatsapp), "_blank")}
                      className="inline-flex items-center mt-6 px-6 py-3 
                             bg-emerald-500 hover:bg-emerald-600
                             text-white font-semibold rounded-xl
                             transition shadow-lg"
                    >
                      Contact on WhatsApp
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all ${
              active === i
                ? "w-8 bg-emerald-400"
                : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
