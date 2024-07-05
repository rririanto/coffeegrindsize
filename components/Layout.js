// components/Layout.js

import Link from "next/link";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const isToolPage = router.pathname.startsWith("/tools/");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {isToolPage && (
                <button
                  onClick={() => router.back()}
                  className="mr-2 p-2 rounded-full hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              <Link href="/" className="text-xl font-semibold text-gray-800">
                Coffee Tools
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default Layout;
