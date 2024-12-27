export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  description_raw?: string;
  platforms?: Array<{
    platform: {
      name: string;
    };
  }>;
  genres?: Array<{
    name: string;
  }>;
  ratings_count?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  nickname?: string;
  avatar_url?: string;
  region?: string;
  dob?: string;
}

export interface UserProfile {
  id: uuid;
  user_id: string;
  nickname: string;
  avatar_url: string;
  region: string;
  dob: string;
  mobile: string;
  created_at: string;
}