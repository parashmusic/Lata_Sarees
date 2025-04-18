// import { useState, useEffect } from 'react';
// import { Heart, Star } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { fetchProducts } from '../Api'; // Import the fetch function

// export function OurCollection() {
//   const [products, setProducts] = useState([]); // State for all products
//   const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
//   const [searchQuery, setSearchQuery] = useState(''); // State for search query
//   const [selectedCategory, setSelectedCategory] = useState('all'); // State for selected category
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch products on component mount
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const data = await fetchProducts();
//         setProducts(data);
//         setFilteredProducts(data); // Initialize filtered products with all products
//       } catch (error) {
//         console.error('Error loading products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProducts();
//   }, []);

//   // Handle search and filter
//   useEffect(() => {
//     let filtered = products;

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter((product) =>
//         product.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Filter by category
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter((product) => product.category === selectedCategory);
//     }

//     setFilteredProducts(filtered);
//   }, [searchQuery, selectedCategory, products]);

//   // Get unique categories for the filter
//   const categories = ['all', ...new Set(products.map((product) => product.category))];

//   if (loading) {
//     return <div className="text-center py-12">Loading products...</div>;
//   }

//   return (
//     <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto">
//         {/* Page Title */}
//         <h1 className="text-3xl font-bold mb-8">Our Collection</h1>

//         {/* Search Bar and Category Filter */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-8">
//           {/* Search Bar */}
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full sm:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//           />

//           {/* Category Filter */}
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="w-full sm:w-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//           >
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category === 'all' ? 'All Categories' : category}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {filteredProducts.map((product) => (
//             <div key={product.id} className="group relative">
//               <Link to={`/product/${product.id}`} className="relative block aspect-square">
//                 <img
//                   src={product.image || "/placeholder.svg"}
//                   alt={product.name}
//                   className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <button className="absolute right-2 top-2 p-2 bg-white rounded-full opacity-0 transition-opacity group-hover:opacity-100">
//                   <Heart className="h-5 w-5" />
//                   <span className="sr-only">Add to wishlist</span>
//                 </button>
//               </Link>
//               <div className="mt-4 space-y-1">
//                 <h3 className="text-sm font-medium">{product.name}</h3>
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
//                     />
//                   ))}
//                   <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
//                 </div>
//                 <p className="text-sm text-gray-500">{product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* No Products Found Message */}
//         {filteredProducts.length === 0 && (
//           <div className="text-center py-12">No products found.</div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../Api';

export function OurCollection() {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [selectedCategory, setSelectedCategory] = useState('all'); // Category filter state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category using the first category of each product (if needed)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.categories && product.categories.includes(selectedCategory)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  // Generate unique categories from the products
  const categories = ['all', ...new Set(products.flatMap(product => product.categories || []))];

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Our Collection</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            // Get the selected variant details
            const variant =
              product.variants &&
              product.variants[product.selected_variant] ? product.variants[product.selected_variant] : null;
            // If you don't have rating info from the API, set a default value.
            const rating = product.rating || 0;
            const reviews = product.reviews || 0;
            
            return (
              <div key={product.id} className="group relative">
                <Link to={`/product/${product.id}`} className="relative block aspect-square">
                  <img
                    src={
                      variant && variant.images && variant.images[0]
                        ? variant.images[0]
                        : "/placeholder.svg"
                    }
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute right-2 top-2 p-2 bg-white rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                  </button>
                </Link>
                <div className="mt-4 space-y-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">({reviews})</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    $
                    {variant &&
                    variant.pricing &&
                    variant.pricing[0] &&
                    variant.pricing[0].price
                      ? variant.pricing[0].price
                      : 'N/A'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">No products found.</div>
        )}
      </div>
    </div>
  );
}
