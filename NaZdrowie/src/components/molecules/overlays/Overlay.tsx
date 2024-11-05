import primaryColors from "properties/colors";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import RNModal from "react-native-modal";

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
};

export const Overlay = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
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

const OverlayContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const OverlayHeader = ({
  title,
  handleClose,
}: {
  title: string;
  handleClose: (event: GestureResponderEvent) => void;
}) => (
  <View style={styles.header}>
    <Text style={styles.text}>{title}</Text>
    <Pressable onPress={handleClose}>
      <Text style={[styles.text, { fontSize: fontSize.xFontSize }]}>×</Text>
    </Pressable>
  </View>
);

const OverlayBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const OverlayFooter = ({ children }: { children?: React.ReactNode }) => (
  <View>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.white,
    borderRadius: borderRadiusSize.small,
    borderWidth: 2,
    borderColor: primaryColors.babyBlue,
    padding: paddingSize.mediumBig,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: primaryColors.darkBlue,
    paddingBottom: paddingSize.medium,
    borderBottomWidth: 1,
    borderBottomRightRadius: borderRadiusSize.small,
    borderBottomColor: primaryColors.lightGrey,
  },
  text: {
    textAlign: "center",
    fontSize: fontSize.buttonMobileFontSize,
    color: primaryColors.darkBlue,
  },
  body: {
    paddingTop: paddingSize.mediumBig,
    justifyContent: "center",
    paddingBottom: paddingSize.mediumBig,
    display: "flex",
    rowGap: paddingSize.mediumBig,
  },
});

Overlay.Header = OverlayHeader;
Overlay.Container = OverlayContainer;
Overlay.Body = OverlayBody;
Overlay.Footer = OverlayFooter;
