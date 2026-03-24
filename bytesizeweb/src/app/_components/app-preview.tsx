import Link from "next/link";

type Props = {
  title: string;
  coverImage?: string;
  releaseDate?: string;
  description?: string;
  platforms?: string[];
  slug: string;
};

export function AppPreview({
  title,
  coverImage,
  releaseDate,
  description,
  platforms,
  slug,
}: Props) {
  return (
    <div>
      {coverImage && (
        <div className="mb-5">
          <img
            className="rounded-lg w-50 object-cover"
            src={coverImage}
            alt={title}
          />
        </div>
      )}
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/apps/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      {platforms && platforms.length > 0 && (
        <div className="text-sm mb-2 text-gray-500">
          Available on: {platforms.join(", ")}
        </div>
      )}
      {releaseDate && (
        <div className="text-lg mb-4 text-gray-400">{releaseDate}</div>
      )}
      {description && (
        <p className="text-lg leading-relaxed mb-4">{description}</p>
      )}
    </div>
  );
}
