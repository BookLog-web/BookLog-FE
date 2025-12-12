import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookLog - 귀여운 독서 기록장",
  description: "나만의 독서 기록을 귀엽고 간편하게 남겨보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
