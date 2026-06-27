import { useRef, useState, useCallback } from 'react';
import { FiUpload, FiX, FiMove } from 'react-icons/fi';

export default function ImageUploadZone({ images = [], onChange, maxImages = 8 }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback((fileList) => {
    const files = Array.from(fileList).filter((f) =>
      ['image/jpeg', 'image/png', 'image/webp'].includes(f.type)
    );
    if (files.length === 0) return;

    const remaining = maxImages - images.length;
    const toAdd = files.slice(0, remaining);

    Promise.all(
      toAdd.map(
        (f) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve({ file: f, preview: e.target.result });
            reader.readAsDataURL(f);
          })
      )
    ).then((newImages) => {
      onChange([...images, ...newImages]);
    });
  }, [images, onChange, maxImages]);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      e.target.value = '';
    }
  };

  const removeImage = (idx) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const canAdd = images.length < maxImages;

  return (
    <div>
      {/* Drag zone */}
      <div
        onClick={canAdd ? handleClick : undefined}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `2px dashed ${dragOver ? 'var(--c-yellow)' : 'var(--c-gray-300)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: canAdd ? 'pointer' : 'default',
          background: dragOver ? 'var(--c-yellow-pale)' : 'var(--c-gray-50)',
          transition: 'all 0.15s',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '32px', color: dragOver ? 'var(--c-yellow)' : 'var(--c-gray-500)', marginBottom: '8px' }}>
          <FiUpload size={32} style={{ display: 'inline' }} />
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>
          Glissez vos images ici ou cliquez pour parcourir
        </div>
        <div style={{ fontSize: '12px', color: 'var(--c-gray-500)' }}>
          JPG, PNG ou WEBP ({images.length}/{maxImages})
        </div>
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                width: '100px',
                height: '100px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '2px solid var(--c-gray-100)',
              }}
            >
              <img
                src={img.preview || img}
                alt={`Image ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute', top: '4px', left: '4px',
                  color: '#fff', fontSize: '10px',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '2px 6px', borderRadius: '4px',
                }}
              >
                <FiMove size={12} style={{ display: 'inline', marginRight: '2px' }} />
                {idx === 0 && <span style={{ fontWeight: 700 }}>Image principale</span>}
              </div>
              <button
                onClick={() => removeImage(idx)}
                style={{
                  position: 'absolute', top: '4px', right: '4px',
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-red)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; }}
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
