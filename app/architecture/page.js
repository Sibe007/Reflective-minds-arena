import { getArchitecturePage, getAllProjects } from "../../sanity/queries";
import { urlFor } from "../../sanity/image";
import ProjectGallery from "../../components/ProjectGallery";
import TrackedLink from "../../components/TrackedLink";
export const revalidate = 30;

export const metadata = {
  title: "Architecture & Interior Finishing Works — Solomon B. Ibe",
  description:
    "Interior architecture and finishing works by Solomon B. Ibe. Residential and commercial spaces built with precision, materiality, and intent. Based in Lagos, Nigeria.",
};

export default async function ArchitecturePage() {
  const page = await getArchitecturePage();
  const gallery = await getAllProjects();

  const heading = page?.heading || "Interior Architecture & Finishing Works";
  const subheading =
    page?.subheading ||
    "Spaces designed and finished with precision — where every material, joint, and surface is chosen with intent.";
  const intro =
    page?.intro ||
    "With more than a decade of experience delivering residential, commercial, and institutional projects, I approach every space as both a technical problem and a human one. Add your own introduction in Studio — Architecture Portfolio Page.";
  const services = page?.services || [];
  const process = page?.process || [];
  const ctaHeading = page?.ctaHeading || "Have a project in mind?";
  const ctaText =
    page?.ctaText ||
    "Whether it's a single room or a full-building fit-out, I'd be glad to talk through what you're building.";
  const email = page?.contactEmail || "";
  const phone = page?.contactPhone || "";
  const whatsapp = page?.whatsappNumber || "";

  return (
    <div className="arch-page">
      {/* HERO */}
      <section className="arch-hero">
        <div className="arch-grid-lines" aria-hidden="true" />
        <div className="container arch-hero-inner">
          <div className="arch-hero-copy">
            <span className="arch-label">Interior Architecture — Lagos, Nigeria</span>
            <h1 className="arch-h1">{heading}</h1>
            <p className="arch-sub">{subheading}</p>
            <div className="arch-cta-row">
              <a href="#contact" className="arch-btn arch-btn-primary">
                Start a Project
              </a>
              <a href="#gallery" className="arch-btn arch-btn-ghost">
                View Projects ↓
              </a>
            </div>
          </div>
          <div className="arch-hero-image">
            {page?.heroImage ? (
              <img src={urlFor(page.heroImage).width(900).url()} alt={heading} />
            ) : (
              <div className="arch-hero-placeholder">
                <span>Add a hero image in Studio</span>
              </div>
            )}
            <div className="arch-swatch-strip" aria-hidden="true">
              <span style={{ background: "#8a6a4f" }} />
              <span style={{ background: "#c9c1b3" }} />
              <span style={{ background: "#3d3833" }} />
              <span style={{ background: "#c68b3d" }} />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="arch-section">
        <div className="container arch-intro-row">
          <span className="arch-label">Approach</span>
          <p className="arch-intro-text">{intro}</p>
        </div>
      </section>

      {/* SERVICES */}
      {services.length > 0 && (
        <section className="arch-section arch-section-alt">
          <div className="container">
            <span className="arch-label">Services</span>
            <h2 className="arch-h2">What I Deliver</h2>
            <div className="arch-services-grid">
              {services.map((s, i) => (
                <div className="arch-service-card" key={i}>
                  <span className="arch-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {process.length > 0 && (
        <section className="arch-section">
          <div className="container">
            <span className="arch-label">Process</span>
            <h2 className="arch-h2">How a Project Moves</h2>
            <ol className="arch-process-list">
              {process.map((step, i) => (
                <li key={i}>
                  <span className="arch-process-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* GALLERY */}
      <section className="arch-section arch-section-alt" id="gallery">
        <div className="container">
          <span className="arch-label">Selected Work</span>
          <h2 className="arch-h2">Project Gallery</h2>
          <ProjectGallery projects={gallery} />
          
        </div>
      </section>

      {/* CONTACT CTA */}
      <div className="arch-contact-links">
            {email && (
              <TrackedLink href={`mailto:${email}`} className="arch-btn arch-btn-primary" eventName="Contact" eventLabel="Architecture - Email">
                Email {email}
              </TrackedLink>
            )}
            {whatsapp && (
              <TrackedLink href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="arch-btn arch-btn-outline-light" eventName="Contact" eventLabel="Architecture - WhatsApp">
                Chat on WhatsApp
              </TrackedLink>
            )}
            {phone && (
              <TrackedLink href={`tel:${phone}`} className="arch-btn arch-btn-outline-light" eventName="Contact" eventLabel="Architecture - Phone">
                Call {phone}
              </TrackedLink>
            )}
            {!email && !whatsapp && !phone && (
              <p className="arch-cta-text" style={{ opacity: 0.7 }}>
                Add contact details in Studio to activate these buttons.
              </p>
            )}
    
          </div>
        </div>
         )}