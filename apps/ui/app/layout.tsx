import './global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code Reviewer',
  description: 'Tool to generate code review',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
