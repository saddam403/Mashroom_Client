export function buildWhatsAppUrl(phone, product) {
const clean = (phone || '').replace(/[^0-9]/g, '');
const msg = `Hi, I'm interested in *${product.name}* (Price: ${product.price}).\n${product.images?.[0]?.url || ''}`;
return `https://wa.me/${clean}?text=${encodeURIComponent(msg)}`;
}


export function buildFacebookUrl(fbProfile, product) {
// We'll link to the fb profile; messenger deep links are less reliable from web
const text = `I'm interested in ${product.name} (Price: ${product.price}).`;
return `${fbProfile}`;
}