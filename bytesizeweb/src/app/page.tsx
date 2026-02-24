import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Home } from "@/app/_components/home";
import { MorePosts } from "@/app/_components/more-posts";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Home />

        {/* prominent apps callout */}
        <section className="mt-12 mb-12 bg-indigo-900 text-white p-8 rounded-lg">
          <h2 className="text-4xl font-bold mb-4">Explore My Apps</h2>
          <p className="text-lg mb-6">
            A curated collection of apps I&rsquo;ve built –
            take a look, download, or just browse.. thats cool too.
          </p>
          <a
            href="/apps"
            className="inline-block bg-white text-indigo-900 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100"
          >
            Browse apps →
          </a>
        </section>

        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MorePosts posts={morePosts} />}
      </Container>
    </main>
  );
}
