import type { Metadata, Viewport } from "next";
import { Fraunces, Be_Vietnam_Pro, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gửi Mỹ Vũ • Chúc mừng 20/10 từ Pione Global",
  description:
    "Cuốn album kỷ niệm và những lời chúc ngọt ngào nhất từ toàn thể anh em nam Pione Global gửi tặng Mỹ Vũ nhân ngày Phụ nữ Việt Nam 20/10.",
  keywords: ["20/10", "Mỹ Vũ", "Pione Global", "Chúc mừng 20/10", "Scrapbook"],
  openGraph: {
    title: "Gửi Mỹ Vũ • Chúc mừng 20/10 từ Pione Global",
    description: "Cuốn album kỷ niệm đong đầy yêu thương gửi đến Mỹ Vũ!",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#E8527A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${fraunces.variable} ${beVietnamPro.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-[#FFF3F0] text-[#3A1F27] font-sans antialiased selection:bg-[#FFC9D9] selection:text-[#3A1F27]">
        {children}
      </body>
    </html>
  );
}
