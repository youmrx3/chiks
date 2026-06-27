import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      login();
      navigate('/admin/dashboard');
      toast.success('Bienvenue, Rania !');
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--c-offwhite)',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--c-white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-modal)',
          padding: '48px 40px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--c-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--c-gray-900)',
            }}
          >
            C
          </div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--c-gray-900)',
              marginBottom: '6px',
              fontFamily: 'var(--font-display)',
            }}
          >
            Espace administrateur
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--c-gray-500)' }}>
            Connectez-vous pour gérer votre boutique
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--c-gray-700)',
                marginBottom: '6px',
              }}
            >
              Adresse email
            </label>
            <div style={{ position: 'relative' }}>
              <FiMail
                size={17}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--c-gray-500)',
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rania@chicks.dz"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '1px solid var(--c-gray-100)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--c-gray-900)',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--c-gray-700)',
                marginBottom: '6px',
              }}
            >
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <FiLock
                size={17}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--c-gray-500)',
                }}
              />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 40px',
                  border: '1px solid var(--c-gray-100)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--c-gray-900)',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--c-gray-500)',
                  display: 'flex',
                  padding: '4px',
                }}
              >
                {showPw ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'var(--c-gray-700)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                style={{ accentColor: 'var(--c-yellow)', width: '15px', height: '15px' }}
              />
              Se souvenir de moi
            </label>
            <button
              type="button"
              style={{
                fontSize: '12px',
                color: 'var(--c-yellow-deep)',
                fontWeight: 600,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--radius-pill)',
              background: loading ? 'var(--c-gray-300)' : 'var(--c-yellow)',
              color: 'var(--c-gray-900)',
              fontSize: '15px',
              fontWeight: 700,
              border: 'none',
              transition: 'all 0.15s',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = 'var(--c-yellow-hover)';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.background = 'var(--c-yellow)';
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--c-gray-100)',
            textAlign: 'center',
            fontSize: '11px',
            color: 'var(--c-gray-500)',
          }}
        >
          CHICKS™ — BackOffice v1.0
        </div>
      </motion.div>
    </div>
  );
}
