import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AppStoreBadges } from '../components/AppStoreBadges';
import { PhoneMockup } from '../components/PhoneMockup';

export function Home() {
  return (
    <>
      <Header />
      <main className="px-6 md:px-12">
        <section className="relative overflow-hidden rounded-3xl bg-bg-elevated p-8 md:p-16">
          {/* decorative squiggle accent */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full text-border-strong opacity-30"
            viewBox="0 0 800 400"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 320 C 150 260, 250 380, 400 300 S 650 180, 800 260"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          <div className="relative flex flex-col md:flex-row md:items-center md:gap-12">
            <div className="md:flex-1">
              <h1 className="font-display text-5xl leading-none md:text-7xl">
                <span className="block font-semibold">TRACK YOUR</span>
                <span className="block italic text-text-muted">NIGHT</span>
              </h1>

              <p className="mt-6 max-w-md text-text-muted">
                Log every session — activity, style, timestamped notes. All stored on your device,
                nothing in the cloud.
              </p>

              <AppStoreBadges variant="hero" />
            </div>

            <PhoneMockup />
          </div>
        </section>
      </main>
      <Footer showPrivacyLink />
    </>
  );
}
