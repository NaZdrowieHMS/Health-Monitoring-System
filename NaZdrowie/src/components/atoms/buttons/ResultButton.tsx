import { buttonStyle, generalStyle, userButtonStyle } from "properties/styles";
import { ButtonProps } from "properties/types";
import React from "react";
import { Pressable, Text } from "react-native";

export type ResultButtonElement = ReturnType<typeof ResultButton>;

export const ResultButton: React.FC<ButtonProps & { date: string }> = (
    props: ButtonProps & { date: string },
) => {
    const { handleOnClick, title, date } = props;

    return (
        <Pressable
            style={[buttonStyle.buttonContainer, userButtonStyle.buttonContainer]}
    onPress={handleOnClick}
    >
    <Text style={generalStyle.basicText}>{date}</Text>
    <Text style={generalStyle.basicText}>{title}</Text>
    </Pressable>
);
};
