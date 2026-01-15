export const buildWhatsAppUrl = (phone, product) => {
  const text = encodeURIComponent(
    `🍄 ${product?.name}\n💰 Price: ৳${product?.price}\n⚖ Weight: ${product?.weight}g`
  );
  return `https://wa.me/${phone}?text=${text}`;
};

export const buildMessengerUrl = (username) => {
  return `https://m.me/${username}`;
};

export const buildFacebookProfileUrl = (url) => url;
