import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Privacy() {
  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-8 md:px-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-text-dim">Effective date: August 2, 2026</p>

          <h2 className="mt-8 font-display text-xl">What we collect</h2>
          <p className="mt-3 text-text-muted">
            Nothing. NextDance stores all of your session data (activity type, dance style, notes,
            and timestamps) locally on your device. None of it is transmitted anywhere: there is no
            backend server, and the app does not include any analytics or crash-reporting service.
          </p>

          <h2 className="mt-8 font-display text-xl">Changes to this policy</h2>
          <p className="mt-3 text-text-muted">
            If this ever changes (for example, if a future version of the app adds analytics), this
            page will be updated and the effective date above will change accordingly.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
