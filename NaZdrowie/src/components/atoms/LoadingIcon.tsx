import primaryColors from "properties/colors";
import { loadingButtonStyles } from "properties/styles";
import React from "react";
import { View, ActivityIndicator } from "react-native";

export const LoadingIcon = () => {
  return (
    <View style={loadingButtonStyles.container}>
      <ActivityIndicator size="large" color={primaryColors.darkBlue} />
    </View>
  );
};
