import { CMS_NAME } from "@/lib/constants";
import Image from "next/image";

export function Home() {
  return (
    <section className="flex-col md:flex-row flex items-center mt-16 mb-16 md:mb-12">
      <Image
        src="/assets/favicon.png"
        alt="ByteSizeDev Logo"
        width={150}
        height={150}
        className="mr-20"
        />
      <h1 className="ml-0 text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        ByteSizeDev.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Byte Sized Chunks of Knowledge...
      </h4>
    </section>
  );
}
