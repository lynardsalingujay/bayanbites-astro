// Strapi API Configuration
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://bayanbites.skyguyver.com';
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN;

// TypeScript Interfaces
export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImageData {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
  };
}

export interface StrapiImage {
  data: StrapiImageData | null;
}

export interface CuisineData {
  id: number;
  attributes: {
    name: string;
  };
}

export interface CuisineRelation {
  data: CuisineData | null;
}

export interface MenuItemAttributes {
  name: string;
  description: string;
  price: number;
  isMadeToOrder: boolean;
  image: StrapiImage;
  cuisine: CuisineRelation;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface MenuItem {
  id: number;
  attributes: MenuItemAttributes;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchStrapi<T = MenuItem>(endpoint: string): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api/${endpoint}?populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=formats&populate[cuisine][fields][0]=name`;
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add authentication if token is available
    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      // Provide specific error messages based on status code
      if (response.status === 404) {
        throw new Error(`Endpoint not found: ${endpoint}`);
      }
      if (response.status === 401) {
        throw new Error('Authentication required. Please check your API token.');
      }
      if (response.status === 403) {
        throw new Error('Access forbidden. Your API token may not have the required permissions.');
      }
      if (response.status >= 500) {
        throw new Error('Strapi server error. Please try again later.');
      }
      throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Only log in development mode
    if (import.meta.env.DEV) {
      console.error('Strapi fetch error:', error);
    }
    throw error;
  }
}

export function getStrapiMedia(url: string | undefined | null) {
  if (!url) return null;
  
  // If the URL is already absolute, return it
  if (url.startsWith('http')) {
    return url;
  }
  
  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
}
