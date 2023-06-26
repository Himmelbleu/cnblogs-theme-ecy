// 制作代码块的工具栏
export function createCodeTools(ele: HTMLElement, fileName?: string) {
  const lang = (
    ele
      .getAttribute("class")
      .match(/(language-\w*){0,1}/g)[0]
      .split("-")[1] || ""
  ).toUpperCase();

  const codeToolsInst = document.createElement("div");
  const clipboardIcon = document.createElement("div");
  const codeLang = document.createElement("div");
  const leftInst = document.createElement("div");

  clipboardIcon.setAttribute("class", "code-clipboard hover i-tabler-clipboard-list");
  codeLang.setAttribute("class", "code-language text-c mr-2");
  leftInst.setAttribute("class", "left f-c-b");

  if (fileName) {
    const fileNameInst = document.createElement("div");

    fileNameInst.setAttribute("class", "right");
    codeToolsInst.setAttribute("class", "code-tools f-c-b");

    fileNameInst.innerText = fileName;

    codeToolsInst.append(fileNameInst);
  } else {
    codeToolsInst.setAttribute("class", "code-tools f-c-e");
  }

  codeLang.innerText = `${lang || ""}`;

  leftInst.append(codeLang, clipboardIcon);
  codeToolsInst.append(leftInst);

  clipboardIcon.addEventListener("click", () => {
    navigator.clipboard.writeText(ele.innerText).then(
      () => ElMessage({ message: "复制成功！", type: "success", grouping: true }),
      () => ElMessage({ message: "没有权限！", type: "error", grouping: true })
    );
  });

  ele.insertAdjacentElement("afterend", codeToolsInst);
}

// 因代码块高度过高而隐藏
export function createCodeModal(ele: HTMLElement) {
  if (ele.offsetHeight >= 380) {
    const eleModal = document.createElement("div");
    eleModal.setAttribute("class", "code-modal");

    const eleClick = document.createElement("div");
    eleClick.setAttribute("class", "display-btn hover");
    eleClick.innerText = "展开";
    ele.style.height = "380px";

    eleClick.addEventListener("click", () => {
      ele.style.height = `auto`;
      ele.classList.remove("code-modal");
      eleModal.style.display = "none";
    });

    eleModal.append(eleClick);
    ele.insertAdjacentElement("beforebegin", eleModal);
  }
}

/**
 * @param  el - An HTMLElement or an array of HTMLElements that contains images to add click events to.
 * @param  eleHighslide - The element to be toggled on click.
 * @param  eleHighslideImage - The element that displays the clicked image.
 */
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
