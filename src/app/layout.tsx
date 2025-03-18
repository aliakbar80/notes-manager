import MainLayout from "@/components/layout/mainLayout";
import { peydaFont } from "@/lib/fonts/peyda";
import "@/styles/globals.css";

export const metadata = {
  title: "Notes Project",
  description: "Description of notes project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-white dark:bg-gray-800 transition" lang="fa" dir="rtl">
      <head></head>
      <body className={peydaFont.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
