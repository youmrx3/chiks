import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiBookmark } from 'react-icons/fi';

const BOUTIQUE_LINKS = [
  { label: 'Nouveautés', to: '/boutique?sort=newest' },
  { label: 'Meilleures ventes', to: '/boutique?sort=bestsellers' },
  { label: 'Nouveaux-nés (0-3m)', to: '/boutique?age=0-3m' },
  { label: 'Tout-petits (3-24m)', to: '/boutique?age=3-24m' },
  { label: 'Enfants (2-8y)', to: '/boutique?age=2-8y' },
  { label: 'Accessoires', to: '/boutique?category=Accessoires' },
  { label: 'Promotions', to: '/boutique?onSale=true' },
];

const SERVICE_LINKS = [
  { label: 'Livraison & retours', to: '/livraison' },
  { label: 'Guide des tailles', to: '/guide-tailles' },
  { label: 'Suivi de commande', to: '/mes-commandes' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Service client', to: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--c-gray-900)', color: 'var(--c-white)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '64px 32px 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.4fr',
          gap: 48,
        }}
        className="footer-grid"
        >
          <style>{`@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C10 4 6 10 6 16C6 20 8 24 12 26C10 24 9 21 9 18C9 14 11 10 16 10C21 10 23 14 23 18C23 21 22 24 20 26C24 24 26 20 26 16C26 10 22 4 16 4Z" fill="var(--c-yellow)"/>
                <path d="M12 18C12 16 13 14 16 14C19 14 20 16 20 18C20 20 18 22 16 22C14 22 12 20 12 18Z" fill="var(--c-yellow-deep)"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px' }}>
                CHICKS<sup style={{ fontSize: 9, top: '-6px', position: 'relative' }}>™</sup>
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', lineHeight: 1.7, marginBottom: 24, maxWidth: 320 }}>
              Des vêtements pour enfants conçus avec amour en Algérie. Coton biologique, designs exclusifs et confort absolu pour vos petits bouts.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--c-gray-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-white)', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-gray-700)'}
              ><FiInstagram size={18} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--c-gray-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-white)', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-gray-700)'}
              ><FiFacebook size={18} /></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"
                style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--c-gray-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-white)', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-gray-700)'}
              ><FiBookmark size={18} /></a>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', marginBottom: 16 }}>Boutique</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BOUTIQUE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-white)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--c-gray-500)'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', marginBottom: 16 }}>Service client</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-white)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--c-gray-500)'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', marginBottom: 16 }}>Informations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)' }}>
              <p>
                <strong style={{ color: 'var(--c-white)' }}>Adresse</strong><br />
                123 Rue Didouche Mourad, Alger 16000, Algérie
              </p>
              <p>
                <strong style={{ color: 'var(--c-white)' }}>Téléphone</strong><br />
                +213 (0) 555 12 34 56
              </p>
              <p>
                <strong style={{ color: 'var(--c-white)' }}>Email</strong><br />
                bonjour@chicks.dz
              </p>
              <p>
                <strong style={{ color: 'var(--c-white)' }}>Horaires</strong><br />
                Sam–Jeu : 09h–18h<br />
                Ven : fermé
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              {['#E53935', '#1565C0', '#1E5631', '#F5C842'].map((c) => (
                <span key={c} style={{
                  width: 36, height: 24, borderRadius: 4, background: c,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 8, fontWeight: 700, color: c === '#F5C842' ? '#1E1D1B' : '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>•••</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 48, padding: '20px 0', borderTop: '1px solid var(--c-gray-700)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-gray-500)' }}>
            &copy; {new Date().getFullYear()} CHICKS™. Tous droits réservés. Conçu avec ❤️ en Algérie.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/confidentialite" style={{ fontSize: 'var(--text-xs)', color: 'var(--c-gray-500)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-white)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--c-gray-500)'}
            >Politique de confidentialité</Link>
            <Link to="/cgv" style={{ fontSize: 'var(--text-xs)', color: 'var(--c-gray-500)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-white)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--c-gray-500)'}
            >CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
