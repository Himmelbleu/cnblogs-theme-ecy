export namespace Formatter {
  function fixed(trimed: string, suffix?: string, uint?: number, fix?: number) {
    const result = (Number(trimed) / uint || 1000).toFixed(fix || 2);
    return `${result}${suffix || ""}`;
  }

  export function unit(num: string): string {
    const trimed = num.trim();
    if (trimed.length < 5) {
      return fixed(trimed);
    } else if (trimed.length >= 5 && trimed.length <= 7) {
      return fixed(trimed, "万", 10000);
    }
  }
}
