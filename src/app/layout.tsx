import "@/app/globals.css";
import ThemeProviderWrapper from "./components/ThemeProviderWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Image Gallery",
  description: "Responsive image gallery using Next.js and Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}