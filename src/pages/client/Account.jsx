import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiBell, FiGlobe, FiSave, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import BreadCrumb from '../../components/client/BreadCrumb';
import { formatDateShort } from '../../utils/formatDate';
import customers from '../../data/customers';

const MOCK_USER = customers[0];

const TABS = [
  { key: 'info', label: 'Informations personnelles' },
  { key: 'addresses', label: 'Adresses' },
  { key: 'preferences', label: 'Préférences' },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('info');
  const [form, setForm] = useState({
    fullName: MOCK_USER.fullName,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
  });
  const [newsletter, setNewsletter] = useState(true);
  const [language, setLanguage] = useState('fr');

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    toast.success('Modifications enregistrées avec succès !');
  };

  const initials = MOCK_USER.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 32px 64px' }}>
      <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Mon compte' }]} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20, marginBottom: 40, padding: '28px 32px', background: 'var(--c-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'var(--c-yellow-pale)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--c-yellow-deep)' }}>{initials}</span>
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--c-gray-900)' }}>
            {MOCK_USER.fullName}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--c-gray-500)' }}>
              <FiMail size={12} /> {MOCK_USER.email}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--c-gray-500)' }}>
              <FiPhone size={12} /> {MOCK_USER.phone}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--c-gray-500)' }}>
              <FiCalendar size={12} /> Membre depuis {formatDateShort(MOCK_USER.joinDate)}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32, borderBottom: '1px solid var(--c-gray-100)', overflowX: 'auto' }}
        className="account-tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '12px 20px', fontSize: 'var(--text-sm)', fontWeight: 600, whiteSpace: 'nowrap',
              color: activeTab === tab.key ? 'var(--c-yellow-deep)' : 'var(--c-gray-500)',
              borderBottom: `2px solid ${activeTab === tab.key ? 'var(--c-yellow)' : 'transparent'}`,
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'info' && (
            <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--c-gray-900)', marginBottom: 24 }}>
                Informations personnelles
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                    Nom complet
                  </label>
                  <input
                    type="text" value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    style={{ width: '100%', maxWidth: 400, height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                    Email
                  </label>
                  <input
                    type="email" value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    style={{ width: '100%', maxWidth: 400, height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                    Téléphone
                  </label>
                  <input
                    type="tel" value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    style={{ width: '100%', maxWidth: 400, height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)' }}
                  />
                </div>
                <div>
                  <button
                    onClick={handleSave}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 48, padding: '0 32px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-base)', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
                  >
                    <FiSave size={18} />
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--c-gray-900)', marginBottom: 24 }}>
                Adresses enregistrées
              </h3>
              <div style={{
                padding: 20, borderRadius: 'var(--radius-md)', border: '1px solid var(--c-gray-100)',
                display: 'flex', flexDirection: 'column', gap: '12', maxWidth: 400,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <FiMapPin size={18} style={{ color: 'var(--c-yellow-deep)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>
                      {MOCK_USER.fullName}
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)', marginTop: 4, lineHeight: 1.5 }}>
                      {MOCK_USER.city}, {MOCK_USER.wilaya}
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', marginTop: 4 }}>
                      {MOCK_USER.phone}
                    </p>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', marginTop: 16 }}>
                La gestion des adresses sera bientôt disponible.
              </p>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--c-gray-900)', marginBottom: 24 }}>
                Préférences
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={() => setNewsletter(!newsletter)}
                      style={{ width: 20, height: 20, accentColor: 'var(--c-yellow)', cursor: 'pointer' }}
                    />
                  </div>
                  <div>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>
                      Newsletter
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--c-gray-500)', marginTop: 2 }}>
                      Recevez nos offres exclusives et nouveautés par email.
                    </p>
                  </div>
                </label>

                <div>
                  <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                    Langue
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[
                      { value: 'fr', label: 'Français' },
                      { value: 'ar', label: 'العربية' },
                      { value: 'en', label: 'English' },
                    ].map((l) => (
                      <button
                        key={l.value}
                        onClick={() => setLanguage(l.value)}
                        style={{
                          height: 42, padding: '0 20px', borderRadius: 'var(--radius-pill)',
                          border: `1px solid ${language === l.value ? 'var(--c-yellow)' : 'var(--c-gray-100)'}`,
                          background: language === l.value ? 'var(--c-yellow-pale)' : 'var(--c-white)',
                          color: language === l.value ? 'var(--c-yellow-deep)' : 'var(--c-gray-700)',
                          fontSize: 'var(--text-sm)', fontWeight: language === l.value ? 700 : 500,
                          display: 'flex', alignItems: 'center', gap: 6,
                          transition: 'all 0.2s',
                        }}
                      >
                        {language === l.value && <FiCheck size={14} />}
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSave}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 48, padding: '0 32px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-base)', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
                  >
                    <FiSave size={18} />
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
