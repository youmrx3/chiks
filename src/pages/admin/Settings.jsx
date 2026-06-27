import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiSave, FiUpload, FiEye, FiEyeOff, FiTrash2,
  FiPlus, FiToggleLeft, FiShield, FiBell,
  FiCreditCard, FiMapPin, FiSettings, FiLink,
  FiShoppingBag, FiMail, FiSmartphone,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import formatCurrency from '../../utils/formatCurrency';
import wilayas from '../../data/wilayas';

const tabs = [
  { key: 'shop', label: 'Informations boutique', icon: FiShoppingBag },
  { key: 'shipping', label: 'Livraison / zones', icon: FiMapPin },
  { key: 'payment', label: 'Paiement', icon: FiCreditCard },
  { key: 'notifications', label: 'Notifications', icon: FiBell },
  { key: 'admins', label: 'Comptes admin', icon: FiShield },
  { key: 'appearance', label: 'Apparence', icon: FiSettings },
  { key: 'integrations', label: 'Intégrations', icon: FiLink },
];

const adminAccounts = [
  { name: 'Rania Chekroun', email: 'rania@chicks.dz', role: 'Super Admin', lastAccess: 'À l\'instant', status: 'active', avatar: 'RC' },
  { name: 'Amina Bensalem', email: 'amina@chicks.dz', role: 'Gestionnaire', lastAccess: 'Il y a 2h', status: 'active', avatar: 'AB' },
  { name: 'Yacine Merabet', email: 'yacine@chicks.dz', role: 'Commercial', lastAccess: 'Il y a 1j', status: 'active', avatar: 'YM' },
  { name: 'Fatima Zohra', email: 'fatima@chicks.dz', role: 'Support', lastAccess: 'Il y a 3j', status: 'inactive', avatar: 'FZ' },
];

