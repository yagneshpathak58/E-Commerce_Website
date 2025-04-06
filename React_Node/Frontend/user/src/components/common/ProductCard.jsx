// components/ProductCard.jsx
const ProductCard = ({ product }) => {
    return (
      <div className="border rounded shadow p-4 bg-white hover:shadow-md transition">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
        <h2 className="font-semibold">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
    );
  };
  
  export default ProductCard;
  