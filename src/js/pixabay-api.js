const API_KEY = '46153478-1b8179550e9312780d25c3b1d'; 

export async function fetchImages(query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}