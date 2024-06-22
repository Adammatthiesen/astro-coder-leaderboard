export function toPascalCase (str: string) {
    if (/^[a-z\d]+$/i.test(str)) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str.replace(
      /([a-z\d])([a-z\d]*)/gi,
      (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
    ).replace(/[^a-z\d]/gi, '');
  }