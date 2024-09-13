import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="h-20 border-b shadow-sm">
      <nav className="m-auto flex h-full max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" width={60} height={60} alt="Flow Jobs Logo" />{" "}
          <span className="text-2xl font-bold tracking-tight">Flow Jobs</span>
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
