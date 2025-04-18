// import { useState, useEffect } from "react"; // For managing selected quantity
// import { useParams,Link } from "react-router-dom";
// import {
//   Heart,
//   Star,
//   ShoppingCart,
//   Truck,
//   Shield,
//   Leaf,
//   ThumbsUp,
//   ChevronRight,
//   LoaderCircle
// } from "lucide-react";
// import { fetchProductById,fetchProducts } from '../Api'; 

// import { useCart } from "../context/UseCart";


// export function ProductDetailPage() {
//   const { id } = useParams();
//   const { addToCart } = useCart(); // Use the cart context
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1); 
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [id]);

//   useEffect(() => {
//     const loadProduct = async () => {
//       try {
//         const data = await fetchProductById(id);
//         setProduct(data);

//         // Fetch related products
//         const allProducts = await fetchProducts();
//         const related = allProducts.filter(
//           (p) => p.category === data.category && p.id !== data.id // Same category but not the current product
//         );
//         setRelatedProducts(related);
//       } catch (error) {
//         console.error('Error loading product:', error);
//       }
//     };
//     loadProduct();
//   }, [id]);

//   if (!product) {
//     return    <div className="flex justify-center items-center h-[400px]">
//     <LoaderCircle className="animate-spin h-16 w-16 text-pink-500" />
//   </div>;
//   }

//   // Check if the product is in the "fabric" category
//   const isFabric = product.category === "fabric";

//   // Calculate the price based on the quantity (for fabric products)
//   const calculatePrice = (quantity) => {
//     if (!isFabric) return parseFloat(product.price.replace(/[^0-9.-]+/g, "")); // Fixed price for non-fabric products

//     const pricing = product.pricing.find(
//       (p) => quantity >= p.minQuantity && quantity <= p.maxQuantity
//     );
//     return pricing ? pricing.price : 0; // Default to 0 if no pricing is found
//   };

//   const price = calculatePrice(quantity); // Price per unit
//   const totalPrice = price * quantity; // Total price for the selected quantity

//   // Handle quantity change
//   const handleQuantityChange = (event) => {
//     const newQuantity = parseInt(event.target.value);
//     if (newQuantity > 0) {
//       setQuantity(newQuantity);
//     }
//   };

//   // Add to cart
//   const handleAddToCart = () => {
//     const item = {
//       ...product,
//       quantity: quantity, // Selected quantity
//       price: isFabric ? `₹${totalPrice}` : product.price, // Total price for fabric products, fixed price for others
//     };
//     addToCart(item);
//   };

//   return (
//     <div className="bg-white py-12 px-4 sm:px-[5vh] md:px-[7vh] lg:px-[9vh]">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Product Image */}
//           <div className="relative aspect-square">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="object-cover w-full h-full rounded-lg"
//             />
//             <button className="absolute right-2 top-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
//               <Heart className="h-5 w-5" />
//               <span className="sr-only">Add to wishlist</span>
//             </button>
//           </div>

//           {/* Product Details */}
//           <div className="space-y-6">
//             <h1 className="text-3xl font-bold">{product.name}</h1>
//             <div className="flex items-center">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`h-5 w-5 ${
//                     i < Math.floor(product.rating)
//                       ? "text-yellow-400"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//               <span className="ml-2 text-sm text-gray-500">
//                 ({product.reviews} reviews)
//               </span>
//             </div>

//             {/* Quantity Input (for fabric products) */}
//             {isFabric && (
//               <div className="space-y-4">
//                 <label
//                   htmlFor="quantity"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Quantity (in meters)
//                 </label>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
//                     className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     -
//                   </button>
//                   <input
//                     type="number"
//                     id="quantity"
//                     name="quantity"
//                     value={quantity}
//                     onChange={handleQuantityChange}
//                     min="1"
//                     className="mt-1 block w-20 p-2 border border-gray-300 rounded-md text-center"
//                   />
//                   <button
//                     onClick={() => setQuantity((prev) => prev + 1)}
//                     className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Price Display */}
//             <p className="text-2xl font-semibold">
//               {isFabric ? (
//                 <>
//                   Total Price: ₹{totalPrice}{" "}
//                   <span className="text-sm text-gray-500">
//                     (₹{price} per meter)
//                   </span>
//                 </>
//               ) : (
//                 `${product.price}`
//               )}
//             </p>

