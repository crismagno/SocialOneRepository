// buscar mensagens quando tocar no topo do scroll
export const handleScrollEvent = (
  event: any,
  eventCalled: any,
  valueCloser: number = 10,
): void => {
  const offsetY = event?.nativeEvent?.contentOffset?.y;

  const layoutMeasurement = event?.nativeEvent?.layoutMeasurement;

  const contentSize = event?.nativeEvent?.contentSize?.height;

  let scrollIsTop = parseInt(offsetY + layoutMeasurement?.height).toFixed(0);

  let heightScroll = parseInt(contentSize).toFixed(0);

  if (parseInt(scrollIsTop) + valueCloser >= heightScroll && eventCalled) {
    eventCalled();
  }
};
