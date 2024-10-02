// Type d'une activité
export interface Activities {
  id: number;
  slug: string;
  title: string;
  description: string;
  url_image: string;
  address: string;
  phone: string;
  avg_rating: number;
  latitude: number;
  longitude: number;
  city_id: number;
  city_name: string;
  department_code: number;
}

// Type des information de l'utilisateur
export interface Credentials {
  pseudo: string;
  email: string;
}

export interface LoaderActivities {
  recents: Activities[];
  topRated: Activities[];
}

export interface Country {
  id: number;
  name: string;
}
export interface City {
  id: number;
  name: string;
  department_code: number;
}

interface AxiosError extends Error {
  response: {
    data: {
      error: {
        message: string;
        originalMessage: string;
      };
    };
  };
}
