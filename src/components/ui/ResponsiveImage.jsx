/**
 * <img> com srcSet, dimensões reais (evita "pulos" de layout) e lazy loading.
 * `image` vem de src/data/images.js. Use `priority` só na imagem principal da hero.
 */
export default function ResponsiveImage({ image, alt, sizes = '100vw', priority = false, className, ...props }) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      {...props}
    />
  )
}
