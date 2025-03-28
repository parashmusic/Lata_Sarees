import { useState, useEffect } from "react"; // For managing selected quantity
import { useParams,Link } from "react-router-dom";
import {
  Heart,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  Leaf,
  ThumbsUp,
  ChevronRight,
  LoaderCircle
} from "lucide-react";
import { fetchProductById,fetchProducts } from '../Api'; 
import prod_1 from "../assets/bs_1.webp";
import prod_2 from "../assets/bs_2.webp";
import prod_3 from "../assets/bs_3.webp";
import prod_4 from "../assets/bs_4.webp";
import prod_5 from "../assets/bs_5.webp";
import { useCart } from "../context/UseCart";

// const products = [
//   {
//     id: 1,
//     name: "Cotton Embroidery Fabric",
//     image: "https://saroj.in/cdn/shop/files/WhatsAppImage2025-02-20at17.02.22_370c320d.jpg",
//     category: "fabric", // Added category
//     rating: 4.5,
//     reviews: 12,
//     description:
//       "This elegant cotton fabric features intricate embroidery, perfect for traditional wear.",
//     details: "Material: 100% Cotton | Care: Machine Washable",
//     shipping: "Free shipping on orders above ₹2,000",
//     careInstructions:
//       "Hand wash with mild detergent. Do not bleach. Dry in shade.",
//     quality: "Premium Quality Fabric",
//     benefits: [
//       "Breathable and comfortable",
//       "Eco-friendly and sustainable",
//       "Durable and long-lasting",
//     ],
//     pricing: [
//       { minQuantity: 1, maxQuantity: 4, price: 100 }, // 1-4 meters at ₹100 per meter
//       { minQuantity: 5, maxQuantity: 9, price: 90 }, // 5-9 meters at ₹90 per meter
//       { minQuantity: 10, maxQuantity: Infinity, price: 85 }, // 10+ meters at ₹85 per meter
//     ],
//   },
//   {
//     id: 2,
//     name: "Silk Printed Fabric",
//     image:"https://saroj.in/cdn/shop/files/WhatsAppImage2024-04-19at7.49.57PM_f16b0018-d64e-447b-a413-f38cbc3cde60.jpg",
//     category: "fabric", // Added category
//     rating: 4.2,
//     reviews: 8,
//     description:
//       "Luxurious silk fabric with a beautiful printed design, ideal for sarees and dresses.",
//     details: "Material: 100% Silk | Care: Dry Clean Only",
//     shipping: "Free shipping on orders above ₹2,000",
//     careInstructions: "Dry clean only. Do not bleach.",
//     quality: "Premium Quality Fabric",
//     benefits: [
//       "Soft and smooth texture",
//       "Elegant and luxurious",
//       "Perfect for special occasions",
//     ],
//     pricing: [
//       { minQuantity: 1, maxQuantity: 4, price: 200 }, // 1-4 meters at ₹200 per meter
//       { minQuantity: 5, maxQuantity: 9, price: 180 }, // 5-9 meters at ₹180 per meter
//       { minQuantity: 10, maxQuantity: Infinity, price: 170 }, // 10+ meters at ₹170 per meter
//     ],
//   },
//   {
//     id: 3,
//     name: "Linen Blend Fabric",
//     image: "https://saroj.in/cdn/shop/files/rn-image_picker_lib_temp_12f57afc-5bf3-4797-927e-efbd9250fdca.jpg",
//     category: "fabric", // Added category
//     rating: 4.0,
//     reviews: 10,
//     description:
//       "A blend of linen and cotton, perfect for summer wear and casual outfits.",
//     details: "Material: 70% Linen, 30% Cotton | Care: Machine Washable",
//     shipping: "Free shipping on orders above ₹2,000",
//     careInstructions: "Machine wash with mild detergent. Do not bleach.",
//     quality: "Premium Quality Fabric",
//     benefits: [
//       "Breathable and lightweight",
//       "Eco-friendly and sustainable",
//       "Durable and long-lasting",
//     ],
//     pricing: [
//       { minQuantity: 1, maxQuantity: 4, price: 200 }, // 1-4 meters at ₹200 per meter
//       { minQuantity: 5, maxQuantity: 9, price: 180 }, // 5-9 meters at ₹180 per meter
//       { minQuantity: 10, maxQuantity: Infinity, price: 170 }, // 10+ meters at ₹170 per meter
//     ],
//   },

