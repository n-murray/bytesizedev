import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllApps, getAppBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { AppHeader } from "@/app/_components/app-header";
import { MoreApps } from "@/app/_components/more-apps";
import markdownStyles from "../../markdown-styles.module.css";

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
        <article className="mb-32 max-w-2xl mx-auto">
          <AppHeader
            title={app.title}
            coverImage={app.coverImage || ""}
            releaseDate={app.releaseDate}
            platforms={app.platforms}
          />
          <div
            className={markdownStyles["markdown"]}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="mt-10 p-6 bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-slate-600 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
            <p className="mb-3 text-sm">
              For support or questions about this app, contact us at:
            </p>
            <a
              href="mailto:info@bytesizedev.ie"
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              info@bytesizedev.ie
            </a>
            <span className="mx-2 text-neutral-400">·</span>
            <a href="/support" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Visit support page →
            </a>
          </div>
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
