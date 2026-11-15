import { useState } from 'react';
import { Monitor } from 'lucide-react';
import './HeaderArtwork.css';

const HeaderArtwork = ({ src, className = '' }) => {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [failedSrc, setFailedSrc] = useState(null);

  if (failedSrc === src) {
    return <div className={`${className} header-artwork header-artwork-fallback`} aria-hidden="true"><Monitor size={72} strokeWidth={1} /><span>J4 / Digital studio</span></div>;
  }

  const responsive = src.endsWith('.webp');

  return (
    <div className={`${className} header-artwork${loadedSrc === src ? ' is-loaded' : ''}`} aria-hidden="true">
      <div className="header-artwork-entry">
        <img
          src={src}
          srcSet={responsive ? `${src.replace('.webp', '-480.webp')} 480w, ${src.replace('.webp', '-768.webp')} 768w, ${src} 1280w` : undefined}
          sizes={responsive ? '(max-width: 360px) calc(100vw - 32px), (max-width: 650px) 320px, (max-width: 800px) 380px, (max-width: 1280px) 40vw, 500px' : undefined}
          alt=""
          width={1280}
          height={853}
          decoding="async"
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
        />
      </div>
    </div>
  );
};

export default HeaderArtwork;
