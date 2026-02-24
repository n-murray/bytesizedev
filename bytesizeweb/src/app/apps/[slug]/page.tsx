import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllApps, getAppBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { AppHeader } from "@/app/_components/app-header";
import { MoreApps } from "@/app/_components/more-apps";

export default async function AppPage(props: Params) {
  const params = await props.params;
  const app = getAppBySlug(params.slug);
  const allApps = getAllApps().slice(0, 4);
  const otherApps = allApps.filter((a) => a.slug !== params.slug);

  if (!app) {
    return notFound();
  }

  const content = await markdownToHtml(app.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <AppHeader
            title={app.title}
            coverImage={app.coverImage || ""}
            releaseDate={app.releaseDate}
            platforms={app.platforms}
          />
          <div
            className="prose dark:prose-dark max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {app.privacyContent && (
            <p className="mt-8">
              <a
                href={`/apps/${app.slug}/privacy`}
                className="text-blue-500 hover:underline"
              >
                View privacy policy →
              </a>
            </p>
          )}
        </article>
        {otherApps.length > 0 && <MoreApps apps={otherApps} />}
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const app = getAppBySlug(params.slug);

  if (!app) {
    return notFound();
  }

  const title = `${app.title} | ByteSizeDev`;

  return {
    title,
    openGraph: {
      title,
      images: app.coverImage ? [app.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const apps = getAllApps();

  return apps.map((app) => ({ slug: app.slug }));
}