//             {/* Quality Bar */}
//             <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
//               <Leaf className="h-6 w-6 text-green-600" />
//               <div>
//                 <p className="font-medium">{product.quality}</p>
//                 <p className="text-sm text-gray-500">
//                   Eco-friendly and sustainable
//                 </p>
//               </div>
//             </div>

//             {/* Product Description */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Product Description</h2>
//               <p className="text-gray-600">{product.description}</p>
//             </div>

//             {/* Product Details */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Details</h2>
//               <p className="text-gray-600">{product.details}</p>
//             </div>

//             {/* Benefits */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Benefits</h2>
//               <ul className="space-y-2">
//                 {product.benefits.map((benefit, index) => (
//                   <li key={index} className="flex items-center gap-2">
//                     <ThumbsUp className="h-5 w-5 text-green-600" />
//                     <span className="text-gray-600">{benefit}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Shipping Information */}
//             <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
//               <Truck className="h-6 w-6 text-blue-600" />
//               <div>
//                 <p className="font-medium">Shipping Information</p>
//                 <p className="text-sm text-gray-500">{product.shipping}</p>
//               </div>
//             </div>

//             {/* Care Instructions */}
//             {/* <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
//               <Shield className="h-6 w-6 text-purple-600" />
//               <div>
//                 <p className="font-medium">Care Instructions</p>
//                 <p className="text-sm text-gray-500">
//                   {product.careInstructions}
//                 </p>
//               </div>
//             </div> */}

//             {/* Add to Cart Button */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               <span>Add to Cart</span>
//             </button>
            
//           </div>
//         </div>
                
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
//           <div className="space-y-6">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="p-6 bg-gray-50 rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
//                   <div>
//                     <p className="font-medium">Customer Name</p>
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="mt-4 text-gray-600">
//                   "This fabric is amazing! The quality is top-notch, and the embroidery is so beautiful. Highly recommend!"
//                 </p>
//               </div>
//             ))}
//             <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
//               <span>View All Reviews</span>
//               <ChevronRight className="h-5 w-5" />
              
//             </button>
//           </div>
//         </div>

