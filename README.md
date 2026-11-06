# RANGEZ — Catálogo Digital Oficial (Colección Bootcut & Boots)

Demostración conceptual y funcional de alta gama para la marca ecuatoriana de moda **RANGEZ** (Guayaquil, Ecuador). Desarrollada con arquitectura frontend modular, diseño mobile-first y optimización para despliegue inmediato en Vercel.

---

## ⚡ Tecnologías Empleadas

- **Frontend Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Empaquetador & Dev Server:** [Vite 6](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS 3](https://tailwindcss.com/) con sistema de tokens personalizado para RANGEZ (Onyx Noir, Raw Ecru, Frontier Gold)
- **Iconografía:** [Lucide React](https://lucide.dev/) + Iconos SVG vectoriales optimizados
- **Fotografía & Recursos:** WebP de alta densidad optimizados a partir del PDF maestro original
- **Conversión Digital:** Enlaces estructurados a la API de WhatsApp (`wa.me`) con mensaje personalizado codificado

---

## 📁 Arquitectura y Estructura de Archivos

```
rangez.ec/
├── public/
│   ├── images/
│   │   ├── brand/          # Logotipos y emblemas (rangez-badge.webp, hero-cover.webp)
│   │   ├── products/       # Fotografías de prendas y calzado en WebP
│   │   └── reviews/        # Fotografías reales de entregas de clientes
├── src/
│   ├── components/
│   │   ├── BrandStatement.tsx       # Cierre de marca y llamada de contacto (Página 10)
│   │   ├── CatalogSection.tsx       # Cuadrícula de productos, filtros y buscador
│   │   ├── ConceptualDemoBadge.tsx  # Distintivo de demo conceptual
│   │   ├── CustomerReviewsSection.tsx # Reseñas reales de clientes con estrellas (Página 9)
│   │   ├── DenimQualitySection.tsx  # Sección 100% Algodón y confección (Página 5)
│   │   ├── Footer.tsx               # Pie de página editorial con canales oficiales
│   │   ├── Header.tsx               # Barra de navegación fija con drawer móvil
│   │   ├── Hero.tsx                 # Portada editorial con tipografía RANGEZ y lema
│   │   ├── InstagramIcon.tsx        # Icono SVG oficial de Instagram
│   │   ├── MobileBottomBar.tsx      # Barra flotante móvil para conversión rápida
│   │   ├── ProductCard.tsx          # Tarjeta editorial de producto
│   │   ├── ProductDetailModal.tsx   # Ficha completa con galería, selectores y WhatsApp
│   │   ├── SizeGuideModal.tsx       # Tabla interactiva de tallas con calculador en cm
│   │   └── SpecialComboBanner.tsx   # Promoción Combo $145 (Página 8)
│   ├── data/
│   │   └── catalog.ts               # Fuente de datos centralizada (Prendas, Config, Medidas)
│   ├── types/
│   │   └── index.ts                 # Definiciones de tipos TypeScript
│   ├── utils/
│   │   └── whatsapp.ts              # Generador de enlaces y mensajes para WhatsApp
│   ├── App.tsx                      # Componente raíz y control de estado
│   ├── index.css                    # Directivas Tailwind, fuentes y utilidades de brillo
│   └── main.tsx                     # Punto de entrada de la aplicación
├── CATALOGO.md                      # Registro exhaustivo de datos extraídos del PDF
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Pasos
1. Clona o abre el repositorio en tu terminal:
   ```bash
   cd rangez.ec
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en `http://localhost:5173/`.

---

## 🛠️ Guía de Mantenimiento y Edición

### 1. ¿Cómo editar o agregar productos?
Todos los datos de prendas residen en [`src/data/catalog.ts`](file:///f:/Proyectos/rangez.ec/src/data/catalog.ts).  
Para añadir una nueva prenda, agrega un objeto al arreglo `PRODUCTS`:

```typescript
{
  id: 'nuevo-bootcut-gris',
  name: 'Bootcut Jean — Gris Ceniza',
  category: 'jeans',
  categoryLabel: 'Bootcut Jean',
  price: 30,
  slogan: '“Un tono neutro con actitud urbana.”',
  description: 'Confeccionado en 100% algodón puro...',
  features: [
    '100% Algodón Premium',
    'Corte Bootcut Clásico',
    'Costuras Reforzadas',
  ],
  composition: '100% Algodón Premium',
  fit: 'Corte Bootcut Clásico',
  colors: [{ name: 'Gris Ceniza', hex: '#6B7280', available: true }],
  defaultColor: 'Gris Ceniza',
  sizes: ['28', '30', '32', '34', '36'],
  defaultSize: '30',
  images: ['/images/products/bootcut-gris.webp'],
  inStock: true,
}
```

### 2. ¿Cómo cambiar precios o fotografías?
- **Precios:** Modifica la propiedad `price` (y opcionalmente `originalPrice`) en el objeto del producto en [`src/data/catalog.ts`](file:///f:/Proyectos/rangez.ec/src/data/catalog.ts).
- **Fotografías:** Guarda tu nueva imagen en `public/images/products/` (recomendado en formato `.webp` de 1200 a 1600 px de altura) y actualiza la ruta en el campo `images` del producto.

### 3. ¿Cómo configurar el número de WhatsApp e Instagram?
En [`src/data/catalog.ts`](file:///f:/Proyectos/rangez.ec/src/data/catalog.ts), dentro de `BRAND_CONFIG`:

```typescript
export const BRAND_CONFIG: BrandConfig = {
  brandName: 'RANGEZ',
  whatsappNumber: '+593 96 331 1746', // Texto visible en la web
  whatsappWaMe: '593963311746',       // Formato numérico para el enlace wa.me (código de país + número)
  instagramHandle: '@rangez.ec',
  instagramUrl: 'https://instagram.com/rangez.ec',
  city: 'Guayaquil',
  country: 'Ecuador',
  // ...
};
```

### 4. ¿Cómo actualizar la tabla de tallas?
Edita el arreglo `SIZE_MEASUREMENTS` en [`src/data/catalog.ts`](file:///f:/Proyectos/rangez.ec/src/data/catalog.ts). Los cambios se reflejarán automáticamente tanto en la tabla visual como en el calculador interactivo en tiempo real.

---

## 📲 Conversión a WhatsApp

Cuando el cliente selecciona una prenda, elige su color y talla, y presiona el botón **"Consultar por WhatsApp"**, la aplicación genera una URL oficial de `wa.me` con el siguiente formato codificado:

```text
¡Hola! Vi su catálogo digital y me interesa este producto:

Producto: [Nombre de la prenda]
Talla: [Talla elegida por el usuario]
Color: [Color elegido por el usuario]
Precio publicado: $[Precio]
Referencia: https://rangez.ec/#producto-[id]

¿Podrían confirmarme su disponibilidad? ¡Gracias!
```

Al hacer clic en el enlace de referencia desde WhatsApp, la web abre automáticamente la ficha individual de esa prenda específica.

---

## 🚢 Compilación y Despliegue en Vercel

### Compilación local
Para comprobar que el proyecto compila sin errores:
```bash
npm run build
```
Los archivos de producción se generarán en la carpeta `dist/`.

### Despliegue en Vercel (Recomendado)
1. Sube tu código a GitHub, GitLab o Bitbucket.
2. Inicia sesión en [Vercel](https://vercel.com/) e importa el repositorio.
3. Vercel detectará automáticamente que es un proyecto **Vite**:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Presiona **Deploy**. El sitio quedará publicado con HTTPS y CDN global en menos de 1 minuto.

---

## 📄 Documentación del Contenido
Para consultar el desglose íntegro de los textos, descripciones, testimonios de clientes y decisiones de identidad visual tomadas del PDF maestro, consulta [`CATALOGO.md`](file:///f:/Proyectos/rangez.ec/CATALOGO.md).
