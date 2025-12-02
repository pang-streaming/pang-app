export function randomColor(): string {
    let color = "";
    do {
      color = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    } while (color === "#000000" || color === "#ffffff");
    return color;
  }