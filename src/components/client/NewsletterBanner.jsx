import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Veuillez entrer une adresse email valide.');
      return;
    }
    toast.success('Merci de vous être abonné ! 🐣');
    setEmail('');
  };

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--c-yellow)' }}>
      <svg
        viewBox="0 0 1440 120"
        style={{ display: 'block', width: '100%', height: 'auto', marginTop: -2 }}
        preserveAspectRatio="none"
      >
        <path d="M0 120V40C240 80 480 0 720 40C960 80 1200 0 1440 40V120Z" fill="var(--c-offwhite)" />
      </svg>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 32px 64px', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'var(--text-2xl)', color: 'var(--c-gray-900)',
          marginBottom: 12,
        }}>
          Restez connectés
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-700)', marginBottom: 28, lineHeight: 1.6 }}>
          Inscrivez-vous à notre newsletter et recevez -10% sur votre première commande, ainsi que nos nouveautés et offres exclusives.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            required
            style={{
              flex: 1, height: 56, padding: '0 24px', borderRadius: 'var(--radius-pill)',
              border: 'none', fontSize: 'var(--text-base)', color: 'var(--c-gray-900)',
              background: 'var(--c-white)',
              boxShadow: '0 2px 8px rgba(30,29,27,0.06)',
            }}
          />
          <button
            type="submit"
            style={{
              height: 56, padding: '0 32px', borderRadius: 'var(--radius-pill)',
              background: 'var(--c-gray-900)', color: 'var(--c-white)',
              fontWeight: 700, fontSize: 'var(--text-base)',
              transition: 'opacity 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            S'abonner
          </button>
        </form>
      </div>

      <svg
        viewBox="0 0 1440 120"
        style={{ display: 'block', width: '100%', height: 'auto', marginBottom: -2 }}
        preserveAspectRatio="none"
      >
        <path d="M0 0V80C240 40 480 120 720 80C960 40 1200 120 1440 80V0Z" fill="var(--c-offwhite)" />
      </svg>
    </section>
  );
}
