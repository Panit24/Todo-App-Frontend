import './globals.css';

export const metadata = {
  title: 'Todo App by Panit',
  description: 'Todo App for Partnerhub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
