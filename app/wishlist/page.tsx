"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
};

export default function Wishlistpage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    loadWishlist();
  }, []);
  
  async function loadWishlist() {
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) return;

// Get the user's full name from the profiles table
const { data: profile, error: profileError } = await supabase
  .from("profiles")
  .select("full_name")
  .eq("id", user.id)
  .single();

if (!profileError && profile) {
  setFullName(profile.full_name);
}

  const { data: wishlistData, error } = await supabase
    .from("wishlist")
    .select("product_id")
    .eq("user_id", user.id);

  if (error || !wishlistData) return;

  const productIds = wishlistData.map((item) => item.product_id);

  const productPromises = productIds.map((id) =>
    fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json())
  );

  const products = await Promise.all(productPromises);

  setProducts(products);
}
  return (
    <>
      <Navbar fullName={fullName} />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">
          ❤️ My Wishlist
        </h1>

      {products.length === 0 ? (
  <p className="text-gray-500 text-lg">
    Your wishlist is empty.
  </p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-contain"
        />

        <h2 className="text-xl font-semibold mt-4 text-gray-600">
          {product.title}
        </h2>

        <p className="text-green-600 font-bold text-lg mt-2">
          ₹ {product.price}
        </p>

        <p className="text-yellow-500 mt-1">
          ⭐ {product.rating}
        </p>
      </div>
    ))}
  </div>
)}
      </div>
    </>
  );
}