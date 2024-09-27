import axios from 'axios'; // Добавляем импорт axios

const API_KEY = '46153478-1b8179550e9312780d25c3b1d'; 
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  try {
    const response = await axios.get(url); 
    const { hits, totalHits } = response.data; 
    return { images: hits, totalHits }; 
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
