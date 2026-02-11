import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#ffffff",
  bgAlt: "#f7f8fa",
  bgCard: "#ffffff",
  accent: "#1a56db",
  accentLight: "#3b72e8",
  accentBg: "rgba(26, 86, 219, 0.06)",
  accentBorder: "rgba(26, 86, 219, 0.12)",
  gold: "#e8a80e",
  black: "#111827",
  dark: "#1f2937",
  text: "#374151",
  textLight: "#6b7280",
  border: "#e5e7eb",
  borderLight: "#f3f4f6",
};

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

function Fade({ children, delay = 0, style = {}, className = "" }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`, ...style,
    }}>{children}</div>
  );
}

const Icons = {
  phone: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  star: <svg width="15" height="15" viewBox="0 0 24 24" fill={C.gold} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  quote: <svg width="24" height="24" viewBox="0 0 24 24" fill={C.accent} opacity="0.15"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>,
  check: (s) => <svg width={s||20} height={s||20} viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  mapPin: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  mail: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  team: <><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></>,
  support: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  leaf: <><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 19"/><path d="M2 2s7 3 12 3 9 1 9 1"/><path d="M2 2s4 8 4 16"/></>,
};

function BenefitIcon({ type }) {
  const map = { team: Icons.team, support: Icons.support, schedule: Icons.calendar, eco: Icons.leaf };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{map[type]}</svg>;
}

const testimonials = [
  { label: "What Our Clients Say", quote: "AutoSync 360 is exceptional! My fleet vehicles have never looked better. The team is professional, detail-oriented, and their dedication is unparalleled.", author: "Mark Stevens", role: "Auto Dealership Owner" },
  { label: "Unmatched Service", quote: "I trust AutoSync 360 for all my aviation fleet detailing needs. Their precision and expertise are truly impressive, delivering a showroom shine every time!", author: "Jessica Adams", role: "Aviation Fleet Manager" },
  { label: "Exceeding Expectations", quote: "AutoSync 360 consistently goes above and beyond. Their attention to detail and commitment to excellence make them the best choice for maintaining our auto auction inventory.", author: "Ryan Johnson", role: "Auction House Manager" },
  { label: "Exceptional Quality", quote: "AutoSync 360's detailing services are unmatched. They have successfully kept our commercial fleet vehicles in pristine condition, ensuring our brand is always represented at its best.", author: "Sophia Clark", role: "Commercial Fleet Owner" },
];

const services = [
  { title: "Auto Auction Detailing", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=380&fit=crop" },
  { title: "Aviation Fleet Detailing", img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=500&h=380&fit=crop" },
  { title: "Commercial Fleet Detailing", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=380&fit=crop" },
];

const benefits = [
  { icon: "team", title: "Skilled Detailing Team", desc: "Our team is highly skilled and experienced in providing specialized automotive detailing services, ensuring exceptional care for each vehicle." },
  { icon: "support", title: "Dedicated Support", desc: "We are dedicated to providing outstanding customer service and support throughout your detailing experience, ensuring your complete satisfaction." },
  { icon: "schedule", title: "Flexible Scheduling", desc: "We offer flexible scheduling options, including tailored service packages for high-volume operations and specialized fleets, designed to meet your unique needs." },
  { icon: "eco", title: "Eco-Friendly Approach", desc: "At AutoSync 360, we are committed to using eco-friendly products and practices to minimize environmental impact, ensuring responsible and sustainable automotive detailing." },
];

const trustedLogos = [
  { src: "/BMW.png", alt: "BMW" },
  { src: "/chevrolet.svg", alt: "Chevrolet" },
  { src: "/ford.png", alt: "Ford" },
  { src: "/Honda.png", alt: "Honda" },
  { src: "/volkswagen.png", alt: "Volkswagen" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ firstName: "", company: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => { setMobileMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setForm({ firstName: "", company: "", phone: "", email: "", message: "" });
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", color: C.dark, background: C.bg, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${C.bg}; }

        .as-nav-link {
          color: ${C.text}; text-decoration: none; font-size: 13px; font-weight: 500;
          letter-spacing: 0.6px; text-transform: uppercase; transition: color 0.3s; cursor: pointer;
        }
        .as-nav-link:hover { color: ${C.accent}; }

        .as-btn-primary {
          display: inline-block; padding: 14px 36px; border: none; border-radius: 4px; cursor: pointer;
          font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 13px;
          letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none;
          background: ${C.accent}; color: white; transition: all 0.3s ease;
        }
        .as-btn-primary:hover { background: ${C.accentLight}; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,86,219,0.25); }

        .as-btn-outline {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; border: 1px solid ${C.border}; border-radius: 4px; cursor: pointer;
          font-family: 'Montserrat', sans-serif; font-weight: 500; font-size: 12px;
          letter-spacing: 0.5px; text-decoration: none;
          background: transparent; color: ${C.text}; transition: all 0.3s ease;
        }
        .as-btn-outline:hover { border-color: ${C.accent}; color: ${C.accent}; }

        .as-input {
          width: 100%; padding: 12px 16px; border: 1px solid ${C.border};
          border-radius: 4px; background: ${C.bg}; color: ${C.dark};
          font-family: 'Montserrat', sans-serif; font-size: 14px; transition: border-color 0.3s; outline: none;
        }
        .as-input:focus { border-color: ${C.accent}; box-shadow: 0 0 0 3px ${C.accentBg}; }
        .as-input::placeholder { color: ${C.textLight}; }

        .as-card {
          background: ${C.bgCard}; border: 1px solid ${C.border}; border-radius: 8px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .as-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }

        .as-section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; }
        .as-section-title {
          font-family: 'Lora', serif; font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 600; text-align: center; margin-bottom: 12px; color: ${C.black};
        }
        .as-section-sub {
          text-align: center; font-size: 14px; color: ${C.textLight};
          letter-spacing: 0.5px; margin-bottom: 48px;
        }

        .as-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        .as-hamburger span { display: block; width: 22px; height: 2px; background: ${C.text}; margin: 5px 0; transition: all 0.3s; }

        .as-testimonials-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 48px; }

        @media (max-width: 1200px) {
          .as-testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 800px) {
          .as-hamburger { display: block; }
          .as-desktop-nav { display: none !important; }
          .as-hero-grid { flex-direction: column !important; }
          .as-hero-img-wrap { max-width: 100% !important; height: 400px !important; }
          .as-benefits-grid { flex-direction: column !important; }
          .as-benefits-img { display: none !important; }
          .as-testimonials-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .as-section { padding: 60px 16px; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 140, padding: "10px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/autosync360logo.png" alt="AutoSync 360" style={{ height: 110, width: "auto" }} />
          </div>

          <div className="as-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <span className="as-nav-link" onClick={() => scrollTo("testimonials")}>Testimonials</span>
            <span className="as-nav-link" onClick={() => scrollTo("services")}>Services</span>
            <span className="as-nav-link" onClick={() => scrollTo("benefits")}>Benefits</span>
            <span className="as-nav-link" onClick={() => scrollTo("contact")}>Contact</span>
            <a href="tel:8662886239" className="as-btn-outline">{Icons.phone} 866-AUTO-239</a>
          </div>

          <button className="as-hamburger" onClick={() => setMobileMenu(!mobileMenu)}><span /><span /><span /></button>
        </div>
      </nav>

      {mobileMenu && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999, background: "rgba(255,255,255,0.98)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
        }} onClick={() => setMobileMenu(false)}>
          {["testimonials", "services", "benefits", "contact"].map(id => (
            <span key={id} className="as-nav-link" style={{ fontSize: 18 }} onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          ))}
          <a href="tel:8662886239" className="as-btn-primary" style={{ marginTop: 16 }}>866-AUTO-239</a>
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "180px 24px 60px", background: C.bg }}>
        <div className="as-hero-grid" style={{
          maxWidth: 1100, margin: "0 auto", width: "100%",
          display: "flex", alignItems: "center", gap: 48,
        }}>
          <div style={{ flex: "1 1 500px" }}>
            <Fade>
              <h1 style={{
                fontFamily: "'Lora', serif", fontSize: "clamp(32px, 4.5vw, 50px)",
                fontWeight: 600, lineHeight: 1.2, marginBottom: 24, color: C.black,
              }}>
                Experience the AutoSync 360 Difference...
              </h1>
            </Fade>
            <Fade delay={0.12}>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: C.text, marginBottom: 16, maxWidth: 520 }}>
                Don't settle for ordinary when your vehicles deserve extraordinary. Whether you manage an auction lot, a dealership, a fleet, or an aviation operation, AutoSync 360 is ready to deliver professional detailing solutions tailored to your needs.
              </p>
            </Fade>
            <Fade delay={0.2}>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: C.text, marginBottom: 36, maxWidth: 520 }}>
                Click on "Get started" below and fill out the quick form and one of our specialists will reach out to customize a service plan that's right for you. Fast, reliable, and always professional — that's the AutoSync 360 promise.
              </p>
            </Fade>
            <Fade delay={0.28}>
              <button className="as-btn-primary" onClick={() => scrollTo("contact")}>GET STARTED</button>
            </Fade>
          </div>

          <Fade delay={0.15} style={{ flex: "1 1 380px", display: "flex", justifyContent: "center" }}>
            <div className="as-hero-img-wrap" style={{
              width: "100%", maxWidth: 400, height: 540, borderRadius: 12, overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
            }}>
              <img src="/experience-difference.png"
                alt="Experience the AutoSync 360 Difference" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </Fade>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}` }}>
        <div className="as-section">
          <Fade><h2 className="as-section-title">Client Testimonials</h2></Fade>

          <div className="as-testimonials-grid">
            {testimonials.map((t, i) => (
              <Fade key={i} delay={i * 0.08}>
                <div className="as-card" style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                    {[...Array(5)].map((_, j) => <span key={j}>{Icons.star}</span>)}
                  </div>
                  {Icons.quote}
                  <div style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase",
                    color: C.accent, margin: "10px 0 8px",
                  }}>{t.label}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: C.text, fontStyle: "italic", flex: 1 }}>
                    "{t.quote}"
                  </p>
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.borderLight}` }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: C.black }}>{t.author}</div>
                    <div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div className="as-section">
          <Fade>
            <h2 className="as-section-title">Our Specialized Services</h2>
            <p className="as-section-sub">What We Offer</p>
          </Fade>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div className="as-card" style={{ overflow: "hidden" }}>
                  <div style={{ height: 200, overflow: "hidden" }}>
                    <img src={s.img} alt={s.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                      onMouseOver={e => e.target.style.transform = "scale(1.05)"}
                      onMouseOut={e => e.target.style.transform = "scale(1)"}
                    />
                  </div>
                  <div style={{ padding: "18px 24px", textAlign: "center" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: C.black }}>{s.title}</h3>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ padding: "48px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <Fade>
            <h2 style={{ textAlign: "center", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.textLight, marginBottom: 32 }}>TRUSTED BY</h2>
          </Fade>
          <Fade delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
              {trustedLogos.map((logo, i) => (
                <div key={i} style={{
                  width: 120, height: 120, background: C.bg,
                  border: `1px solid ${C.border}`, borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  <img src={logo.src} alt={logo.alt} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div className="as-section">
          <Fade><h2 className="as-section-title">Why Choose AutoSync 360</h2></Fade>

          <div className="as-benefits-grid" style={{ display: "flex", gap: 40, marginTop: 48, alignItems: "stretch" }}>
            <div style={{ flex: "1 1 480px", display: "flex", flexDirection: "column", gap: 28 }}>
              {benefits.map((b, i) => (
                <Fade key={i} delay={i * 0.08}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                      background: C.accentBg, border: `1px solid ${C.accentBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <BenefitIcon type={b.icon} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: C.black }}>{b.title}</h3>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, wordWrap: "break-word" }}>{b.desc}</p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>

            <Fade delay={0.15} style={{ flex: "1 1 400px" }} className="as-benefits-img">
              <div style={{
                borderRadius: 12, overflow: "hidden", height: "100%", minHeight: 360,
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              }}>
                <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&h=500&fit=crop"
                  alt="Professional fleet" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: "80px 24px", maxWidth: 600, margin: "0 auto" }}>
          <Fade>
            <h2 className="as-section-title">Schedule An Onsite Meeting</h2>
            <p className="as-section-sub">Please take a moment to fill out the form.</p>
          </Fade>

          {submitted ? (
            <Fade>
              <div style={{ textAlign: "center", padding: 40 }}>
                {Icons.check(32)}
                <h3 style={{ marginTop: 12, fontSize: 20, color: C.black }}>Thanks for submitting!</h3>
                <p style={{ color: C.textLight, marginTop: 8, fontSize: 14 }}>One of our specialists will reach out shortly.</p>
              </div>
            </Fade>
          ) : (
            <Fade delay={0.1}>
              <div style={{
                background: C.bg, borderRadius: 12, padding: 32,
                border: `1px solid ${C.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {error && (
                    <div style={{
                      padding: 12,
                      background: "#fee",
                      border: "1px solid #fcc",
                      borderRadius: 4,
                      color: "#c33",
                      fontSize: 14
                    }}>
                      {error}
                    </div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, color: C.textLight, marginBottom: 6, display: "block" }}>First Name *</label>
                      <input
                        className="as-input"
                        value={form.firstName}
                        onChange={e => setForm({ ...form, firstName: e.target.value })}
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, color: C.textLight, marginBottom: 6, display: "block" }}>Company Name</label>
                      <input
                        className="as-input"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        disabled={submitting}
                      />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, color: C.textLight, marginBottom: 6, display: "block" }}>Phone Number</label>
                      <input
                        className="as-input"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, color: C.textLight, marginBottom: 6, display: "block" }}>Email *</label>
                      <input
                        className="as-input"
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: C.textLight, marginBottom: 6, display: "block" }}>Leave us a message... *</label>
                    <textarea
                      className="as-input"
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ resize: "vertical" }}
                      required
                      disabled={submitting}
                    />
                  </div>
                  <button
                    type="submit"
                    className="as-btn-primary"
                    style={{ width: "100%", textAlign: "center", marginTop: 4 }}
                    disabled={submitting}
                  >
                    {submitting ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              </div>
            </Fade>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 36, marginBottom: 36 }}>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, color: C.black }}>Legal</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Privacy Policy", "Accessibility Statement"].map(t => (
                  <a key={t} href="#" style={{ color: C.textLight, textDecoration: "none", fontSize: 13, transition: "color 0.3s" }}
                    onMouseOver={e => e.target.style.color = C.accent} onMouseOut={e => e.target.style.color = C.textLight}>{t}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, color: C.black }}>Operating Hours</h4>
              <div style={{ fontSize: 13, lineHeight: 2, color: C.textLight }}>
                Mon - Fri: 8am - 8pm<br />Saturday: 9am - 7pm<br />Sunday: 9am - 8pm
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, color: C.black }}>Follow us here</h4>
              <div style={{ display: "flex", gap: 10 }}>
                {["IG", "FB", "YT", "TT"].map(s => (
                  <a key={s} href="#" style={{
                    width: 34, height: 34, borderRadius: "50%", background: C.bgAlt,
                    border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 600, color: C.textLight, textDecoration: "none", transition: "all 0.3s",
                  }}
                    onMouseOver={e => { e.currentTarget.style.background = C.accentBg; e.currentTarget.style.color = C.accent; e.currentTarget.style.borderColor = C.accentBorder; }}
                    onMouseOut={e => { e.currentTarget.style.background = C.bgAlt; e.currentTarget.style.color = C.textLight; e.currentTarget.style.borderColor = C.border; }}
                  >{s}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, color: C.black }}>Contact</h4>
              <div style={{ fontSize: 13, lineHeight: 1.8, color: C.textLight }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                  {Icons.mapPin}<span>AutoSync 360<br />1317 Edge Water Suite 7192<br />Orlando, FL 32804</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  {Icons.phone}<a href="tel:8662886239" style={{ color: C.textLight, textDecoration: "none" }}>866-AUTO-239</a>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {Icons.mail}<a href="mailto:sales@autosync360.com" style={{ color: C.textLight, textDecoration: "none" }}>sales@autosync360.com</a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, textAlign: "center", fontSize: 12, color: C.textLight }}>
            © 2035 by AutoSync 360
          </div>
        </div>
      </footer>
    </div>
  );
}
