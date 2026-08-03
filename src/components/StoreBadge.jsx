import { AppleIcon, GooglePlayIcon } from './icons';
import { STORE_LINKS } from '../lib/stores';

const STORE_COPY = {
  ios: { Icon: AppleIcon, kicker: 'Download on the', name: 'App Store' },
  android: { Icon: GooglePlayIcon, kicker: 'GET IT ON', name: 'Google Play' },
};

export function StoreBadge({ store, size = 'lg' }) {
  const { Icon, kicker, name } = STORE_COPY[store];
  const isSmall = size === 'sm';

  return (
    <a
      href={STORE_LINKS[store]}
      className={
        isSmall
          ? 'flex items-center justify-center gap-1.5 rounded-lg border border-border-strong bg-bg-inset px-2.5 py-1.5 text-text hover:border-gold'
          : 'flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-bg-inset px-4 py-2.5 text-text hover:border-gold'
      }
    >
      <Icon className={isSmall ? 'h-4 w-4 shrink-0' : 'h-6 w-6 shrink-0'} />
      <span className="flex flex-col leading-none text-left">
        <span
          className={
            isSmall
              ? 'text-[8px] uppercase tracking-wide text-text-muted'
              : 'text-[10px] uppercase tracking-wide text-text-muted'
          }
        >
          {kicker}
        </span>
        <span className={isSmall ? 'text-xs font-semibold' : 'text-sm font-semibold'}>{name}</span>
      </span>
    </a>
  );
}
