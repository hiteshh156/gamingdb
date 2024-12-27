const API_KEY = 'f251e8be4cee4964aaf2c4820eca4302';
const BASE_URL = 'https://api.rawg.io/api';

interface FetchGamesOptions {
  upcoming?: boolean;
  category?: string;
}

export const fetchGames = async (search?: string, options: FetchGamesOptions = {}) => {
  const params = new URLSearchParams({
    key: API_KEY,
    ...(search && { search }),
    ...(options.upcoming && { dates: '2024-03-01,2025-03-01' }),
    ...(options.category && { genres: options.category })
  });

  const response = await fetch(`${BASE_URL}/games?${params}`);
  return response.json();
};

export const fetchGameDetails = async (id: string) => {
  const response = await fetch(
    `${BASE_URL}/games/${id}?key=${API_KEY}`
  );
  return response.json();
};