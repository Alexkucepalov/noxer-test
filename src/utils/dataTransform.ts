import { ProductApi, CategoryApi, Product, Category, ImageApi, MarkApi } from '../types';

// Функция для извлечения основного изображения из массива изображений
export const getMainImage = (images: ImageApi[]): string => {
  if (!images || images.length === 0) return '';
  
  // Ищем изображение с MainImage: true
  const mainImage = images.find(img => img.MainImage === true);
  if (mainImage) {
    return mainImage.Image_URL || mainImage.image_url || '';
  }
  
  // Если нет основного изображения, берем первое доступное
  const firstImage = images.find(img => img.Image_URL || img.image_url);
  return firstImage?.Image_URL || firstImage?.image_url || '';
};

// Функция для извлечения меток из массива marks
export const getBadges = (marks: MarkApi[]): string[] => {
  if (!marks || marks.length === 0) return [];
  return marks.map(mark => mark.Mark_Name);
};

// Функция для вычисления скидки
export const calculateDiscount = (price: number, oldPrice?: number | null): number | undefined => {
  if (!oldPrice || oldPrice <= price) return undefined;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

// Преобразование ProductApi в Product
export const transformProduct = (productApi: ProductApi): Product => {
  const image = getMainImage(productApi.images);
  const badges = getBadges(productApi.marks);
  const discount = calculateDiscount(productApi.price, productApi.old_price);

  return {
    id: productApi.id,
    name: productApi.name,
    price: productApi.price,
    old_price: productApi.old_price || undefined,
    discount,
    image,
    badges: badges.length > 0 ? badges : undefined,
    in_stock: true, // Предполагаем, что товар в наличии, если он в API
  };
};

// Преобразование CategoryApi в Category
export const transformCategory = (categoryApi: CategoryApi): Category => {
  return {
    id: categoryApi.Category_ID,
    name: categoryApi.Category_Name,
    image: categoryApi.Category_Image || '',
    parent_id: categoryApi.parent_category_id || undefined,
    sort_order: categoryApi.sort_order,
  };
};

// Преобразование массива товаров
export const transformProducts = (productsApi: ProductApi[]): Product[] => {
  return productsApi.map(transformProduct);
};

// Преобразование массива категорий
export const transformCategories = (categoriesApi: CategoryApi[]): Category[] => {
  return categoriesApi.map(transformCategory);
};
