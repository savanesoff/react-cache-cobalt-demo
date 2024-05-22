// detect if 
const host = location.hostname || 'localhost';
const images = {
  big: 'test-4k.jpeg',
  small: 'test-small.png'
};
export const config = {
  'image': {
    'baseUrl': `http://${host}:8080/${images.small}`,
    'mimeType': 'image/png',
    'colorType': 'RGBA',
    'renderWidth': 100,
    'renderHeight': 160
  },

  'topics': 2,
  'perPage': 10,
  'pages': 5,
  'visibilityMargin': '200px'
};
window.config = config;
