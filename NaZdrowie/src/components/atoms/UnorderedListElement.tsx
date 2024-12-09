import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import primaryColors from "properties/colors";
import { generalStyle } from "properties/styles";
import { GestureResponderEvent, Pressable, Text } from "react-native";

type UnorderedListElementProps = {
  text: string;
  icon: keyof typeof AntDesign.glyphMap | keyof typeof Ionicons.glyphMap;
  color?: string;
  onClick?: (event: GestureResponderEvent) => void;
};

export const UnorderedListElement: React.FC<UnorderedListElementProps> = (
  props: UnorderedListElementProps,
) => {
  const { onClick, text, icon, color } = props;
  const IconComponent = () => {
    if (icon in AntDesign.glyphMap)
      return (
        <AntDesign
          name={icon as keyof typeof AntDesign.glyphMap}
          size={14}
          color={color ? color : "black"}
        />
      );
    else if (icon in Ionicons.glyphMap)
      return (
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={14}
          color={color ? color : "black"}
        />
      );
  };

  if (!IconComponent) {
    console.error(`Icon "${icon}" not found in either AntDesign or Ionicons.`);
    return null; // Fallback if icon isn't found in either library
  }

  if (onClick) {
    return (
      <Pressable onPress={onClick}>
        <Text
          style={[generalStyle.basicText, { color: primaryColors.lightBlue }]}
        >
          {IconComponent()}
          {/* <AntDesign name={icon} size={14} color={color ? color : "black"} /> */}
          {" " + text}
        </Text>
      </Pressable>
    );
  }
  return (
    <Text style={generalStyle.basicText}>
      {IconComponent()}
      {" " + text}
    </Text>
  );
};
