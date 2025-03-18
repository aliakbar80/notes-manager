export const fixPath = (path: string) => {
  return path.replaceAll("?", "&").replace("&", "?");
};
