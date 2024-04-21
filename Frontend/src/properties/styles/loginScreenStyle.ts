import {StyleSheet} from 'react-native';
import {fontSize, paddingSize} from '../vars';
import primaryColors from '../colors';

const loginScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: paddingSize.big,
    justifyContent: 'center',
    rowGap: paddingSize.xxBig,
    backgroundColor: primaryColors.white,
  },
  inputContainer: {
    rowGap: paddingSize.big,
  },
  h1: {
    fontSize: fontSize.h1MobileFontSize,
    color: primaryColors.darkBlue,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  h2: {
    fontSize: fontSize.h2MobileFontSize,
    color: primaryColors.darkGrey,
  },
});

export default loginScreenStyle;
