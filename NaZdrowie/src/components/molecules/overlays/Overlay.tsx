import { generalStyle, overlayStyle } from "properties/styles";
import { fontSize } from "properties/vars";
import { ReactNode } from "react";
import { View, Text, Pressable, GestureResponderEvent } from "react-native";
import RNModal from "react-native-modal";

type OverlayProps = {
  children: ReactNode;
};

export const Overlay = ({ children, ...props }: OverlayProps) => {
  return (
    <RNModal
      isVisible
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}
    >
      {children}
    </RNModal>
  );
};

const OverlayContainer = ({ children }: { children: ReactNode }) => (
  <View style={overlayStyle.container}>{children}</View>
);

const OverlayHeader = ({
  title,
  handleClose,
}: {
  title: string;
  handleClose: (event: GestureResponderEvent) => void;
}) => (
  <View style={overlayStyle.header}>
    <Text style={generalStyle.titleText}>{title}</Text>
    <Pressable onPress={handleClose}>
      <Text style={[generalStyle.titleText, { fontSize: fontSize.xFontSize }]}>
        ×
      </Text>
    </Pressable>
  </View>
);

const OverlayBody = ({ children }: { children?: ReactNode }) => (
  <View style={overlayStyle.body}>{children}</View>
);

const OverlayFooter = ({ children }: { children?: ReactNode }) => (
  <View>{children}</View>
);

Overlay.Header = OverlayHeader;
Overlay.Container = OverlayContainer;
Overlay.Body = OverlayBody;
Overlay.Footer = OverlayFooter;
