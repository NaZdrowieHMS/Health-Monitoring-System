const paddingSize = {
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  mediumBig: 24,
  big: 32,
  xBig: 48,
  xxBig: 64,
};

const borderRadiusSize = {
  small: 4,
  medium: 16,
  big: 32,
};

const fontSize = {
  smallFontSize: 12,
  baseFontSize: 16,
  secondaryTitleFontSize: 18,
  titleFontSize: 20,
  h2FontSize: 24,
  xFontSize: 32,
  h1FontSize: 50,
};

type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export { paddingSize, fontSize, borderRadiusSize };
export type { FontWeight };
