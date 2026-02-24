import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAppBySlug, getAllApps } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export default async function PrivacyPage(props: Params) {
  const params = await props.params;
  const app = getAppBySlug(params.slug);

  if (!app) {
    return notFound();
  }

  // if no privacy section, show notFound
  if (!app.privacyContent) {
    return notFound();
  }

  const content = await markdownToHtml(app.privacyContent);

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <h1 className="text-4xl font-bold mb-6">
          {app.title} Privacy Policy
        </h1>
        <div className="mb-8">
          <a href={`/apps/${app.slug}`} className="text-blue-500 hover:underline">
            ← Back to {app.title}
          </a>
        </div>
        <div
          className="prose dark:prose-dark max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        </article>
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

  if (!app || !app.privacyContent) {
    return notFound();
  }

  const title = `${app.title} Privacy Policy | ByteSizeDev`;

  return {
    title,
  };
}

export async function generateStaticParams() {
  const apps = getAllApps();

  // only generate params for apps that have a privacy section
  return apps
    .filter((a) => !!a.privacyContent)
    .map((app) => ({ slug: app.slug }));
}
