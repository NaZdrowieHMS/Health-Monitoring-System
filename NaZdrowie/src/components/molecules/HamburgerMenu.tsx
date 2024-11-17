import { View } from "react-native";
import { useContext } from "react";
import { UserContext } from "components/organisms/context";
import { LinkButton } from "components/atoms";
import { HamburgerMenuContext } from "components/organisms/context/HamburgerMenuProvider";
import { HamburgerMenuStyle } from "properties/styles/hamburgerMenuStyle";

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

export const HamburgerMenu = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const { setIsMenuVisible } = useContext(HamburgerMenuContext);

  const navigate = (path) => {
    if (path === null) {
      return;
    }
    navigation(path);
    setIsMenuVisible(false);
  };

  return (
    <View style={HamburgerMenuStyle.container}>
      {defaultButtons.map((button) => (
        <LinkButton
          title={button.title}
          handleOnClick={() => navigate(button.path)}
          key={button.title}
        />
      ))}
    </View>
  );
};
