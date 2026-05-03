import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "From Query to Conversation | The AI Brief",
  description: "A deep dive into how generative AI and chatbots actually work, from tokenization to transformers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
