import Header from "../components/common/Hearder";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
