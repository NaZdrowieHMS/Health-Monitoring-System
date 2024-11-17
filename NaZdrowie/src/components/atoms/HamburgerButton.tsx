import React, {useContext, useEffect} from "react";
import {TouchableWithoutFeedback, View} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import {HamburgerButtonStyle} from "properties/styles/hamburgerButtonStyle";
import {HamburgerMenuContext} from "components/organisms/context/HamburgerMenuProvider";

export const HamburgerButton: React.FC<object> = () => {
  const {isMenuVisible, setIsMenuVisible} = useContext(HamburgerMenuContext);
  const toggleAnim = useDerivedValue(() => (isMenuVisible ? 1 : 0), [isMenuVisible]);

  useEffect(() => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
  }, []);

  const handlePress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const centerLineTransform = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(toggleAnim.value, [0, 1], [0, -45])}deg`,
        },
      ],
    };
  });

  const topLineTransform = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -13.5,
        },
        {
          rotate: `${interpolate(toggleAnim.value, [0, 1], [0, 45])}deg`,
        },
        {
          translateX: interpolate(toggleAnim.value, [0, 1], [13.5, 16]),
        },
      ],
    };
  });

  const bottomLineTransform = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: 13.5,
        },
        {
          rotate: `${interpolate(toggleAnim.value, [0, 1], [0, 45])}deg`,
        },
        {
          translateX: interpolate(toggleAnim.value, [0, 1], [-13.5, -16]),
        },
      ],
    };
  });

  return (
    <View style={HamburgerButtonStyle.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={HamburgerButtonStyle.button}>
          <View style={HamburgerButtonStyle.innerContainer}>
            <Animated.View style={[HamburgerButtonStyle.rowStart, topLineTransform]}>
              <View
                style={[
                  HamburgerButtonStyle.blueBar,
                  HamburgerButtonStyle.narrowBar,
                  HamburgerButtonStyle.blueBarMarginBottom,
                ]}
              />
            </Animated.View>

            <Animated.View style={[HamburgerButtonStyle.blueBar, HamburgerButtonStyle.wideBar, centerLineTransform]} />
            <Animated.View style={[HamburgerButtonStyle.rowEnd, bottomLineTransform]}>
              <View
                style={
                  [HamburgerButtonStyle.blueBar, HamburgerButtonStyle.narrowBar, HamburgerButtonStyle.blueBarMarginTop]}
              />
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
