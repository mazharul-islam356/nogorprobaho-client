import Footer from "../components/footer";
import Navbar from "../components/Navbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
