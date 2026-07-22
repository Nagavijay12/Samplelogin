"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [fullName, setFullName] = useState("");
 const [products, setProducts] = useState<Product[]>([]);
 const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
};
  
useEffect(() => {
  getProducts();
}, []);

async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  setProducts(data.products);
}

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
  router.replace("/login");
  return;
}

    if (!user) return;

    const { data, error } = await supabase
  .from("profiles")
  .select("full_name")
  .eq("id", user.id)
  .single();

    if (data) {
      setFullName(data.full_name);
    }
  }

  return (
    <>
      <Navbar fullName={fullName} />

      <div
        style={{
          padding: "30px",
        }}
      >
       <div className="grid grid-cols-4 gap-6">
  {products.map((product) => (
    <Link
  href={`/product/${product.id}`}
  key={product.id}
>
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-lg p-5 h-[310px] flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-30 object-contain"
      />

      <h2 className="text-xl font-bold mt-3 text-gray-700">
        {product.title}
      </h2>

      <p className="text-green-600 text-lg font-semibold">
        ₹ {product.price}
      </p>

      <p className="text-yellow-500">
        ⭐ {product.rating}
      </p>
    </div>
    </Link>
  ))}
</div>
      </div>
    </>
  );
}