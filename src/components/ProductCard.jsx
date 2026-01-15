

import { useNavigate } from "react-router-dom";
import useContacts from "../hooks/useContacts";
import { buildWhatsAppUrl, buildFacebookProfileUrl,} from "../utils/contactLinks";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { whatsapp, facebookProfile } = useContacts();

  const openExternal = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      className="card-premium cursor-pointer group hover:scale-[1.02] transition"
      role="button"
      tabIndex={0}
    >
      {/* Image */}
      <div className="relative h-56 bg-gray-100 overflow-hidden flex items-center justify-center">
        <img
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.name}
          className="max-w-full max-h-full object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-sm text-gray-500 mt-1">
          {product.description?.slice(0, 80)}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="grid gap-1 text-sm font-semibold">
            <div>
              <span className="text-red-600">{product.price}</span>
              <span className="text-orange-600"> ৳</span>
            </div>
            <div>W: {product.weight} gm</div>
          </div>

          {/* Dynamic Buttons */}
          <div className="flex gap-2">
            {whatsapp && (
              <button
                onClick={(e) =>
                  openExternal(e, buildWhatsAppUrl(whatsapp, product))
                }
                className="px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                WhatsApp
              </button>
            )}

            {/* {messenger && (
              <button
                onClick={(e) =>
                  openExternal(e, buildMessengerUrl(messenger, product))
                }
                className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Messenger
              </button>
            )} */}

            {facebookProfile && (
              <button
                onClick={(e) =>
                  openExternal(e, buildFacebookProfileUrl(facebookProfile))
                }
                className="px-3 py-1 rounded-lg border hover:bg-gray-100"
              >
                Facebook
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
