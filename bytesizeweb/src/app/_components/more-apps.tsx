import { App } from "@/interfaces/app";
import { AppPreview } from "./app-preview";

type Props = {
  apps: App[];
};

export function MoreApps({ apps }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Apps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {apps.map((app) => (
          <AppPreview
            key={app.slug}
            title={app.title}
            coverImage={app.coverImage || ""}
            releaseDate={app.releaseDate || ""}
            description={app.description || ""}
            platforms={app.platforms}
            slug={app.slug}
          />
        ))}
      </div>
    </section>
  );
}
