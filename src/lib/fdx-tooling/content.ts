/* eslint-disable */

import { getFilteredRowModel } from "@tanstack/react-table";

// Return pure array of script content without additional properties.
export async function collectTexts(content: unknown[]) {
  return content.map((item) => {
    const text = item?.Text;

    return filterText(text);
  });
}

export async function collectScenes(content: unknown[]) {
  const aggregratedContents = content.map((item, idx) => {
    const text = item?.Text;
    const contentType = item?.["@_Type"];

    if (contentType === "Scene Heading") {
      const filteredText = filterText(text);
      return {
        scene_name: String(filteredText).toUpperCase(),
        scene_number: item?.["@_Number"],
        page_number: item?.SceneProperties["@_Page"],
        scene_length: item?.SceneProperties["@_Length"],
        node_index: idx,
      };
    }
  });

  const filteredContents = aggregratedContents.filter((e) => e != null);

  return filteredContents;
}

export async function collectMeta(
  content: unknown[],
  collectedScenes: unknown[],
  collectedActs: unknown[],
) {
  let total = 0;
  const lastAct = collectedActs[collectedActs.length - 1].node_index;
  const searchIndex = lastAct + 1;
  let startingIndex;
  const scenesLength = collectedScenes.length;

  const lastScene = collectedScenes.filter((item, idx) => {
    if (item.node_index == searchIndex) {
      startingIndex = idx;
      return;
    }
  });

  let finalPage = Number(collectedScenes[startingIndex ?? 0].page_number);

  for (let i = startingIndex ?? 0; i < scenesLength; i++) {
    let { scene_length } = collectedScenes[i];

    const elmt = scene_length.split(" ");
    const decLength =
      elmt.length > 1
        ? Number(elmt[0]) + Number(eval(elmt[1]))
        : Number(eval(scene_length));

    console.log("dec_length --> ", decLength);

    finalPage += decLength;
  }

  return {
    page_amt: finalPage,
  };
}

// Return objects of characters with their respective dialogue contents.
export async function collectDialogues(content: unknown[]) {
  const aggregratedContents = content.map((item, idx) => {
    const text = item?.Text;
    const contentType = item?.["@_Type"];

    if (contentType === "Character") {
      const characterText = String(filterText(text)).toUpperCase();
      const characterTextComponents = characterText.split(" ");
      const containsBracket = filterBrackets(characterText);
      const character = containsBracket
        ? characterText.replace(containsBracket, "").trim()
        : characterText;

      const dialogueText = content[idx + 1].Text;
      const filteredDialogueText = filterText(dialogueText);
      return {
        character: character,
        dialogue: filteredDialogueText,
      };
    }
  });

  return aggregratedContents.filter((e) => {
    if (e != null) {
      return e;
    }
  });
}

// Return
export async function collectActs(content: unknown[]) {
  const aggregratedContents = content.map((item, idx) => {
    const text = item?.Text;
    const contentType = item?.["@_Type"];

    if (contentType === "New Act") {
      const filteredText = filterText(text);
      return {
        act_name: filteredText,
        node_index: idx,
      };
    }
  });
  return aggregratedContents.filter((e) => e != null);
}

// Return a destructured info about location from the Scene Heading
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

    const filteredHeading = filterSceneHeadingInfo(item!);
    return {
      ...filteredHeading,
      amount: amt,
    };
  });
  return locationsWithAmount;
}

export async function collectCharacters(members: unknown[]) {
  return members.map((item) => String(item["@_Character"]).toUpperCase());
}

export async function collectElementSettings(elements: unknown[]) {
  return elements.map((item, idx) => {
    return {
      element_name: item["@_Type"],
      breaks_page: item?.ParagraphSpec["@_StartsNewPage"],
    };
  });
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

function filterBrackets(text: string) {
  const containsBrackets = true
    ? text.includes("(") && text.includes(")")
    : false;
  if (containsBrackets) {
    const bracketIndex = text.indexOf("(");
    return text.substring(bracketIndex);
  }
  return null;
}

function filterIds(text: any) {}

function filterSceneHeadingInfo(text: string) {
  // Find filming (INT, EXT, INT/EXT, I/E, etc.)
  const filming = text?.split(" ")[0];

  // loc is for the actual location name
  let loc = text?.split(" ").slice(1, -1).join(" ");
  loc = loc?.[loc?.length - 1] == "-" ? loc.slice(0, -1) : loc;

  let timeOfDay = text?.split(" ").slice(-1)?.[0];
  if (timeOfDay?.[0] == "(" && timeOfDay?.[timeOfDay.length - 1] == ")") {
    timeOfDay = text?.split(" ").slice(-2)?.[0];
    loc = loc?.split(" ").slice(0, -1).join(" ");
    loc = loc?.[loc?.length - 1] == "-" ? loc.slice(0, -1) : loc;
  }

  return {
    timeOfDay: timeOfDay,
    filming: filming,
    loc: loc,
    text: text,
  };
}
