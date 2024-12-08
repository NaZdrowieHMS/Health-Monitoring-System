import AntDesign from "@expo/vector-icons/AntDesign";
import { generalStyle } from "properties/styles";
import { Text } from "react-native";

type UnorderedListElementProps = {
  text: string;
  icon: keyof typeof AntDesign.glyphMap;
  color?: string;
};

export const UnorderedListElement: React.FC<UnorderedListElementProps> = (
  props: UnorderedListElementProps,
) => {
  const { text, icon, color } = props;
  return (
    <Text style={generalStyle.basicText}>
      <AntDesign name={icon} size={14} color={color ? color : "black"} />
      {" " + text}
    </Text>
  );
};
