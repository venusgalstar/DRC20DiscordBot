import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import Page from './page';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Page></Page>
      </body>
    </html>
  );
}

export default RootLayout;
