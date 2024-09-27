import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-function.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more-btn');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0; 
let currentHits = 0; 

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
});

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  if (query === '') {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
  }

  loader.style.display = 'block';
  currentPage = 1;
  currentQuery = query;
  clearGallery();
  loadMoreBtn.style.display = 'none'; 
  currentHits = 0; 

  try {
    const { images, totalHits: total } = await fetchImages(query, currentPage);
    totalHits = total; 

    if (images.length === 0) {
      iziToast.error({ title: 'No results', message: 'No images found for your search query' });
      return;
    }

    renderGallery(images);
    lightbox.refresh();
    currentHits += images.length;

    if (currentHits < totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      iziToast.info({ title: 'End of results', message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images' });
  } finally {
    loader.style.display = 'none';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'block';

  try {
    const { images } = await fetchImages(currentQuery, currentPage);
    renderGallery(images);
    lightbox.refresh();
    currentHits += images.length;

    if (currentHits >= totalHits) {
      iziToast.info({ title: 'End of results', message: "We're sorry, but you've reached the end of search results." });
      loadMoreBtn.style.display = 'none';
    } else {
      scrollToNextImages(); 
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images' });
  } finally {
    loader.style.display = 'none';
  }
});

function scrollToNextImages() {
  
  setTimeout(() => {
    const firstPhotoCard = document.querySelector('.photo-card');
    if (firstPhotoCard) {
      const { height } = firstPhotoCard.getBoundingClientRect();
      const scrollAmount = height * 4; 
      window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth' 
      });
    }
  }, 100); 
}
