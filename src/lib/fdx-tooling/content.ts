/* eslint-disable */

export async function collectTexts(content: unknown[]) {
  return content.map((item) => {
    const text = item?.Text;

    return filterText(text);
  });
}

export async function collectLocations(content: unknown[]) {
  const aggregatedContents = content.map((item, idx) => {
    const text = item?.Text;
    const contentType = item?.["@_Type"];

    if (contentType === "Scene Heading") {
      const filteredText = filterText(text);
      return String(filteredText).toUpperCase();
    }
  });

  const filteredContents = aggregatedContents.filter((e) => e != null);

  const uniqueContents = new Set(filteredContents);
  const uniqueArrContents = Array.from(uniqueContents);

  const locationsWithAmount = uniqueArrContents.map((item) => {
    let amt = 0;
    filteredContents.forEach((i) => {
      if (i == item) {
        amt++;
      }
    });

    const filming = item?.split(" ")[0];
    let loc = item?.split(" ").slice(1, -1).join(" ");
    loc = loc?.[loc?.length - 1] == "-" ? loc.slice(0, -1) : loc;

    let timeOfDay = item?.split(" ").slice(-1);

    return {
      timeOfDay: timeOfDay,
      filming: filming,
      loc: loc,
      text: item,
      amount: amt,
    };
  });
  return locationsWithAmount;
}

function filterText(text: any) {
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
}
