import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-function.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const loader = document.querySelector('#loader');


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
});

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  
  clearGallery();

  if (query === '') {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
  }

  loader.style.display = 'block'; 

  try {
    const images = await fetchImages(query);

    if (images.length === 0) {
      iziToast.error({ title: 'No results', message: 'No images found for your search query' });
      return;
    }

    renderGallery(images);

   
    lightbox.refresh();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images' });
  } finally {
    loader.style.display = 'none'; 
  }
});