//   {
//     id: 5,
//     name: "Leather Handbag",
//     image: "https://saroj.in/cdn/shop/files/WhatsAppImage2025-02-20at17.21.20_5429d655.jpg", // Add appropriate image
//     category: "accessories", 
//     rating: 4.7,
//     reviews: 20,
//     description: "A stylish leather handbag, perfect for everyday use.",
//     details: "Material: Genuine Leather | Care: Wipe with a damp cloth",
//     shipping: "Free shipping on orders above ₹2,000",
//     careInstructions: "Avoid exposure to water and direct sunlight.",
//     quality: "Premium Quality Leather",
//     benefits: [
//       "Durable and long-lasting",
//       "Stylish and versatile",
//       "Perfect for all occasions",
//     ],
//     price: "₹2,500", 
//   },
// ];
export function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart(); // Use the cart context
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);

        // Fetch related products
        const allProducts = await fetchProducts();
        const related = allProducts.filter(
          (p) => p.category === data.category && p.id !== data.id // Same category but not the current product
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return    <div className="flex justify-center items-center h-[400px]">
    <LoaderCircle className="animate-spin h-16 w-16 text-pink-500" />
  </div>;
  }

  // Check if the product is in the "fabric" category
  const isFabric = product.category === "fabric";

  // Calculate the price based on the quantity (for fabric products)
  const calculatePrice = (quantity) => {
    if (!isFabric) return parseFloat(product.price.replace(/[^0-9.-]+/g, "")); // Fixed price for non-fabric products

    const pricing = product.pricing.find(
      (p) => quantity >= p.minQuantity && quantity <= p.maxQuantity
    );
    return pricing ? pricing.price : 0; // Default to 0 if no pricing is found
  };

  const price = calculatePrice(quantity); // Price per unit
  const totalPrice = price * quantity; // Total price for the selected quantity

  // Handle quantity change
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    const item = {
      ...product,
      quantity: quantity, // Selected quantity
      price: isFabric ? `₹${totalPrice}` : product.price, // Total price for fabric products, fixed price for others
    };
    addToCart(item);
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-[5vh] md:px-[7vh] lg:px-[9vh]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full rounded-lg"
            />
            <button className="absolute right-2 top-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Quantity Input (for fabric products) */}
            {isFabric && (
              <div className="space-y-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity (in meters)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="mt-1 block w-20 p-2 border border-gray-300 rounded-md text-center"
                  />
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Price Display */}
            <p className="text-2xl font-semibold">
              {isFabric ? (
                <>
                  Total Price: ₹{totalPrice}{" "}
                  <span className="text-sm text-gray-500">
                    (₹{price} per meter)
                  </span>
                </>
              ) : (
                `${product.price}`
              )}
            </p>

            {/* Quality Bar */}
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium">{product.quality}</p>
                <p className="text-sm text-gray-500">
                  Eco-friendly and sustainable
                </p>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Product Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Details</h2>
              <p className="text-gray-600">{product.details}</p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Benefits</h2>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-green-600" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Information */}
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium">Shipping Information</p>
                <p className="text-sm text-gray-500">{product.shipping}</p>
              </div>
            </div>

            {/* Care Instructions */}
            {/* <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
              <div>
                <p className="font-medium">Care Instructions</p>
                <p className="text-sm text-gray-500">
                  {product.careInstructions}
                </p>
              </div>
            </div> */}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            
          </div>
        </div>
                
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium">Customer Name</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "This fabric is amazing! The quality is top-notch, and the embroidery is so beautiful. Highly recommend!"
                </p>
              </div>
            ))}
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <span>View All Reviews</span>
              <ChevronRight className="h-5 w-5" />
              
            </button>
          </div>
        </div>

            {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <Link
                  to={`/product/${relatedProduct.id}`}
                  className="relative block aspect-square"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute right-2 top-2 p-2 bg-white rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                  </button>
                </Link>
                <div className="mt-4 space-y-1">
                  <h3 className="text-sm font-medium">{relatedProduct.name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(relatedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">({relatedProduct.reviews})</span>
                  </div>
                  <p className="text-sm text-gray-500">{relatedProduct.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
