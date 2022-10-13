export const getText = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.body.textContent;
};