const carriers = [
  { name: 'Yalitec', desc: 'Transporteur national Algérie', logo: 'YL' },
  { name: 'Jawal Express', desc: 'Livraison express 24-48h', logo: 'JE' },
  { name: 'Zaki Express', desc: 'Transporteur régional', logo: 'ZE' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('shop');
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const handleSave = () => {
    toast.success('Paramètres enregistrés !');
  };

  const TabContent = ({ children }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );

  const Input = ({ label, ...props }) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>{label}</label>
      <input
        {...props}
        style={{
          width: '100%', padding: '9px 12px', border: '1px solid var(--c-gray-100)',
          borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)',
          background: '#fff', transition: 'border-color 0.15s',
          ...props.style,
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
      />
    </div>
  );

  const Toggle = ({ checked, onChange, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
      <span style={{ fontSize: '13px', color: 'var(--c-gray-700)' }}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: '40px', height: '22px', borderRadius: '11px',
          background: checked ? 'var(--c-yellow)' : 'var(--c-gray-100)',
          position: 'relative', transition: 'background 0.2s', border: 'none', padding: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: '2px', width: '18px', height: '18px',
          borderRadius: '50%', background: '#fff',
          left: checked ? '20px' : '2px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }} />
      </button>
    </div>
  );

  const Section = ({ title, children }) => (
    <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px', marginBottom: '16px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>
      {children}
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'shop':
        return (
          <TabContent>
            <Section title="Logo de la boutique">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', background: 'var(--c-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--c-gray-900)' }}>
                  C
                </div>
                <div>
                  <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', color: 'var(--c-gray-700)', fontSize: '12px', fontWeight: 600 }}>
                    <FiUpload size={15} /> Télécharger
                  </button>
                  <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', marginTop: '4px' }}>PNG, JPG ou WEBP. 200x200px recommandé.</div>
                </div>
              </div>
            </Section>
            <Section title="Informations générales">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Input label="Nom de la boutique" defaultValue="CHICKS™" />
                <Input label="Email de contact" defaultValue="contact@chicks.dz" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Description</label>
                <textarea
                  defaultValue="Vêtements premium pour enfants, conçus avec amour en Algérie."
                  rows={3}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 16px' }}>
                <Input label="Téléphone" defaultValue="+213 770 123 456" />
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Wilaya</label>
                  <select defaultValue="16" style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: '#fff' }}>
                    {wilayas.map((w) => <option key={w.id} value={w.code}>{w.name}</option>)}
                  </select>
                </div>
                <Input label="Adresse" defaultValue="12 Rue des frères Arfi, Alger Centre" />
              </div>
            </Section>
            <Section title="Réseaux sociaux">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Input label="Instagram" defaultValue="https://instagram.com/chicks_algerie" placeholder="https://instagram.com/..." />
                <Input label="Facebook" defaultValue="https://facebook.com/chicksalgerie" placeholder="https://facebook.com/..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Input label="TikTok" defaultValue="" placeholder="https://tiktok.com/..." />
                <Input label="Pinterest" defaultValue="" placeholder="https://pinterest.com/..." />
              </div>
            </Section>
            <button
              onClick={handleSave}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
            >
              <FiSave size={16} /> Enregistrer
            </button>
          </TabContent>
        );

      case 'shipping':
        return (
          <TabContent>
            <Section title="Frais de livraison">
              <Toggle label="Livraison gratuite" checked={true} onChange={() => {}} />
              <Input label="Seuil de livraison gratuite (DA)" type="number" defaultValue="5000" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Input label="Tarif standard (DA)" type="number" defaultValue="400" />
                <Input label="Tarif express (DA)" type="number" defaultValue="800" />
              </div>
            </Section>
            <Section title="Zones de livraison (Wilayas)">
              <p style={{ fontSize: '12px', color: 'var(--c-gray-500)', marginBottom: '12px' }}>
                Activez ou désactivez la livraison par wilaya et définissez les délais.
              </p>
              <div style={{ overflowX: 'auto', maxHeight: '320px', overflowY: 'auto', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--c-gray-100)', position: 'sticky', top: 0, background: '#fff' }}>
                      <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Code</th>
                      <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Wilaya</th>
                      <th style={{ textAlign: 'center', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Délai (jours)</th>
                      <th style={{ textAlign: 'center', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Actif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wilayas.slice(0, 15).map((w) => (
                      <tr key={w.id} style={{ borderBottom: '1px solid var(--c-gray-50)' }}>
                        <td style={{ padding: '6px 12px', color: 'var(--c-gray-500)' }}>{w.code}</td>
                        <td style={{ padding: '6px 12px', fontWeight: 500 }}>{w.name}</td>
                        <td style={{ padding: '6px 12px', textAlign: 'center' }}>
                          <select style={{ padding: '4px 6px', border: '1px solid var(--c-gray-100)', borderRadius: '4px', fontSize: '11px' }}>
                            <option>1-2</option>
                            <option selected>2-3</option>
                            <option>3-5</option>
                            <option>5-7</option>
                          </select>
                        </td>
                        <td style={{ padding: '6px 12px', textAlign: 'center' }}>
                          <input type="checkbox" defaultChecked style={{ accentColor: 'var(--c-yellow)' }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
            <Section title="Transporteurs">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {carriers.map((c) => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>{c.logo}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{c.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>{c.desc}</div>
                    </div>
                    <Toggle label="" checked={true} onChange={() => {}} />
                    <button style={{ padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', fontSize: '11px', fontWeight: 600, color: 'var(--c-gray-700)' }}>
                      Configuration
                    </button>
                  </div>
                ))}
              </div>
            </Section>
            <button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
            >
              <FiSave size={16} /> Enregistrer
            </button>
          </TabContent>
        );

      case 'payment':
        return (
          <TabContent>
            <Section title="Moyens de paiement">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>💵</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>Paiement à la livraison</div>
                    <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>Toujours activé</div>
                  </div>
                  <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-green-pale)', color: 'var(--c-green-deep)', fontSize: '11px', fontWeight: 600 }}>Activé</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--c-blue-pale)', color: 'var(--c-blue-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>💳</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>CIB</div>
                    <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>Paiement par carte bancaire</div>
                  </div>
                  <Toggle label="" checked={true} onChange={() => {}} />
                  <button style={{ padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', fontSize: '11px', fontWeight: 600, color: 'var(--c-gray-700)' }}>
                    Configurer
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--c-mint-pale)', color: 'var(--c-mint-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏦</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>Edahabia</div>
                    <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>Carte Edahabia</div>
                  </div>
                  <Toggle label="" checked={false} onChange={() => {}} />
                  <button style={{ padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', fontSize: '11px', fontWeight: 600, color: 'var(--c-gray-700)' }}>
                    Configurer
                  </button>
                </div>
              </div>
            </Section>
            <Section title="Configuration CIB">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Input label="Merchant ID" defaultValue="CHK-MER-001" />
                <Input label="Clé API" type="password" defaultValue="sk_live_xxxxxxxxxxxx" />
              </div>
            </Section>
            <button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
            >
              <FiSave size={16} /> Enregistrer
            </button>
          </TabContent>
        );

      case 'notifications':
        return (
          <TabContent>
            <Section title="Notifications email">
              {[
                { label: 'Nouvelle commande', key: 'new_order', checked: true },
                { label: 'Commande annulée', key: 'cancelled', checked: true },
                { label: 'Stock faible', key: 'low_stock', checked: true },
                { label: 'Rupture de stock', key: 'out_of_stock', checked: true },
                { label: 'Nouveau client inscrit', key: 'new_customer', checked: false },
                { label: 'Nouvel avis client', key: 'review', checked: false },
              ].map((n) => (
                <Toggle key={n.key} label={n.label} checked={n.checked} onChange={() => {}} />
              ))}
            </Section>
            <Section title="Notifications SMS">
              {[
                { label: 'Confirmation de commande', key: 'sms_confirm', checked: true },
                { label: 'Mise à jour statut', key: 'sms_status', checked: false },
              ].map((n) => (
                <Toggle key={n.key} label={n.label} checked={n.checked} onChange={() => {}} />
              ))}
            </Section>
            <Section title="Fournisseur SMS">
              <div style={{ maxWidth: '300px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Fournisseur</label>
                <select style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: '#fff' }}>
                  <option>Twilio</option>
                  <option>MessageBird</option>
                  <option>Nexmo</option>
                </select>
              </div>
            </Section>
            <button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
            >
              <FiSave size={16} /> Enregistrer
            </button>
          </TabContent>
        );

      case 'admins':
        return (
          <TabContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Comptes administrateurs
              </h3>
              <button
                onClick={() => setShowAddAdmin(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '8px 16px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 600, fontSize: '12px', border: 'none' }}
              >
                <FiPlus size={15} /> Ajouter
              </button>
            </div>
            <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--c-gray-100)' }}>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Admin</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Rôle</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Dernier accès</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Statut</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminAccounts.map((a) => (
                      <tr key={a.email} style={{ borderBottom: '1px solid var(--c-gray-50)' }}>
                        <td style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>{a.avatar}</div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '13px' }}>{a.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>{a.email}</div>
                          </div>
                        </td>
                        <td style={{ padding: '10px 16px', fontSize: '12px' }}>{a.role}</td>
                        <td style={{ padding: '10px 16px', fontSize: '12px', color: 'var(--c-gray-500)' }}>{a.lastAccess}</td>
                        <td style={{ padding: '10px 16px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: 'var(--radius-pill)', fontSize: '11px', fontWeight: 600, background: a.status === 'active' ? 'var(--c-green-pale)' : 'var(--c-gray-50)', color: a.status === 'active' ? 'var(--c-green-deep)' : 'var(--c-gray-500)' }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: a.status === 'active' ? 'var(--c-green)' : 'var(--c-gray-300)' }} />
                            {a.status === 'active' ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                          <button style={{ padding: '5px', borderRadius: '4px', color: 'var(--c-gray-500)', display: 'inline-flex' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-red-pale)'; e.currentTarget.style.color = 'var(--c-red)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {showAddAdmin && (
              <div style={{ marginTop: '16px', background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '16px' }}>Ajouter un administrateur</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <Input label="Nom complet" placeholder="Nom et prénom" />
                  <Input label="Email" type="email" placeholder="email@exemple.com" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Rôle</label>
                    <select style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: '#fff' }}>
                      <option>Super Admin</option>
                      <option>Gestionnaire</option>
                      <option>Commercial</option>
                      <option>Support</option>
                    </select>
                  </div>
                  <Input label="Mot de passe" type="password" placeholder="••••••••" />
                </div>
                <button onClick={() => { setShowAddAdmin(false); toast.success('Administrateur ajouté'); }} style={{ padding: '9px 20px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none' }}>
                  Ajouter
                </button>
              </div>
            )}
          </TabContent>
        );

      case 'appearance':
        return (
          <TabContent>
            <Section title="Apparence">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Couleur principale</label>
                  <input type="color" defaultValue="#F5C842" style={{ width: '48px', height: '38px', padding: '2px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Police</label>
                  <select style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: '#fff' }}>
                    <option>Poppins</option>
                    <option>Inter</option>
                    <option>Montserrat</option>
                    <option>Playfair Display</option>
                  </select>
                </div>
              </div>
              <Input label="Scripts personnalisés (head)" placeholder="<meta> tags, Google Analytics, etc." style={{ fontFamily: 'monospace', fontSize: '12px' }} />
            </Section>
            <button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
            >
              <FiSave size={16} /> Enregistrer
            </button>
          </TabContent>
        );

      case 'integrations':
        return (
          <TabContent>
            <Section title="Intégrations">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Google Analytics', desc: 'Suivi d\'audience et analytics' },
                  { name: 'Facebook Pixel', desc: 'Suivi des conversions et remarketing' },
                  { name: 'SendGrid', desc: 'Emails transactionnels' },
                  { name: 'Zendesk', desc: 'Support client' },
                ].map((int) => (
                  <div key={int.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{int.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>{int.desc}</div>
                    </div>
                    <Toggle label="" checked={false} onChange={() => {}} />
                    <button style={{ padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', fontSize: '11px', fontWeight: 600, color: 'var(--c-gray-700)' }}>
                      Configurer
                    </button>
                  </div>
                ))}
              </div>
            </Section>
            <button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
            >
              <FiSave size={16} /> Enregistrer
            </button>
          </TabContent>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)', fontFamily: 'var(--font-display)', marginBottom: '24px' }}>
        Paramètres
      </h1>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '2px', position: 'sticky', top: '88px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                fontSize: '13px', fontWeight: activeTab === tab.key ? 700 : 500,
                background: activeTab === tab.key ? 'var(--c-yellow)' : 'transparent',
                color: activeTab === tab.key ? 'var(--c-gray-900)' : 'var(--c-gray-700)',
                transition: 'all 0.15s', textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.key) { e.currentTarget.style.background = 'var(--c-gray-50)'; }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.key) { e.currentTarget.style.background = 'transparent'; }
              }}
            >
              <tab.icon size={17} />
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {renderTab()}
        </div>
      </div>
    </motion.div>
  );
}
