export const metadata = { title: 'Zmluvy – prototyp', description: 'Generovanie zmlúv' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
