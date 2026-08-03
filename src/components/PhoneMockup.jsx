export function PhoneMockup() {
  return (
    <div className="mt-12 flex justify-center md:mt-0 md:flex-1" style={{ perspective: '1500px' }}>
      <div
        className="rounded-[2.75rem] bg-bg-inset p-2.5 shadow-2xl ring-1 ring-border-strong"
        style={{ transform: 'rotateY(-10deg) rotateX(2deg)' }}
      >
        <img
          src="/app-screenshot.png"
          alt="NextDance app screenshot"
          className="h-128 w-auto rounded-[2.25rem] lg:h-160"
        />
      </div>
    </div>
  );
}
