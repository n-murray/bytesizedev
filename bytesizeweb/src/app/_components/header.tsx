import Link from "next/link";

const Header = () => {
  return (
    <nav className="mb-20 mt-8 flex items-center justify-between">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/" className="hover:underline">
          ByteSizeDev
        </Link>
        .
      </h2>
      <div className="space-x-4">
        <Link href="/apps" className="hover:underline">
          Apps
        </Link>
        <Link href="/" className="hover:underline">
          Blog
        </Link>
      </div>
    </nav>
  );
};

export default Header;
