import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import './SceneImage.css';

export default function SceneImage({ src, alt, loading = 'lazy', sizes = '(max-width: 650px) calc(100vw - 40px), (max-width: 900px) 90vw, 600px', ...props }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const responsive = /^\/images\/j4\/(home|services|work|about|contact)\/\d{2}-.*\.webp$/.test(src);
  const base = src.replace('/images/j4/', '/images/j4/responsive/').replace('.webp', '');
  if (failedSrc === src) return <span className="scene-image-fallback" role="img" aria-label={alt}><ImageIcon aria-hidden="true" size={48} strokeWidth={1} /></span>;
  return <img srcSet={responsive ? `${base}-640.webp 640w, ${base}-960.webp 960w, ${src} 1536w` : undefined} sizes={responsive ? sizes : undefined} {...props} src={src} alt={alt} loading={loading} decoding="async" onError={() => setFailedSrc(src)} />;
}
