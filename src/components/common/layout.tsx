"use client";

import { usePathname } from "next/navigation";
import PromoBanner from "../banner/PromoBanner";
import Footer from "../user/Footer";
import Header from "../user/Header";

const pathsNotToShowHeaders = ["/auth", "/super-admin"];

function CommonLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const showHeader = !pathsNotToShowHeaders.some((currentPath) =>
    pathName.startsWith(currentPath)
  );

  const showFooter = !pathsNotToShowHeaders.some((currentPath) =>
    pathName.startsWith(currentPath)
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PromoBanner />
      {showHeader && <Header />}
      <main className="flex-grow">{children}</main>
      {/* {showFooter && <Footer />} */}
      {showFooter && <Footer />}
    </div>
  );
}

export default CommonLayout;
