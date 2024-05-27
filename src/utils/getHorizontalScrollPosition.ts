interface GetHorizontalScrollPositionOptions {
  /** The target element that needs to be scrolled into view */
  target: HTMLElement;
  /** The stage element that defines the bounds of the visible area */
  stage: HTMLElement;
  /** The scrollable element where the transformations are applied */
  scrollable: HTMLElement;
  /** Padding to the left of the target element within the stage (default is 0) */
  paddingLeft?: number;
  /** Padding to the right of the target element within the stage (default is 0) */
  paddingRight?: number;
  /** Whether to center the target element within the stage (default is false) */
  center?: boolean;
  /** Whether to respect the boundaries of the scrollable element (default is true) */
  respectBoundaries?: boolean;
}

/**
 * Calculates the horizontal scroll position to bring the target element into view.
 * @param {GetHorizontalScrollPositionOptions} options - The options for calculating the scroll position.
 * @returns {number} - The calculated scroll position.
 */
export function getHorizontalScrollPosition(
  options: GetHorizontalScrollPositionOptions,
): number {
  const {
    target,
    stage,
    scrollable,
    paddingLeft = 0,
    paddingRight = 0,
    center = false,
    respectBoundaries = true,
  } = options;

  // const offsetLeft = -scrollable.getBoundingClientRect().left;
  // Calculate the target's left position relative to the scrollable element's current scroll position
  const targetLeftRelativeToScrollable = target.offsetLeft;
  // Calculate the target's center position relative to the scrollable element
  const targetCenterRelativeToScrollable =
    targetLeftRelativeToScrollable + target.offsetWidth / 2;

  let scrollX;

  if (center) {
    // Calculate the scroll position to center the target within the stage
    scrollX = targetCenterRelativeToScrollable - stage.offsetWidth / 2;
  } else {
    // TODO this needs to be fixed
    const targetLeftWithinStage = targetLeftRelativeToScrollable - paddingLeft;
    const targetRightWithinStage =
      targetLeftRelativeToScrollable +
      target.offsetWidth +
      paddingRight -
      stage.offsetWidth;

    if (targetLeftWithinStage < 0) {
      scrollX = targetLeftWithinStage;
    } else if (targetRightWithinStage > 0) {
      scrollX = targetRightWithinStage;
    } else {
      scrollX = -scrollable.getBoundingClientRect().left;
    }
  }

  if (respectBoundaries) {
    // Ensure the scroll position does not exceed the allowable limits of the scrollable area
    scrollX = Math.max(scrollX, 0);
    scrollX = Math.min(scrollX, scrollable.scrollWidth - stage.offsetWidth);
  }

  return scrollX;
}
