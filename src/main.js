import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-function.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
});

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let totalImages = 0;

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

  try {
    const { images, totalHits: fetchedTotalHits } = await fetchImages(query, currentPage);
    totalHits = fetchedTotalHits;
    totalImages = images.length;

    if (totalImages === 0) {
      iziToast.error({ title: 'No results', message: 'No images found for your search query' });
      loadMoreBtn.style.display = 'none';
      return;
    }

    renderGallery(images);
    lightbox.refresh();
    loadMoreBtn.style.display = totalHits > 15 ? 'block' : 'none'; 

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
    const { images, totalHits: fetchedTotalHits } = await fetchImages(currentQuery, currentPage);
    totalHits = fetchedTotalHits;
    totalImages += images.length;

    if (images.length === 0 || totalImages >= totalHits) {
      iziToast.info({ title: 'End of results', message: "We're sorry, but you've reached the end of search results." });
      loadMoreBtn.style.display = 'none';
      return;
    }

    renderGallery(images);
    lightbox.refresh();
    scrollToNextImages();

  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images' });
  } finally {
    loader.style.display = 'none';
  }
});

function scrollToNextImages() {
  
  const firstPhotoCard = document.querySelector('.photo-card');
  
  if (firstPhotoCard) {
    const { height } = firstPhotoCard.getBoundingClientRect();
    const scrollAmount = height * 4; 

    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth' 
    });
  }
}

