
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balemuya",
  description: "Conecting professionals with customers",
};

export default async function RootLayout({
  children,
  params,
  
}: Readonly<{
  children: React.ReactNode;
  params: {locale: Locale};
}>) {


  const { locale } = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ClientProvider>
            {children}
          </ClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
