import "./globals.css";

export const metadata = {
  title: "Saurav Portfolio",
  description: "Saurav's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
