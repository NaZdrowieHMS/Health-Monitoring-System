import { DownloadButton } from "components/atoms/buttons";
import { cardStyle, generalStyle } from "properties/styles";
import React from "react";
import { Text, View, Image } from "react-native";

export const ImageCard: React.FC<{
  title: string;
  imageData: string;
  imageType: string;
}> = (props: { title: string; imageData: string; imageType: string }) => {
  const { title, imageData, imageType } = props;

  return (
    <View style={cardStyle.container}>
      <View style={generalStyle.rowSpread}>
        <Text style={generalStyle.titleText}>{title}</Text>
        <DownloadButton handleOnClick={() => console.log("siema")} />
      </View>

      <Image
        style={{ width: "80%", height: 150, marginLeft: "10%" }}
        source={{ uri: `data:${imageType};base64,${imageData}` }}
      />
    </View>
  );
};
