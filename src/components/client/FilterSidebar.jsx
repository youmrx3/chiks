import { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import SizeChip from './SizeChip';
import ColorSwatch from './ColorSwatch';

const CATEGORIES = [
  { name: 'Knitwear', count: 8 },
  { name: 'Manteaux', count: 6 },
  { name: 'Nouveaux-nés', count: 5 },
  { name: 'Tout-petits', count: 5 },
  { name: 'Enfants', count: 4 },
  { name: 'Accessoires', count: 2 },
];

const AGES = ['0-3m', '3-6m', '6-12m', '12-18m', '18-24m', '2-3y', '3-4y', '4-5y', '5-6y', '6-7y', '7-8y'];

const GENDERS = [
  { value: 'fille', label: 'Fille' },
  { value: 'garçon', label: 'Garçon' },
  { value: 'unisex', label: 'Mixte' },
];

const COLORS = [
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Noir', hex: '#1A1A1A' },
  { name: 'Gris', hex: '#808080' },
  { name: 'Beige', hex: '#D4C5A9' },
  { name: 'Jaune', hex: '#F5C842' },
  { name: 'Rose', hex: '#E8B4B8' },
  { name: 'Rouge', hex: '#C62828' },
  { name: 'Bleu', hex: '#2162A3' },
  { name: 'Vert', hex: '#2E7D5E' },
  { name: 'Bordeaux', hex: '#6E2639' },
  { name: 'Corail', hex: '#E8706A' },
  { name: 'Lavande', hex: '#C3B1E1' },
];

const SIZES = ['0-3m', '3-6m', '6-12m', '12-18m', '18-24m', '2-3y', '3-4y', '4-5y', '5-6y', '6-7y', '7-8y'];

export default function FilterSidebar({ filters = {}, onFilterChange, onClear }) {
  const [localFilters, setLocalFilters] = useState({
    categories: [],
    ages: [],
    genders: [],
    priceMin: 0,
    priceMax: 10000,
    colors: [],
    sizes: [],
    inStock: false,
    minRating: 0,
    ...filters,
  });

  const update = (key, value) => {
    const next = { ...localFilters, [key]: value };
    setLocalFilters(next);
  };

  const toggleArray = (key, item) => {
    const arr = localFilters[key] || [];
    const next = arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
    update(key, next);
  };

  const handleApply = () => {
    if (onFilterChange) onFilterChange(localFilters);
  };

  const handleClear = () => {
    const cleared = { categories: [], ages: [], genders: [], priceMin: 0, priceMax: 10000, colors: [], sizes: [], inStock: false, minRating: 0 };
    setLocalFilters(cleared);
    if (onClear) onClear();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Categories */}
      <section>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--c-gray-900)', marginBottom: 12 }}>Catégories</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {CATEGORIES.map((cat) => (
            <label key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
              <input
                type="checkbox"
                checked={localFilters.categories.includes(cat.name)}
                onChange={() => toggleArray('categories', cat.name)}
                style={{ accentColor: 'var(--c-yellow)', width: 16, height: 16, cursor: 'pointer' }}
              />
              <span>{cat.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--c-gray-500)' }}>({cat.count})</span>
            </label>
          ))}
        </div>
      </section>

      {/* Age */}
      <section>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--c-gray-900)', marginBottom: 12 }}>Âge</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {AGES.map((age) => (
            <label key={age} style={{
              padding: '6px 12px', borderRadius: 'var(--radius-pill)',
              border: `1px solid ${localFilters.ages.includes(age) ? 'var(--c-yellow)' : 'var(--c-gray-100)'}`,
              background: localFilters.ages.includes(age) ? 'var(--c-yellow-pale)' : 'transparent',
              fontSize: 11, fontWeight: 500, color: localFilters.ages.includes(age) ? 'var(--c-yellow-deep)' : 'var(--c-gray-700)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              <input type="checkbox" checked={localFilters.ages.includes(age)} onChange={() => toggleArray('ages', age)} style={{ display: 'none' }} />
              {age}
            </label>
          ))}
        </div>
      </section>

      {/* Gender */}
      <section>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--c-gray-900)', marginBottom: 12 }}>Genre</h4>
        <div style={{ display: 'flex', gap: 6 }}>
          {GENDERS.map((g) => (
            <button
              key={g.value}
              onClick={() => {
                const next = localFilters.genders.includes(g.value)
                  ? localFilters.genders.filter((i) => i !== g.value)
                  : [g.value];
                update('genders', next);
              }}
              style={{
                flex: 1, height: 36, borderRadius: 'var(--radius-pill)',
                border: `1px solid ${localFilters.genders.includes(g.value) ? 'var(--c-yellow)' : 'var(--c-gray-100)'}`,
                background: localFilters.genders.includes(g.value) ? 'var(--c-yellow-pale)' : 'var(--c-white)',
                fontSize: 'var(--text-xs)', fontWeight: 600,
                color: localFilters.genders.includes(g.value) ? 'var(--c-yellow-deep)' : 'var(--c-gray-700)',
                transition: 'all 0.2s',
              }}
            >
              {g.label}
            </button>
          ))}
        </div>
      </section>

      {/* Price */}
      <section>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--c-gray-900)', marginBottom: 12 }}>Prix</h4>
        <PriceRangeSlider
          min={0}
          max={10000}
          valueMin={localFilters.priceMin}
          valueMax={localFilters.priceMax}
          onChangeMin={(v) => update('priceMin', v)}
          onChangeMax={(v) => update('priceMax', v)}
        />
      </section>

      {/* Colors */}
      <section>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--c-gray-900)', marginBottom: 12 }}>Couleurs</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLORS.map((c) => (
            <ColorSwatch
              key={c.hex}
              color={c.hex}
              name={c.name}
              selected={localFilters.colors.includes(c.name)}
              onClick={() => toggleArray('colors', c.name)}
            />
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--c-gray-900)', marginBottom: 12 }}>Tailles</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SIZES.map((s) => (
            <SizeChip
              key={s}
              size={s}
              selected={localFilters.sizes.includes(s)}
              onClick={() => toggleArray('sizes', s)}
            />
          ))}
        </div>
      </section>

      {/* In Stock */}
      <section>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
          <input
            type="checkbox"
            checked={localFilters.inStock}
            onChange={() => update('inStock', !localFilters.inStock)}
            style={{ accentColor: 'var(--c-yellow)', width: 16, height: 16, cursor: 'pointer' }}
          />
          En stock uniquement
        </label>
      </section>

      {/* Reviews */}
      <section>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--c-gray-900)', marginBottom: 12 }}>Avis clients</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { value: 4, label: '★★★★+', text: '4 étoiles et plus' },
            { value: 3, label: '★★★+', text: '3 étoiles et plus' },
            { value: 2, label: '★★+', text: '2 étoiles et plus' },
          ].map((r) => (
            <label key={r.value} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
              <input
                type="radio"
                name="minRating"
                checked={localFilters.minRating === r.value}
                onChange={() => update('minRating', r.value)}
                style={{ accentColor: 'var(--c-yellow)', width: 16, height: 16, cursor: 'pointer' }}
              />
              <span>{r.label}</span>
              <span style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>({r.text})</span>
            </label>
          ))}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
            <input
              type="radio"
              name="minRating"
              checked={localFilters.minRating === 0}
              onChange={() => update('minRating', 0)}
              style={{ accentColor: 'var(--c-yellow)', width: 16, height: 16, cursor: 'pointer' }}
            />
            <span>Tous les avis</span>
          </label>
        </div>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        <button
          onClick={handleApply}
          style={{
            width: '100%', height: 44, borderRadius: 'var(--radius-pill)',
            background: 'var(--c-yellow)', color: 'var(--c-gray-900)',
            fontWeight: 700, fontSize: 'var(--text-sm)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
        >
          Appliquer les filtres
        </button>
        <button
          onClick={handleClear}
          style={{
            width: '100%', height: 40, borderRadius: 'var(--radius-pill)',
            color: 'var(--c-gray-500)', fontWeight: 500, fontSize: 'var(--text-xs)',
            transition: 'color 0.2s',
          }}
        >
          Effacer tout
        </button>
      </div>
    </div>
  );
}
