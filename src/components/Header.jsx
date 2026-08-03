import { AppStoreBadges } from './AppStoreBadges';

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-12">
      <a href="/" className="flex items-center gap-2">
        <img src="/favicon.png" alt="" className="h-9 w-auto" />
        <span className="font-display text-lg text-text">NextDance</span>
      </a>
      <AppStoreBadges variant="header" />
    </header>
  );
}
