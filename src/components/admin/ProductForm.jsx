import { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import ImageUploadZone from './ImageUploadZone';
import StockBadge from './StockBadge';

const defaultSizes = ['0-3m', '3-6m', '6-12m', '12-18m', '18-24m', '2-3y', '3-4y', '4-5y', '5-6y', '6-7y'];
const categories = ['Knitwear', 'Manteaux', 'Nouveaux-nés', 'Tout-petits', 'Enfants', 'Accessoires'];
const ageRanges = ['0-3m', '3-6m', '6-12m', '12-18m', '18-24m', '2-3y', '3-4y', '4-5y', '5-6y', '6-7y', '7-8y'];
const materials = ['100% coton biologique', '100% coton peigné biologique', '100% polyester', '100% coton', '80% coton, 20% polyester', '70% laine, 30% coton', '50% laine mérinos, 50% coton biologique'];
const washInstructions = ['Lavage à 30°C', 'Lavage à 30°C, ne pas essorer', 'Lavage à 30°C, séchage à plat', 'Lavage à 30°C, programme laine', 'Lavage à 30°C, retourner avant lavage', 'Lavage à 40°C', 'Nettoyage à sec recommandé'];

function Input({ label, error, ...props }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>
        {label}
      </label>
      <input
        {...props}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${error ? 'var(--c-red)' : 'var(--c-gray-100)'}`,
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          color: 'var(--c-gray-900)',
          background: '#fff',
          transition: 'border-color 0.15s',
          ...props.style,
        }}
        onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
        onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
      />
      {error && <div style={{ fontSize: '11px', color: 'var(--c-red)', marginTop: '2px' }}>{error}</div>}
    </div>
  );
}

function Select({ label, options, error, ...props }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>
        {label}
      </label>
      <select
        {...props}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${error ? 'var(--c-red)' : 'var(--c-gray-100)'}`,
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          color: 'var(--c-gray-900)',
          background: '#fff',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
        onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
      >
        <option value="">Sélectionner...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <div style={{ fontSize: '11px', color: 'var(--c-red)', marginTop: '2px' }}>{error}</div>}
    </div>
  );
}

function TagsInput({ tags, onChange, placeholder = 'Tapez Enter pour ajouter' }) {
  const [input, setInput] = useState('');

  const addTag = () => {
    const tag = input.trim().toLowerCase().replace(/\s+/g, '-');
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInput('');
  };

  const removeTag = (idx) => {
    onChange(tags.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          padding: '6px 8px',
          border: '1px solid var(--c-gray-100)',
          borderRadius: 'var(--radius-sm)',
          minHeight: '38px',
          alignItems: 'center',
        }}
      >
        {tags.map((tag, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--c-yellow-pale)',
              color: 'var(--c-yellow-deep)',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {tag}
            <button onClick={() => removeTag(i)} style={{ display: 'flex', padding: 0, color: 'inherit', fontSize: '14px', lineHeight: 1 }}>
              <FiX size={12} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); addTag(); }
            if (e.key === 'Backspace' && !input && tags.length > 0) {
              removeTag(tags.length - 1);
            }
          }}
          placeholder={tags.length === 0 ? placeholder : ''}
          style={{ border: 'none', outline: 'none', fontSize: '13px', flex: 1, minWidth: '80px', padding: '2px 0' }}
        />
      </div>
    </div>
  );
}

