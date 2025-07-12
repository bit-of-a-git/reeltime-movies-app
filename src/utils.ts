import truncate from "lodash/truncate";

export const excerpt = (string: string) => {
  return truncate(string, {
    length: 400,
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
};
