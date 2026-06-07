"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-[#f0ede6]/6">

      {/* Upper footer */}
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand column — wide */}
          <div className="md:col-span-5">
            <p
              className="t-display text-[#f0ede6]/80 mb-6"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.1 }}
            >
              Clean &amp; Green
              <br />
              <span className="t-display-italic text-[#c8d5b0]/70">Services.</span>
            </p>
            <p className="t-body text-[#f0ede6]/35 mb-8" style={{ fontSize: "0.9rem", maxWidth: "34ch", lineHeight: 1.8 }}>
              Owned and operated by Idan &amp; Tristin out of Winnipeg, Manitoba. Started in 2023 with one goal — do the job properly and stand behind it.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:2048993566"
                className="t-body text-[#c8d5b0]/70 hover:text-[#c8d5b0] transition-colors duration-200"
                style={{ fontSize: "0.9rem" }}
              >
                204-899-3566
              </a>
              <a
                href="https://www.instagram.com/cleanandgreenservices"
                target="_blank"
                rel="noopener noreferrer"
                className="t-label text-[#f0ede6]/25 hover:text-[#f0ede6]/50 transition-colors duration-200"
              >
                @cleanandgreenservices
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Services */}
          <div className="md:col-span-3">
            <p className="t-label text-[#f0ede6]/22 mb-6" style={{ fontSize: "0.62rem" }}>Services</p>
            <ul className="flex flex-col gap-3">
              {[
                "Window Cleaning",
                "Exterior Glass",
                "Lawn Mowing & Edging",
                "Spring Cleanup",
                "Weed Control",
                "Fertilizer Programs",
                "Core Aeration",
              ].map(s => (
                <li key={s}>
                  <a
                    href="#services"
                    className="t-body text-[#f0ede6]/30 hover:text-[#f0ede6]/65 transition-colors duration-200"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate + Location */}
          <div className="md:col-span-3">
            <p className="t-label text-[#f0ede6]/22 mb-6" style={{ fontSize: "0.62rem" }}>Navigate</p>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                { label: "Our Story", href: "#story" },
                { label: "Our Work", href: "#work" },
                { label: "Services", href: "#services" },
                { label: "Reviews", href: "#contact" },
                { label: "Get in Touch", href: "#contact" },
              ].map(n => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="t-body text-[#f0ede6]/30 hover:text-[#f0ede6]/65 transition-colors duration-200"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="t-label text-[#f0ede6]/22 mb-3" style={{ fontSize: "0.62rem" }}>Location</p>
            <p className="t-body text-[#f0ede6]/30" style={{ fontSize: "0.85rem", lineHeight: 1.8 }}>
              Winnipeg, Manitoba<br />Canada
            </p>
          </div>
        </div>
      </div>

      {/* Lower bar */}
      <div className="border-t border-[#f0ede6]/6">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="t-label text-[#f0ede6]/18" style={{ fontSize: "0.6rem" }}>
            &copy; {year} Clean &amp; Green Services. Winnipeg, MB.
          </span>
          <span className="t-label text-[#f0ede6]/12" style={{ fontSize: "0.6rem" }}>
            Est. 2023 &nbsp;&middot;&nbsp; All work guaranteed
          </span>
        </div>
      </div>
    </footer>
  );
}
