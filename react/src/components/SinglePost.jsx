export default function SinglePost({ post, onOpen }) {
  const { id, url } = post;
  const title = (id || '').split('____')[1] || 'Untitled';

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' ? onOpen?.() : null)}
      className="group relative cursor-zoom-in overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={url}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="line-clamp-1 text-sm font-semibold text-white drop-shadow">{title}</p>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 dark:bg-gray-800/90 px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 shadow">
          Photo
        </span>
      </div>
    </article>
  );
}
