import {GestureResponderEvent} from 'react-native';

export type ButtonProps = {
  onClickMethod?: (event: GestureResponderEvent) => void;
  title: string;
};
