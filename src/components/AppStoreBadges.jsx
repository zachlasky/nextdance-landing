import { StoreBadge } from './StoreBadge';

function detectStore() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return null;
}

export function AppStoreBadges({ variant }) {
  const store = detectStore();
  const stores = store ? [store] : ['ios', 'android'];
  const size = variant === 'hero' ? 'lg' : 'sm';
  const gridCols = stores.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1';

  return (
    <div className={variant === 'hero' ? `mt-8 grid gap-3 ${gridCols}` : `grid gap-2 ${gridCols}`}>
      {stores.map((s) => (
        <StoreBadge key={s} store={s} size={size} />
      ))}
    </div>
  );
}
