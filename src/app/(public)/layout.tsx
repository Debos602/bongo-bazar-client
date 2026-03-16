import CartButton from "@/components/shared/CartButton";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar cartButton={<CartButton />} />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  );
}
