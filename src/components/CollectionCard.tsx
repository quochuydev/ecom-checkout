export default function CollectionCard({ collection }: any) {
  return (
    <div className="group relative">
      <div className="sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
        <img
          src={collection.image?.src}
          alt={collection.image?.alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-6 text-sm text-gray-500">
        <a href={collection.href}>
          <span className="absolute inset-0" />
          {collection.name}
        </a>
      </h3>
      <p className="text-base font-semibold text-gray-900">
        {collection.description}
      </p>
    </div>
  );
}
