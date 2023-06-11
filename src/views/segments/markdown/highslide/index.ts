/**
 * @param  el - An HTMLElement or an array of HTMLElements that contains images to add click events to.
 * @param  eleHighslide - The element to be toggled on click.
 * @param  eleHighslideImage - The element that displays the clicked image.
 */
export function createHigslide(el: HTMLElement | HTMLElement[], eleHighslide: HTMLElement, eleHighslideImage: HTMLImageElement) {
  function addEvent(image: HTMLImageElement) {
    const eleTip = document.createElement("div");
    eleTip.setAttribute("class", "text-b text-0.9rem mt-2");
    eleTip.innerText = image.alt;

    if (image.parentElement.tagName === "P") {
      image.parentElement.setAttribute("class", "f-c-c flex-col");
      image.parentElement.insertAdjacentElement("beforeend", eleTip);
    }

    image.addEventListener("click", () => {
      eleHighslide.classList.toggle("noactive");
      eleHighslide.classList.toggle("active");
      eleHighslideImage.src = image.getAttribute("src");
      eleHighslideImage.style.width = `${image.width}px`;
      eleHighslideImage.style.height = `${image.height}px`;
      document.documentElement.style.overflow = "hidden";
    });
  }

  if (Array.isArray(el)) {
    el.forEach(element => {
      const images = element.querySelectorAll("img");
      images.forEach(image => {
        addEvent(image);
      });
    });
  } else {
    const images = el.querySelectorAll("img");
    images.forEach(image => {
      addEvent(image);
    });
  }
}
