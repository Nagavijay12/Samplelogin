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
        <div >

<img
src={product.thumbnail}
alt={product.title}
className="w-full h-[450px] object-contain"
/>

</div>
<div className="mt-5">

<h2 className="text-3xl font-bold text-gray-800 h-20">
  {product.title}
</h2>

<p className="text-yellow-500 text-2xl ">
⭐ {product.rating}
</p>

<p className="text-black text-4xl font-bold mt-5">
₹ {product.price}
</p>

<p className="text-red-500 font-semibold text-lg mt-2">
  {product.discountPercentage}% OFF
</p>

<div>

<p className="text-lg mt-2 text-blue-400">
  <span className="font-semibold">Category:</span> {product.category}
</p>

</div><br/>

<div className="text-gray-400">

  <p className="mt-2">
  <span className="font-semibold">Warranty:</span>{" "}
  {product.warrantyInformation}
</p>

<p className="mt-2">
  <span className="font-semibold">Shipping:</span>{" "}
  {product.shippingInformation}
</p>
<p className="mt-2">
  <span className="font-semibold">Return Policy:</span>{" "}
  {product.returnPolicy}
</p>

</div><br/>



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
<div className="mt-12">
  <h2 className="text-4xl font-extrabold text-gray-700 mb-8 border-b-2 border-indigo-200 pb-3">
  Customer Reviews
</h2>

  {product.reviews.map((review: any, index: number) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow p-4 mb-4"
    >
      <h3 className="font-semibold text-xl font-bold text-indigo-700">
        {review.reviewerName}
      </h3>

      <p className="text-yellow-500">
        ⭐ {review.rating}
      </p>

      <p className="text-gray-600 mt-2">
        {review.comment}
      </p>
    </div>
  ))}
</div>

</div>
      </div>
    </div>
  );
}