import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Hub",
  description: "Shared space for all resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
