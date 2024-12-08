import React, { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className = '', ...props }: ImageProps) {
  const [error, setError] = useState(false);
  const fallbackSrc = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=75';

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      {...props}
    />
  );
}