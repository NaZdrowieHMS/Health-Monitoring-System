import AntDesign from "@expo/vector-icons/AntDesign";
import { IconButtonProps } from "properties/types";
import { Pressable } from "react-native";

export const IconButton: React.FC<IconButtonProps> = (
  props: IconButtonProps,
) => {
  const { handleOnClick, size, color, type } = props;
  return (
    <Pressable onPress={handleOnClick}>
      <AntDesign
        name={type}
        size={size ? size : 24}
        color={color ? color : "black"}
      />
    </Pressable>
  );
};
