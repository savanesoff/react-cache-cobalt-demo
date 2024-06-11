
const host = location.hostname || 'localhost';
const images = {
  big: 'test-4k.jpg',
  small: 'test-small.png',
  tiny: 'movie-poster-155x210.jpg'
};
export const config = {
  image: {
    baseUrl: `http://${host}:8080/${images.tiny}`,
    mimeType: 'image/png',
    colorType: 'RGBA',
    renderWidth: 200,
    renderHeight: 300
  },

  topics: 1,
  perPage: 10,
  pages: 1,
  visibilityMargin: '400px',
  tmdb: true,
  tmdbTopics: ['popular', 'top_rated', 'upcoming', 'now_playing'],
}; 
