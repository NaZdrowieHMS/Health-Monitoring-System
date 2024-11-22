import { View } from "react-native";
import { useContext } from "react";
import { LinkButton } from "components/atoms";
import { HamburgerMenuContext } from "components/organisms/context/HamburgerMenuProvider";
import { HamburgerMenuStyle } from "properties/styles/hamburgerMenuStyle";
import { useNavigation } from "@react-navigation/native";
import { StringNavigation } from "properties/types";

export const HamburgerMenu = () => {
  const { setIsMenuVisible } = useContext(HamburgerMenuContext);

  const { navigate } = useNavigation<StringNavigation>();

  const handleNavigation = (path: string) => {
    if (path === null) {
      return;
    }
    navigate(path);
    setIsMenuVisible(false);
  };
  const defaultButtons = [
    {
      title: "Ustawienia",
      path: null,
    },
    {
      title: "O Aplikacji",
      path: null,
    },
    {
      title: "Kontakt",
      path: null,
    },
    {
      title: "Wyloguj",
      path: "Login",
    },
  ];

  return (
    <View style={HamburgerMenuStyle.container}>
      {defaultButtons.map((button) => (
        <LinkButton
          title={button.title}
          handleOnClick={() => handleNavigation(button.path)}
          key={button.title}
        />
      ))}
    </View>
  );
};