export default function ProductForm({ product, onSubmit, onCancel }) {
  const isEdit = !!product;

  const [form, setForm] = useState({
    name: '',
    nameAr: '',
    description: '',
    category: '',
    gender: 'unisex',
    price: '',
    salePrice: '',
    sku: '',
    weight: '',
    ageRange: '',
    material: '',
    washInstruction: '',
    tags: [],
    isActive: true,
    isBestseller: false,
    isNew: false,
    sizes: [],
    colors: [],
    stockPerSize: {},
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#F5C842');
  const [newSize, setNewSize] = useState('');

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        nameAr: product.nameAr || '',
        description: product.description || '',
        category: product.category || '',
        gender: product.gender || 'unisex',
        price: product.price?.toString() || '',
        salePrice: product.salePrice?.toString() || '',
        sku: product.sku || '',
        weight: product.weight?.toString() || '',
        ageRange: product.ageRange || '',
        material: product.material || '',
        washInstruction: product.washInstruction || '',
        tags: product.tags || [],
        isActive: product.isActive ?? true,
        isBestseller: product.isBestseller ?? false,
        isNew: product.isNew ?? false,
        sizes: product.sizes || [],
        colors: product.colors || [],
        stockPerSize: product.stockPerSize || {},
        images: product.images ? product.images.map((img) => ({ preview: img })) : [],
      });
    }
  }, [product]);

  const update = useCallback((key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (submitted) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }, [submitted]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Requis';
    if (!form.description.trim()) errs.description = 'Requis';
    if (!form.category) errs.category = 'Requis';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = 'Prix invalide';
    if (!form.sku.trim()) errs.sku = 'Requis';
    return errs;
  };

  const handleSubmit = (status) => {
    const errs = validate();
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length > 0) return;

    const data = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      weight: form.weight ? Number(form.weight) : null,
      isActive: status === 'publish' ? true : form.isActive,
      sizes: form.sizes,
      stockPerSize: form.stockPerSize,
      colors: form.colors,
      tags: form.tags,
    };
    if (onSubmit) onSubmit(data, status);
  };

  const addColor = () => {
    if (newColorName.trim()) {
      update('colors', [...form.colors, { name: newColorName.trim(), hex: newColorHex }]);
      setNewColorName('');
      setNewColorHex('#F5C842');
    }
  };

  const removeColor = (idx) => {
    update('colors', form.colors.filter((_, i) => i !== idx));
  };

  const addSize = () => {
    if (newSize && !form.sizes.includes(newSize)) {
      const nextSizes = [...form.sizes, newSize];
      update('sizes', nextSizes);
      update('stockPerSize', { ...form.stockPerSize, [newSize]: 0 });
      setNewSize('');
    }
  };

  const removeSize = (size) => {
    update('sizes', form.sizes.filter((s) => s !== size));
    const next = { ...form.stockPerSize };
    delete next[size];
    update('stockPerSize', next);
  };

  const updateStockQty = (size, qty) => {
    update('stockPerSize', { ...form.stockPerSize, [size]: Math.max(0, Number(qty) || 0) });
  };

  const totalStock = Object.values(form.stockPerSize).reduce((a, b) => a + (Number(b) || 0), 0);

  const seoTitle = form.name ? `${form.name} — CHICKS™` : 'CHICKS™';
  const seoDesc = form.description
    ? form.description.slice(0, 120) + (form.description.length > 120 ? '...' : '')
    : 'Description du produit';

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', position: 'relative' }}>
      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Informations de base */}
        <Section title="Informations de base">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Input label="Nom du produit *" value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} placeholder="Combinaison Tricot Ours" />
            <Input label="Nom en arabe" value={form.nameAr} onChange={(e) => update('nameAr', e.target.value)} placeholder="بدلة الدب المحبوكة" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${errors.description ? 'var(--c-red)' : 'var(--c-gray-100)'}`,
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                color: 'var(--c-gray-900)',
                background: '#fff',
                resize: 'vertical',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => { if (!errors.description) e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
              onBlur={(e) => { if (!errors.description) e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
            />
            {errors.description && <div style={{ fontSize: '11px', color: 'var(--c-red)', marginTop: '2px' }}>{errors.description}</div>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Select label="Catégorie *" value={form.category} onChange={(e) => update('category', e.target.value)} options={categories} error={errors.category} />
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Genre</label>
              <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
                {['unisex', 'fille', 'garçon'].map((g) => (
                  <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="gender"
                      checked={form.gender === g}
                      onChange={() => update('gender', g)}
                      style={{ accentColor: 'var(--c-yellow)' }}
                    />
                    {g === 'unisex' ? 'Unisexe' : g === 'fille' ? 'Fille' : 'Garçon'}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Médias */}
        <Section title="Médias">
          <ImageUploadZone
            images={form.images}
            onChange={(imgs) => update('images', imgs)}
            maxImages={8}
          />
        </Section>

        {/* Prix et stock */}
        <Section title="Prix et stock">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0 16px' }}>
            <Input label="Prix (DA) *" type="number" min="0" value={form.price} onChange={(e) => update('price', e.target.value)} error={errors.price} placeholder="3200" />
            <Input label="Prix promo (DA)" type="number" min="0" value={form.salePrice} onChange={(e) => update('salePrice', e.target.value)} placeholder="2500" />
            <Input label="SKU *" value={form.sku} onChange={(e) => update('sku', e.target.value)} error={errors.sku} placeholder="CHK-KNT-001" />
            <Input label="Poids (g)" type="number" min="0" value={form.weight} onChange={(e) => update('weight', e.target.value)} placeholder="280" />
          </div>
        </Section>

        {/* Tailles et stock par taille */}
        <Section title="Tailles et stock par taille">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <select
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              style={{
                flex: 1, padding: '8px 12px', border: '1px solid var(--c-gray-100)',
                borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)',
              }}
            >
              <option value="">Ajouter une taille...</option>
              {defaultSizes.filter((s) => !form.sizes.includes(s)).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={addSize}
              disabled={!newSize}
              style={{
                padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                background: newSize ? 'var(--c-yellow)' : 'var(--c-gray-100)',
                color: newSize ? 'var(--c-gray-900)' : 'var(--c-gray-500)',
                fontWeight: 600, fontSize: '13px',
                display: 'flex', alignItems: 'center', gap: '4px',
                transition: 'opacity 0.15s',
              }}
            >
              <FiPlus size={16} /> Ajouter
            </button>
          </div>

          {form.sizes.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--c-gray-500)', fontSize: '13px', border: '1px dashed var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
              Aucune taille ajoutée. Sélectionnez une taille ci-dessus.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--c-gray-100)' }}>
                    <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Taille</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Quantité</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Statut</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {form.sizes.map((size) => (
                    <tr key={size} style={{ borderBottom: '1px solid var(--c-gray-50)' }}>
                      <td style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 500 }}>{size}</td>
                      <td style={{ padding: '8px 12px' }}>
                        <input
                          type="number"
                          min="0"
                          value={form.stockPerSize[size] ?? 0}
                          onChange={(e) => updateStockQty(size, e.target.value)}
                          style={{ width: '70px', padding: '4px 8px', border: '1px solid var(--c-gray-100)', borderRadius: '6px', fontSize: '13px' }}
                        />
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <StockBadge qty={Number(form.stockPerSize[size]) || 0} />
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <button onClick={() => removeSize(size)} style={{ color: 'var(--c-gray-500)', padding: '4px', borderRadius: '4px', display: 'flex' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--c-red)'; e.currentTarget.style.background = 'var(--c-red-pale)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--c-gray-500)'; e.currentTarget.style.background = 'transparent'; }}
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* Couleurs disponibles */}
        <Section title="Couleurs disponibles">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--c-gray-500)', marginBottom: '2px' }}>Nom</label>
              <input
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Miel"
                style={{ padding: '8px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', width: '140px' }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addColor(); } }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--c-gray-500)', marginBottom: '2px' }}>Couleur</label>
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                style={{ width: '38px', height: '38px', padding: '2px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
              />
            </div>
            <button
              onClick={addColor}
              disabled={!newColorName.trim()}
              style={{
                padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                background: newColorName.trim() ? 'var(--c-yellow)' : 'var(--c-gray-100)',
                color: newColorName.trim() ? 'var(--c-gray-900)' : 'var(--c-gray-500)',
                fontWeight: 600, fontSize: '13px',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              <FiPlus size={16} /> Ajouter
            </button>
          </div>

          {form.colors.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--c-gray-500)', fontSize: '13px', border: '1px dashed var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
              Aucune couleur ajoutée.
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {form.colors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 10px', borderRadius: 'var(--radius-pill)',
                    background: 'var(--c-gray-50)', fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: c.hex, border: '1px solid var(--c-gray-100)', flexShrink: 0 }} />
                  {c.name}
                  <button onClick={() => removeColor(i)} style={{ display: 'flex', padding: 0, color: 'var(--c-gray-500)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-red)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--c-gray-500)'}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Informations complémentaires */}
        <Section title="Informations complémentaires">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Select label="Tranche d'âge" value={form.ageRange} onChange={(e) => update('ageRange', e.target.value)} options={ageRanges} />
            <Select label="Matière" value={form.material} onChange={(e) => update('material', e.target.value)} options={materials} />
          </div>
          <Select label="Instruction de lavage" value={form.washInstruction} onChange={(e) => update('washInstruction', e.target.value)} options={washInstructions} />
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Tags</label>
            <TagsInput tags={form.tags} onChange={(tags) => update('tags', tags)} />
          </div>
        </Section>
      </div>

      {/* Sidebar */}
      <div style={{ width: '280px', flexShrink: 0, position: 'sticky', top: '88px' }}>
        {/* Status toggles */}
        <SidebarSection title="Statut">
          <ToggleRow label="Actif" checked={form.isActive} onChange={(v) => update('isActive', v)} />
          <ToggleRow label="Bestseller" checked={form.isBestseller} onChange={(v) => update('isBestseller', v)} />
          <ToggleRow label="Nouveau" checked={form.isNew} onChange={(v) => update('isNew', v)} />
        </SidebarSection>

        {/* SEO Preview */}
        <SidebarSection title="Aperçu SEO">
          <div
            style={{
              padding: '10px', borderRadius: 'var(--radius-sm)',
              background: 'var(--c-gray-50)', fontSize: '12px',
            }}
          >
            <div style={{ color: '#1a0aab', fontWeight: 600, fontSize: '14px', marginBottom: '2px', wordBreak: 'break-all' }}>
              {seoTitle}
            </div>
            <div style={{ color: '#006d21', fontSize: '12px', marginBottom: '4px' }}>
              {window.location.origin}/produit/{form.name?.toLowerCase().replace(/\s+/g, '-') || 'slug'}
            </div>
            <div style={{ color: 'var(--c-gray-700)', fontSize: '12px', lineHeight: 1.4 }}>
              {seoDesc}
            </div>
          </div>
        </SidebarSection>

        {/* Stock summary */}
        <SidebarSection title="Résumé stock">
          <div style={{ fontSize: '13px', color: 'var(--c-gray-700)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Total</span>
              <span style={{ fontWeight: 700 }}>{totalStock} unités</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Tailles</span>
              <span>{form.sizes.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Couleurs</span>
              <span>{form.colors.length}</span>
            </div>
          </div>
        </SidebarSection>
      </div>

      {/* Sticky bottom bar */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: 'var(--c-white)', borderTop: '1px solid var(--c-gray-100)',
          padding: '12px 24px', display: 'flex', justifyContent: 'flex-end',
          gap: '10px', zIndex: 50,
          boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <button
          onClick={onCancel}
          style={{
            padding: '10px 20px', borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--c-gray-100)', background: 'transparent',
            color: 'var(--c-gray-700)', fontSize: '13px', fontWeight: 600,
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Annuler
        </button>
        <button
          onClick={() => handleSubmit('draft')}
          style={{
            padding: '10px 20px', borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--c-gray-100)', background: 'transparent',
            color: 'var(--c-gray-700)', fontSize: '13px', fontWeight: 600,
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <FiSave size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Enregistrer brouillon
        </button>
        <button
          onClick={() => handleSubmit('publish')}
          style={{
            padding: '10px 24px', borderRadius: 'var(--radius-pill)',
            background: 'var(--c-yellow)', color: 'var(--c-gray-900)',
            fontSize: '13px', fontWeight: 700, border: 'none',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
        >
          {isEdit ? 'Mettre à jour' : 'Publier'}
        </button>
      </div>

      <div style={{ height: '68px', width: '100%' }} />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div
      style={{
        background: 'var(--c-white)',
        borderRadius: 'var(--radius-md)',
        padding: '20px 24px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '16px',
      }}
    >
      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function SidebarSection({ title, children }) {
  return (
    <div
      style={{
        background: 'var(--c-white)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '12px',
      }}
    >
      <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-gray-500)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
      <span style={{ fontSize: '13px', color: 'var(--c-gray-700)' }}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: '40px', height: '22px', borderRadius: '11px',
          background: checked ? 'var(--c-yellow)' : 'var(--c-gray-100)',
          position: 'relative', transition: 'background 0.2s',
          border: 'none', padding: 0,
        }}
      >
        <span
          style={{
            position: 'absolute', top: '2px', width: '18px', height: '18px',
            borderRadius: '50%', background: '#fff',
            left: checked ? '20px' : '2px',
            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          }}
        />
      </button>
    </div>
  );
}
