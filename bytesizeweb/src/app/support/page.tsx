import { Metadata } from "next";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export const metadata: Metadata = {
  title: "Support | ByteSizeDev",
  description: "Get support for ByteSizeDev apps. Contact us at info@bytesizedev.ie.",
};

export default function SupportPage() {
  return (
    <main>
      <Container>
        <Header />
        <section className="mb-32 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Support</h1>
          <p className="text-lg mb-8">
            Need help with one of our apps? We&rsquo;re happy to assist. Reach out to us
            and we&rsquo;ll get back to you as soon as possible.
          </p>
          <div className="bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-slate-600 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              For support, feedback, or any questions about our apps, please email us at:
            </p>
            <a
              href="mailto:info@bytesizedev.ie"
              className="inline-block text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              info@bytesizedev.ie
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
}
