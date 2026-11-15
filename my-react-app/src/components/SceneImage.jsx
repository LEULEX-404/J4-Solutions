import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import './SceneImage.css';

export default function SceneImage({ src, alt, loading = 'lazy', ...props }) {
  const [failedSrc, setFailedSrc] = useState(null);
  if (failedSrc === src) return <span className="scene-image-fallback" role="img" aria-label={alt}><ImageIcon aria-hidden="true" size={48} strokeWidth={1} /></span>;
  return <img {...props} src={src} alt={alt} loading={loading} decoding="async" onError={() => setFailedSrc(src)} />;
}
