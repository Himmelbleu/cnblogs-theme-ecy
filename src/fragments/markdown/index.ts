export function wrapImgInAmplifier(
  el: HTMLElement | HTMLElement[],
  eleHighslide: HTMLElement,
  eleHighslideImage: HTMLImageElement,
  unocss?: any
) {
  function addEvent(image: HTMLImageElement) {
    const eleTip = document.createElement("div");
    eleTip.setAttribute("class", "text-b text-0.9rem mt-2");
    eleTip.innerText = image.alt;

    if (image.parentElement.tagName === "P") {
      image.parentElement.setAttribute("class", `${unocss}`);
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

export function createCatalog(html: HTMLElement) {
  const catalogList: { id: string; content: string; item: Element }[] = [];
  let step = 0;

  const titles = html.querySelectorAll("h1, h2, h3");

  for (let i = 0; i < titles.length; i++) {
    const id = titles[i].getAttribute("id");
    const type = titles[i].localName;
    let marginLeft = "";

    if (type === "h2") {
      marginLeft = "10px";
    } else if (type === "h3") {
      marginLeft = "20px";
    }

    const content = `
      <div id="catalog-${id}" class="hover" data-step="${step}" style="margin-left: ${marginLeft}">
        ${titles[i].textContent}
      </div>
    `;

    catalogList.push({ id, content, item: titles[i] });
    step += 2.5;
  }

  return catalogList;
}
