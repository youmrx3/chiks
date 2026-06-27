export default function WaveSection({ children, backgroundColor = 'var(--c-offwhite)', waveColor = 'var(--c-white)' }) {
  return (
    <section style={{ background: backgroundColor, position: 'relative' }}>
      <svg
        viewBox="0 0 1440 80"
        style={{ display: 'block', width: '100%', height: 'auto', marginTop: -2 }}
        preserveAspectRatio="none"
      >
        <path d="M0 40C240 0 480 80 720 60C960 40 1200 80 1440 20V80H0Z" fill={waveColor} />
      </svg>

      <div style={{ padding: '0 32px' }}>
        {children}
      </div>

      <svg
        viewBox="0 0 1440 80"
        style={{ display: 'block', width: '100%', height: 'auto', marginBottom: -2 }}
        preserveAspectRatio="none"
      >
        <path d="M0 40C240 80 480 0 720 20C960 40 1200 0 1440 60V0H0Z" fill={waveColor} />
      </svg>
    </section>
  );
}
