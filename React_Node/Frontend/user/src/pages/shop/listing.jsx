import MainLayout from "@/layout/MainLayout";

const ShoppingListing = () => {
  const products = [
    { id: 1, name: "Product 1", price: "$50", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", price: "$40", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", price: "$60", image: "https://via.placeholder.com/150" },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Listing</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.price}</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ShoppingListing;

  