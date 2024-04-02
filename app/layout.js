import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import "./globals.css";
import { Toaster, toast } from 'sonner'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gignite - Stay Tuned",
  description: "Generated by create next app",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        {/* Add any head elements you need, such as title and metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={`${inter.className} relative h-full w-full bg-black`}>
       
      <div className="z-10">
        <Link href="/">
            <img
              src="./assets/images/Logowhite.png"
              alt="Logo"
              className="w-10 h-14 sm:w-14 sm:h-20 fixed top-4 left-4"
            />
        </Link>
      </div>
        <div className="relative z-10">{children}</div>
        <Toaster position="top-center" richColors/>
      </body>
    
    </html>
  );
};

export default RootLayout;
