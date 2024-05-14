export async function collectTexts(content: unknown[]) {
  const textsOnly = content.map((item) => {
    const text = item?.Text;

    const isArray = Array.isArray(text);
    const isString = typeof text === "string";
    const isObject = typeof text === "object" && text !== null;

    if (isArray) {
      const arr = text.map((txt) => {
        const txtIsString = typeof txt === "string";
        const txtIsObject = typeof txt === "object" && txt !== null;

        return txtIsString ? txt : txt[`#text`];
      });

      return arr.join(" ");
    } else if (isString) {
      return text;
    } else if (isObject) {
      return text[`#text`];
    }
  });
  return textsOnly;
}
