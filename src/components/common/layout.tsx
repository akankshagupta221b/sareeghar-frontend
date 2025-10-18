"use client";

import { usePathname } from "next/navigation";
import Header from "../user/header";
import Footer from "../user/footer";
import PromoBanner from "../banner/PromoBanner";
import Footer2 from "../user/Footer-2";
import Header2 from "../user/Header-2";

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
      {/* {showHeader && <Header />} */}
      {showHeader && <Header2 />}
      <main className="flex-grow">{children}</main>
      {/* {showFooter && <Footer />} */}
      {showFooter && <Footer2 />}
    </div>
  );
}

export default CommonLayout;
