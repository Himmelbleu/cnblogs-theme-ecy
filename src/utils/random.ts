export namespace Random {
  function select(min: number, max: number) {
    let sum = max - min + 1;
    return Math.floor(Math.random() * sum + min);
  }

  export function get(src: string[], max: number) {
    let a = [];

    if (src.length < max) {
      for (let i = 0; i < max; i++) {
        let d = Math.floor(Math.random() * src.length);
        a[i] = d;
      }
    } else if (src.length >= max) {
      for (let i = 0; i < src.length; i++) {
        a[i] = select(0, src.length - 1);
        for (let z = 0; z < i; z++) {
          if (a[i] == a[z]) {
            i--;
            break;
          }
        }
      }
    }

    return a;
  }
}
