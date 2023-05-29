// 制作代码块的工具栏
export function createCodeTools(ele: HTMLElement) {
  const lang = (
    ele
      .getAttribute("class")
      .match(/(language-\w*){0,1}/g)[0]
      .split("-")[1] || ""
  ).toUpperCase();

  const eleClipboard = document.createElement("div");
  eleClipboard.setAttribute("class", "code-clipboard hover");
  eleClipboard.innerText = "复制代码";

  const eleLang = document.createElement("div");
  eleLang.setAttribute("class", "code-language");
  eleLang.innerText = `语言 ${lang || ""}`;

  const eleTools = document.createElement("div");
  eleTools.setAttribute("class", "code-tools");
  eleTools.append(eleClipboard, eleLang);

  eleClipboard.addEventListener("click", () => {
    navigator.clipboard.writeText(ele.innerText).then(
      () => ElMessage({ message: "复制成功！", type: "success", grouping: true }),
      () => ElMessage({ message: "没有权限！", type: "error", grouping: true })
    );
  });

  ele.insertAdjacentElement("afterend", eleTools);
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
