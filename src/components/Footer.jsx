export function Footer({ showPrivacyLink = false }) {
  return (
    <footer
      className={`mt-16 flex items-center px-6 py-8 text-sm text-text-muted md:px-12 ${
        showPrivacyLink ? 'justify-between' : 'justify-end'
      }`}
    >
      {showPrivacyLink && (
        <a href="/privacy.html" className="hover:text-text-muted">
          Privacy Policy
        </a>
      )}
      <span>&copy; {new Date().getFullYear()} NextDance</span>
    </footer>
  );
}
