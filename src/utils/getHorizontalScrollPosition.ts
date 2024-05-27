interface GetHorizontalScrollPositionOptions {
  target: HTMLElement;
  stage: HTMLElement;
  scrollable: HTMLElement;
  paddingLeft?: number;
  paddingRight?: number;
  center?: boolean;
  respectBoundaries?: boolean;
}

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

  const stageRect = stage.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const scrollableRect = scrollable.getBoundingClientRect();

  const targetLeftRelativeToScrollable =
    targetRect.left - scrollableRect.left + scrollable.scrollLeft;
  const targetCenterRelativeToScrollable =
    targetLeftRelativeToScrollable + targetRect.width / 2;

  let scrollX;

  if (center) {
    scrollX = targetCenterRelativeToScrollable - stageRect.width / 2;
  } else {
    const targetLeftWithinStage = targetLeftRelativeToScrollable - paddingLeft;
    const targetRightWithinStage =
      targetLeftRelativeToScrollable +
      targetRect.width +
      paddingRight -
      stageRect.width;

    if (targetLeftWithinStage < 0) {
      scrollX = targetLeftWithinStage;
    } else if (targetRightWithinStage > 0) {
      scrollX = targetRightWithinStage;
    } else {
      scrollX = scrollable.scrollLeft;
    }
  }

  if (respectBoundaries) {
    scrollX = Math.max(scrollX, 0);
    scrollX = Math.min(scrollX, scrollable.scrollWidth - stageRect.width);
  }

  return scrollX;
}