//             {/* Related Products Section */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6">Related Products</h2>
//           <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {relatedProducts.map((relatedProduct) => (
//               <div key={relatedProduct.id} className="group relative">
//                 <Link
//                   to={`/product/${relatedProduct.id}`}
//                   className="relative block aspect-square"
//                 >
//                   <img
//                     src={relatedProduct.image}
//                     alt={relatedProduct.name}
//                     className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <button className="absolute right-2 top-2 p-2 bg-white rounded-full opacity-0 transition-opacity group-hover:opacity-100">
//                     <Heart className="h-5 w-5" />
//                     <span className="sr-only">Add to wishlist</span>
//                   </button>
//                 </Link>
//                 <div className="mt-4 space-y-1">
//                   <h3 className="text-sm font-medium">{relatedProduct.name}</h3>
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`h-4 w-4 ${i < Math.floor(relatedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
//                       />
//                     ))}
//                     <span className="ml-2 text-sm text-gray-500">({relatedProduct.reviews})</span>
//                   </div>
//                   <p className="text-sm text-gray-500">{relatedProduct.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  Star,
  ShoppingCart,
  Truck,
  Leaf,
  ThumbsUp,
  ChevronRight,
  LoaderCircle
} from "lucide-react";
import { fetchProductById, fetchProducts } from "../Api";
import { useCart } from "../context/UseCart";

export function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // New states for variant selection
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Scroll to top when product id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Load product and initialize variant selection state
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        // Initialize the selected variant state using the API's selected_variant or default to 0
        const initialVariant = data.variants[data.selected_variant] || data.variants[0];
        setSelectedVariant(data.selected_variant || 0);
        setSelectedSize(initialVariant.size);
        setSelectedColor(initialVariant.color_name);
        
        // Fetch related products by matching any of the categories
        const allProducts = await fetchProducts();
        const related = allProducts.filter((p) =>
          p.id !== data.id &&
          p.categories && data.categories &&
          p.categories.some((cat) => data.categories.includes(cat))
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };
    loadProduct();
  }, [id]);

  // When the user updates either size or color, determine the matching variant index.
  useEffect(() => {
    if (product) {
      const index = product.variants.findIndex(
        (v) => v.size === selectedSize && v.color_name === selectedColor
      );
      if (index !== -1) {
        setSelectedVariant(index);
      }
    }
  }, [selectedSize, selectedColor, product]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <LoaderCircle className="animate-spin h-16 w-16 text-pink-500" />
      </div>
    );
  }

  // Use the currently selected variant
  const variant =
    product.variants && product.variants[selectedVariant]
      ? product.variants[selectedVariant]
      : null;

  // Determine if the product is a fabric based on its categories (case-insensitive)
  const isFabric = product.categories
    ? product.categories.some((cat) => cat.toLowerCase() === "fabric")
    : false;

  // Calculate price for fabric products based on quantity and tiered pricing,
  // or return the price from the first pricing tier for non-fabric products.
  const calculatePrice = (quantity) => {
    if (!variant || !variant.pricing) return 0;
    if (!isFabric) {
      return variant.pricing[0]?.price || 0;
    }
    const pricingTier = variant.pricing.find((p) => {
      if (p.maxQuantity === null) return quantity >= p.minQuantity;
      return quantity >= p.minQuantity && quantity <= p.maxQuantity;
    });
    return pricingTier ? pricingTier.price : 0;
  };

  const price = calculatePrice(quantity); // Price per unit (or per meter for fabric)
  const totalPrice = price * quantity;

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const item = {
      ...product,
      quantity: quantity,
      // For fabric products, use the total calculated price; for others, use the unit price.
      price: isFabric ? `₹${totalPrice}` : `₹${price}`,
      // Include variant selection details for later reference.
      selected_variant: selectedVariant,
      selectedSize,
      selectedColor
    };
    addToCart(item);
  };

  // Get unique sizes and colors from the available variants
  const availableSizes = [...new Set(product.variants.map((v) => v.size))];
  const availableColors = [...new Set(product.variants.map((v) => v.color_name))];

  return (
    <div className="bg-white py-12 px-4 sm:px-[5vh] md:px-[7vh] lg:px-[9vh]">
      <div className="container mx-auto">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square">
            <img
              src={
                variant && variant.images && variant.images[0]
                  ? variant.images[0]
                  : "/placeholder.svg"
              }
              alt={product.name}
              className="object-cover w-full h-full rounded-lg"
            />
            <button className="absolute right-2 top-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </button>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < (product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                ({product.reviews || 0} reviews)
              </span>
            </div>

            {/* Variant Selector UI */}
            {product.variants.length > 1 && (
              <div className="mt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Select Color</h3>
                  <div className="flex space-x-2 mt-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded ${
                          selectedColor === color ? "border-blue-600" : "border-gray-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                  <div className="flex space-x-2 mt-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded ${
                          selectedSize === size ? "border-blue-600" : "border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Input for Fabric Products */}
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
                  <span className="text-sm text-gray-500">(₹{price} per meter)</span>
                </>
              ) : (
                `₹${price}`
              )}
            </p>

            {/* Quality Section */}
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium">{product.quality}</p>
                <p className="text-sm text-gray-500">Eco-friendly and sustainable</p>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Product Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Product Details (Key-Value Rendering) */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Details</h2>
              {product.details &&
                Object.entries(product.details).map(([key, value]) => (
                  <p key={key} className="text-gray-600">
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Benefits</h2>
              <ul className="space-y-2">
                {product.benefits &&
                  product.benefits.map((benefit, index) => (
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
                <p className="text-sm text-gray-500">Standard shipping available</p>
              </div>
            </div>

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

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => {
              const relatedVariant =
                relatedProduct.variants &&
                relatedProduct.variants[relatedProduct.selected_variant]
                  ? relatedProduct.variants[relatedProduct.selected_variant]
                  : null;
              const relatedRating = relatedProduct.rating || 0;
              const relatedReviews = relatedProduct.reviews || 0;
              const relatedPrice =
                relatedVariant && relatedVariant.pricing
                  ? relatedVariant.pricing[0]?.price
                  : "N/A";

              return (
                <div key={relatedProduct.id} className="group relative">
                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="relative block aspect-square"
                  >
                    <img
                      src={
                        relatedVariant && relatedVariant.images && relatedVariant.images[0]
                          ? relatedVariant.images[0]
                          : "/placeholder.svg"
                      }
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
                          className={`h-4 w-4 ${
                            i < Math.floor(relatedRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        ({relatedReviews})
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">₹{relatedPrice}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
