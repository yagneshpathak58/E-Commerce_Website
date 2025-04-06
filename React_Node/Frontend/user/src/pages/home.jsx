import Hero from "@/components/common/hero";
import MainLayout from "@/layout/MainLayout";
import SearchSection from "@/components/common/SearchSection";
import ProductCard from "@/components/common/ProductCard";

const mockProducts = [
    { name: "Smartphone", price: 199.99, image: "https://via.placeholder.com/150" },
    { name: "Shoes", price: 59.99, image: "https://via.placeholder.com/150" },
    { name: "Book", price: 9.99, image: "https://via.placeholder.com/150" },
  ];

const Home = () => {
    return (
      <MainLayout>
        <Hero />
        <SearchSection />
        <section className="py-10 px-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
            {mockProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </section>
      </MainLayout>
    );
  };
  
export default Home;