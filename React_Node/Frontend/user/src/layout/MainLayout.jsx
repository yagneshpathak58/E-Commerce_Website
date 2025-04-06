import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Main Content - Make Full Width */}
      <main className="flex-grow w-full justify-center ">
        <div className="w-full mx-auto px-4 py-6 md:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
