
import { ClerkProvider} from '@clerk/nextjs'
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Social Network",
  description: "This is your social network website",
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
      <Menu/>

       <Header />
   
        
        {children}
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
