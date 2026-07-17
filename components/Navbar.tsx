"use client";

import { User, Package } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";


interface NavbarProps {
  fullName: string;
}

export default function Navbar({ fullName }: NavbarProps) 
{
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
  await supabase.auth.signOut();

  router.push("/login");
}
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Package size={30} color="#4f46e5" />

        <h2
          style={{
            color: "#4f46e5",
            fontWeight: "bold",
          }}
        >
          Product Management
        </h2>
      </div>

      {/* Right */}

     <div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2"
  >
    <User size={30} color="#4f46e5" />

    <h3
      style={{
        color: "#4f46e5",
        fontWeight: "bold",
      }}
    >
      {fullName}
    </h3>
  </button>

  {open && (
    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border z-50">

      <div className="p-4 border-b">
        
        
      </div>

     <Link
  href="/profile"
  className="flex items-center gap-3 px-4 py-3 text-gray-800 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition duration-200"
>
  👤 My Profile
</Link>

  <Link
  href="/settings"
  className="flex items-center gap-3 px-4 py-3 text-gray-800 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition duration-200"
>
   ⚙️ Settings
</Link>
     
      <Link
   href="/cart"
  className="flex items-center gap-3 px-4 py-3 text-gray-800 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition duration-200"
>
   🛒 Cart
</Link>

      <Link
  href="/wishlist"
  className="flex items-center gap-3 px-4 py-3 text-gray-800 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition duration-200"
>❤️ Wishlist
   
</Link>

     <Link
href="/orders"
  className="flex items-center gap-3 px-4 py-3 text-gray-800 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition duration-200"
>📦 Orders
</Link>


      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
      >
        🚪 Logout
      </button>

    </div>
  )}
</div>
    </nav>
  );
}