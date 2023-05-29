export function createCatalog(html: HTMLElement) {
  const catalog: { id: string; content: string; item: Element }[] = [];
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

    catalog.push({ id, content, item: titles[i] });
    step += 2.5;
  }

  return catalog;
}
