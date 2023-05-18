export function useOnWheel(down: Function, up: Function) {
  function handleMouseWheel(event: WheelEvent) {
    const delta = Math.max(-1, Math.min(1, event.deltaY));

    if (delta > 0) {
      down();
    } else if (delta < 0) {
      up();
    }
  }

  window.addEventListener("wheel", useThrottleFn(handleMouseWheel, 200));
}

export function useOnScroll(edge: number, inTop: Function, inBottom: Function) {
  window.addEventListener(
    "scroll",
    useThrottleFn(e => {
      const ratio = window.scrollY / Number(document.body.clientHeight);
      if (ratio <= edge) {
        inBottom();
      } else if (ratio > edge && ratio <= 1) {
        inTop();
      }
    }, 200)
  );
}
