const paddingSize = {
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
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
  buttonMobileFontSize: 20,
  baseMobileFontSize: 16,
  baseFontSize: 14,
  h1MobileFontSize: 50,
  h2MobileFontSize: 24,
};

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export {paddingSize, fontSize, borderRadiusSize};
export type {FontWeight};
