import { RenderRequestEvent } from 'image-cache-react';

/**
 * A custom event handler for the render request.
 * Depending on the platform and the browser, its implementation will vary
 */
export const onRenderRequest = ({
  target,
  renderTime,
}: RenderRequestEvent<'render'>) => {
  // return true;
  if (!target.bucket.controller.gpuDataFull) {
    return false;
  }
  // create div of w/h set opacity to 0.1 append to body, ren remove on next frame
  const div = document.createElement('div');
  // const size = target.size;
  const size = {
    width: 1,
    height: 1,
  };
  const style = {
    // during gpuModeFull, the size of the image doesn't matter, so to preserve the performance we'll render it as 1x1
    width: `${size.width}px`,
    height: `${size.height}px`,
    opacity: '0.001',
    position: 'absolute',
    top: '0',
    left: Math.round(Math.random() * (window.innerWidth - 1)) + 'px',
    backgroundImage: `url(${target.image.url})`,
    // backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
    pointerEvents: 'none',
    backgroundSize: `${size.width}px ${size.height}px`,
  };
  // set attributes
  div.setAttribute('data-image-cache-react', 'true');
  div.setAttribute('width', `${size.width}`);
  div.setAttribute('height', `${size.height}`);
  div.setAttribute('src', target.image.url);
  div.setAttribute('data-testid', `cache-locker: ${target.image.url}`);

  Object.assign(div.style, style);
  document.body.appendChild(div);

  setTimeout(() => {
    // while gpu mode on embedded platforms, the removal of the div will mean the image is no longer in the gpu
    // document.body.removeChild(div);
  }, renderTime);
  return true;
};
