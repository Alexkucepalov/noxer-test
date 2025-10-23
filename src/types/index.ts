// Типы данных для API
export interface ImageApi {
  Image_ID?: number;
  Image_URL?: string;
  MainImage?: boolean;
  Product_ID?: number;
  position?: string;
  sort_order?: number;
  title?: string;
  image_url?: string; // Некоторые изображения используют этот ключ
}

export interface MarkApi {
  Mark_Name: string;
  color_code: string;
}

export interface ProductApi {
  id: number;
  name: string;
  price: number;
  old_price?: number | null;
  images: ImageApi[];
  marks: MarkApi[];
}

export interface CategoryApi {
  Category_ID: number;
  Category_Name: string;
  Category_Image: string | null;
  category_images?: any;
  parent_category_id?: number | null;
  sort_order: number;
}

// Наши внутренние типы, используемые в приложении
export interface Product {
  id: number;
  name: string;
  price: number;
  old_price?: number;
  discount?: number; // Вычисляется, если old_price существует
  image: string; // Извлекается из массива images
  badges?: string[]; // Извлекается из массива marks
  category_id?: number;
  description?: string;
  in_stock?: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  parent_id?: number;
  sort_order: number;
}

export interface Pagination {
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
  per_page: number;
  total_pages: number;
  total_products: number;
}

export interface SpecialProjectParameters {
  fast_search_strings?: {
    parameters_list: string[];
  };
  global_reviews?: {
    rating: number;
    title: string;
    total_ratings_count: number;
    url: string;
  };
  payment_buttons?: {
    afterpay_button_text: string;
    afterpay_button_link: string;
  };
}

export interface ApiResponse {
  categories: CategoryApi[];
  products: ProductApi[];
  popular_searches?: string[];
  pagination?: Pagination;
  id_mark_for_sale?: number;
  special_project_parameters?: any;
  special_project_parameters_actions?: any[];
  special_project_parameters_badges?: any[];
  special_project_parameters_json?: SpecialProjectParameters;
  status: string;
}

export interface FilterParams {
  per_page?: number;
  page?: number;
  search?: string;
  category_id?: number;
  min_price?: number;
  max_price?: number;
  sort_by?: 'name' | 'price' | 'discount';
  sort_order?: 'asc' | 'desc';
}

export interface SearchState {
  query: string;
  results: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  products: Product[];
  categories: Category[];
  popularSearches: string[];
  searchState: SearchState;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}
