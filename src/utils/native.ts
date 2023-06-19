export namespace Native {
  function openWindow(w: string, t: number, i: number, r: number) {
    const left = (screen.width - t) / 2 - r;
    const top = (screen.height - i) / 2 - r;
    const hatch = window.open(
      w,
      "_blank",
      `width=${t},height=${i},toolbars=0,resizable=1,left=${left},top=${top}`
    );
    hatch.focus();
  }

  export function openImageUploadWindow(el: string, onUploaded: (img: string) => void) {
    try {
      // @ts-ignore
      const elem = $(`#${el}`);

      elem.focus(() => {
        const imgUrl = elem.val() + "";
        onUploaded ? onUploaded(imgUrl.replace("[img]", "![](").replace("[/img]", ")")) : "";
        elem.val("");
      });

      const w = `${location.protocol}//upload.cnblogs${location.hostname.substring(
        location.hostname.lastIndexOf(".")
      )}/imageuploader/upload?host=www.cnblogs.com&editor=0#${el}`;

      document.domain = `cnblogs.${location.hostname.substring(
        location.hostname.lastIndexOf(".") + 1,
        location.hostname.length
      )}`;

      openWindow(w, 450, 120, 200);
    } catch (e) {
      console.error(e);
    }
  }
}
