
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import Header from '../components/Header';
// import { buildWhatsAppUrl, buildFacebookUrl } from '../utils/whatsapp';
import useContacts from "../hooks/useContacts";
import { buildWhatsAppUrl, buildMessengerUrl,} from "../utils/contactLinks";

export default function ProductPage() {
    const { whatsapp, messenger } = useContacts();

  const { slug } = useParams();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await api.get(`/api/products/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  ///contacts......... data load
//   const { data: contacts = [] } = useQuery({
//   queryKey: ["contacts-public"],
//   queryFn: async () => (await api.get("/api/contacts")).data,
// });
// const whatsapp = contacts.find(c => c.type === "whatsapp")?.value;
// const facebookProfile = contacts.find(c => c.type === "facebook_profile")?.value;
//const messenger = contacts.find(c => c.type === "facebook_messenger")?.value;

// const buildWhatsAppUrl = (whatsapp, product) => {
//   const text = encodeURIComponent(
//     `Hi, I'm interested in this mushroom:\n\n🍄 ${product.name}\n💰 Price: ৳${product.price}`
//   );
//   return `https://wa.me/${whatsapp}?text=${text}`;
// };

// const buildFacebookProfileUrl = (facebookProfile, product) => {
//   const text = encodeURIComponent(
//     `Hello, I'm interested in ${product.name}`
//   );
//   return `${facebookProfile}?mibextid=${text}`;
// };
// const buildFacebookProfileUrl = (facebookProfile,) => {

//   return `${facebookProfile}`;
// };


  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (isError || !product) {
    return <div className="p-10 text-center text-red-500">Product not found</div>;
  }

  // const openLink = (url) => {
  //   if (typeof window !== 'undefined') {
  //     window.open(url, '_blank', 'noopener,noreferrer');
  //   }
  // };

  return (
    <div>
      {/* <Header /> */}

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {/* Image */}
          <div className="md:col-span-2 flex items-center justify-center">
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="max-w-full h-96 object-cover rounded-2xl"
            />
          </div>

          {/* Details */}
          <div className="p-4 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold">{product.name}</h2>

            <p className="mt-2 text-gray-600">
              {product.description}
            </p>

            <div className="mt-4 text-2xl font-bold text-primary">
            <span className="text-red-600">{product.price} </span> <span className='text-orange-600 font-extrabold'> ৳</span>
            </div>
            <div className="mt-4 text-2xl font-bold text-(--primary)">
             W: {product.weight} gm
            </div>
            {/* Actions */}
            {/* Actions */}
<div className="mt-6 flex gap-3 flex-wrap">
  {whatsapp && (
    <button
      type="button"
      onClick={() => window.open(buildWhatsAppUrl(whatsapp, product), "_blank")}
      className="px-5 py-3 rounded-xl bg-green-600 text-white
                 hover:bg-green-700 transition shadow-lg"
    >
      WhatsApp Order
    </button>
  )}

  {messenger  && (
    <button
      type="button"
      onClick={() => window.open(buildMessengerUrl(messenger,product), "_blank")}
      className="px-5 py-3 rounded-xl border
                 hover:bg-gray-100 transition shadow"
    >
      Messenger
    </button>
  )}

</div>

          </div>

        </div>
      </main>
    </div>
  );
}
