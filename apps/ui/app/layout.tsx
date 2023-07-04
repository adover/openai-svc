import Head from 'next/head';
import './global.css';

export const metadata = {
  title: 'Code Reviewer',
  description: 'Tool to generate code review',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <div className="flex flex-col h-screen">
          <header className="p-8">
            <h1>Code Reviewer</h1>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="p-8">
            <p>&copy; 2023 Andy Dover</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
