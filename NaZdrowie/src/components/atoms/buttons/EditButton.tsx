import Feather from "@expo/vector-icons/Feather";
import { IconButtonProps } from "properties/types";
import { Pressable } from "react-native";

export const EditButton: React.FC<IconButtonProps> = (
  props: IconButtonProps,
) => {
  const { handleOnClick, size, color } = props;
  return (
    <Pressable onPress={handleOnClick}>
      <Feather
        name="edit"
        size={size ? size : 24}
        color={color ? color : "black"}
      />
    </Pressable>
  );
};
