export namespace Textual {
  export function regexReplace(str: string, regexs: RegExp[], replacement?: string[]) {
    let substitute = "";
    for (let i = 0; i < regexs.length; i++) {
      if (!replacement) substitute = "";
      else {
        if (!replacement[i]) substitute = "";
        else substitute = replacement[i];
      }
      str = str.replace(regexs[i], substitute);
    }
    return str;
  }

  export function regexSplit(str: string, regex: RegExp, keys: number[], values: string[]) {
    let matched;
    if (keys.length !== values.length) return "";
    const mtcd = str.match(regex);
    if (mtcd) {
      matched = mtcd[0];
      for (let i = 0; i < keys.length; i++) {
        matched = matched.split(values[i])[keys[i]];
      }
    }
    return matched;
  }
}
