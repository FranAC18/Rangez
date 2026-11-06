import { BRAND_CONFIG } from '../data/catalog';
import { Product } from '../types';

export interface WhatsAppInquiryParams {
  product: Product;
  selectedSize: string;
  selectedColor: string;
}

export function buildWhatsAppInquiryUrl({
  product,
  selectedSize,
  selectedColor,
}: WhatsAppInquiryParams): string {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://rangez.ec';
  const productUrl = `${currentOrigin}/#producto-${product.id}`;

  const messageText = `¡Hola! Vi su catálogo digital y me interesa este producto:

Producto: ${product.name}
Talla: ${selectedSize}
Color: ${selectedColor}
Precio publicado: $${product.price}
Referencia: ${productUrl}

¿Podrían confirmarme su disponibilidad? ¡Gracias!`;

  const encodedMessage = encodeURIComponent(messageText);
  return `https://wa.me/${BRAND_CONFIG.whatsappWaMe}?text=${encodedMessage}`;
}

export function buildGeneralWhatsAppUrl(customMessage?: string): string {
  const defaultText = `¡Hola RANGEZ! Estoy viendo su catálogo digital y me gustaría hacer una consulta sobre la colección Bootcut, Henley y Harness Boots.`;
  const text = customMessage || defaultText;
  return `https://wa.me/${BRAND_CONFIG.whatsappWaMe}?text=${encodeURIComponent(text)}`;
}
