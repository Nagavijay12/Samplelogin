type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {

  const { id } = await params;

  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  const product = await response.json();

  return (
    <div className="min-h-screen bg-gray-100">
     <div className="grid grid-cols-2 gap-12 items-start">
        <div>

<img
src={product.thumbnail}
alt={product.title}
className="w-full h-[450px] object-contain"
/>

</div>
<div>

<h1 className="text-5xl font-bold text-black p-5">
{product.title}
</h1>

<p className="text-yellow-500 text-2xl mt-3">
⭐ {product.rating}
</p>

<p className="text-black text-4xl font-bold mt-5">
₹ {product.price}
</p>

<p className={product.availabilityStatus==="In Stock"?"text-green-500":"text-red-600"}>{product.availabilityStatus}</p>

<p className="text-gray-600 mt-6 leading-8">
{product.description}
</p>
<div className="flex gap-5 mt-8">
  <button
    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl shadow-lg transition duration-300"
  >
    🛒 Add To Cart
  </button>

  <button
    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition duration-300"
  >
    ⚡ Buy Now
  </button>
</div>

</div>
      </div>
    </div>
  );
}