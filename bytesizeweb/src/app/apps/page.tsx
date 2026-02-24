import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { getAllApps } from "@/lib/api";
import { AppPreview } from "@/app/_components/app-preview";
import { MoreApps } from "@/app/_components/more-apps";

export default function AppsPage() {
  const apps = getAllApps();
  const featured = apps[0];
  const others = apps.slice(1);

  return (
    <main>
      <Container>
        <Header />
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-4">My Apps</h2>
          <p className="text-lg">
            This section showcases the various applications I&rsquo;ve built.  Each
            entry includes a description, screenshots and the required privacy
            policy information for distribution.
          </p>
        </section>

        {featured && (
          <div className="mb-20">
            <AppPreview
              title={featured.title}
              coverImage={featured.coverImage || ""}
              releaseDate={featured.releaseDate || ""}
              description={featured.description || ""}
              platforms={featured.platforms}
              slug={featured.slug}
            />
          </div>
        )}

        {others.length > 0 && <MoreApps apps={others} />}
      </Container>
    </main>
  );
}
