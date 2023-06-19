export namespace Broswer {
  export function setTitle(title?: string) {
    const prefix = title ? title + " - " : "";
    document.getElementsByTagName(
      "title"
    )[0].innerText = `${prefix}${BleuVars.getBlogApp()} - 博客园`;
  }

  export function scrollIntoView(selector: string) {
    document.querySelector(selector).scrollIntoView();
  }

  export function endLoading() {
    const loadingInst = document.querySelector<HTMLElement>(".loading");
    loadingInst.classList.toggle("fade-in-out");
    loadingInst.style.display = "none";

    document.getElementById("l-content").classList.toggle("fade-in-out");

    const eleTrack = document.querySelector("#l-progress > .track");
    eleTrack.classList.remove("track-active");
    eleTrack.classList.add("track-static");

    const eleBar = document.querySelector("#l-progress > .track > .bar");
    eleBar.classList.remove("bar-active");
    eleBar.classList.add("bar-static");
  }

  export function startLoading() {
    document.getElementById("l-content").classList.toggle("fade-in-out");

    const eleTrack = document.querySelector("#l-progress > .track");
    eleTrack.classList.remove("track-static");
    eleTrack.classList.add("track-active");

    const eleBar = document.querySelector("#l-progress > .track > .bar");
    eleBar.classList.remove("bar-static");
    eleBar.classList.add("bar-active");
  }
}
