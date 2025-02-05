import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { IconButtonProps } from "properties/types";
import { Pressable } from "react-native";

const IconButton: React.FC<
  IconButtonProps & { type: keyof typeof AntDesign.glyphMap }
> = (props: IconButtonProps & { type: keyof typeof AntDesign.glyphMap }) => {
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

export const EditButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return <IconButton type="edit" {...props} />;
};

export const DownloadButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return <IconButton type="download" {...props} />;
};

export const SendButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return <IconButton type="doubleright" {...props} />;
};

export const InfoButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return <IconButton type="infocirlceo" {...props} />;
};

export const DeleteButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return <IconButton type="delete" {...props} />;
};
export const EyeButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return <IconButton type="eye" {...props} />;
};
export const EyeOffButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return <Ionicons name="eye-off" size={30} {...props} />;
};
