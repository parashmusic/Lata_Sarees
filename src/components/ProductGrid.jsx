import { Heart, Star } from "lucide-react";
import prod_1 from '../assets/bs_1.webp';
import prod_2 from '../assets/bs_2.webp';
import prod_3 from '../assets/bs_3.webp';
import prod_4 from '../assets/bs_4.webp';
import { Link } from 'react-router-dom'; 
import banner_1_large from '../assets/Banner1_lg.jpg';
const products = [
  {
    id: 1,
    name: "Cotton Embroidery Fabric",
    price: "₹1,999",
    image: prod_1,
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 2,
    name: "Cotton printed Fabric",
    price: "₹1,499",
    image: prod_2,
    rating: 4.2,
    reviews: 8,
  },
  {
    id: 3,
    name: "Cotton glow Fabric",
    price: "₹2,999",
    image: prod_3,
    rating: 4.7,
    reviews: 15,
  },
  {
    id: 4,
    name: "Cotton elegant Fabric",
    price: "₹1,799",
    image: prod_4,
    rating: 4.4,
    reviews: 10,
  },
];

export function ProductGrid() {
  return (
    <div className="bg-white">
     
     <section className="relative bg-cover bg-center h-50">

      {/* <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${banner_1_large})` }}> */}
        <div className="absolute inset-0  opacity-50"></div>
        <div className="relative container mx-auto flex items-center justify-center h-full">
          <div className="text-center text-gray-700">
            <h1 className="text-5xl font-bold mb-4">Discover Our New Collection</h1>
            <p className="text-xl">Elegant fabrics and clothes for every occasion</p>
          </div>
        </div>
      </section>

     
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="mb-8 text-2xl font-bold">New Arrivals</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <Link to={`/product/${product.id}`} className="relative block aspect-square">
                  <img
                    src={product.image || "/placeholder.svg"}
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
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <p className="text-sm text-gray-500">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 
     
    </div>
  );
}