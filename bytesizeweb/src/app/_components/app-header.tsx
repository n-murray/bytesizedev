type Props = {
  title: string;
  coverImage?: string;
  releaseDate?: string;
  platforms?: string[];
};

export function AppHeader({ title, coverImage, releaseDate, platforms }: Props) {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tight leading-tight">
        {title}
      </h1>
      {platforms && platforms.length > 0 && (
        <div className="mt-2 text-lg text-gray-400">
          Available on: {platforms.join(", ")}
        </div>
      )}
      {releaseDate && (
        <div className="mt-2 text-lg text-gray-400">Released {releaseDate}</div>
      )}
      {coverImage && (
        <div className="mt-8 mb-8">
          <img
            className="rounded-lg w-full object-cover"
            src={coverImage}
            alt={title}
          />
        </div>
      )}
    </>
  );
}
