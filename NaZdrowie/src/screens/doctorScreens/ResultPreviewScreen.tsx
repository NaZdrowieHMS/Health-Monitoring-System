import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import {
  PersonalizedCheckbox,
  PersonalizedTextInput,
  SendButton,
} from "components/atoms";
import {
  ImageCard,
  CommentsCard,
  LoadingCard,
  Navbar,
} from "components/molecules";
import { useDoctorData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useContext, useState } from "react";
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import {
  useFetchResultCommentsData,
  useSendResultComment,
} from "services/commentsData";
import { cardCommentsCount } from "services/config";
import { useFetchPatient } from "services/patientData";
import { formatCommentsData } from "services/utils";

export const ResultPreviewScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ResultPreview">) => {
  const { currentUser } = useContext(UserContext);
  const { result, patientId } = route.params;
  const patient = useFetchPatient(currentUser, null, patientId);
  const [comment, setComment] = useState<string>();
  const { handleCheckboxForAiSelection, updateAiSelectedData } = useDoctorData(navigation, currentUser, patientId)
  const resultComments = useFetchResultCommentsData(
    currentUser,
    result.id,
    (data) => data.map(formatCommentsData),
    cardCommentsCount,
  );

  useFocusEffect(
    updateAiSelectedData
  )

  const sendResultComment = useSendResultComment(currentUser);

  const handleSendComment = () => {
    if (comment.length > 0) {
      sendResultComment.mutateAsync({
        resultId: result.id,
        doctorId: currentUser.id,
        content: comment,
      }); // here you can define onSuccess, onError and onSettled logic
    }
  };

  return (
    <>
      {patient.isSuccess ? (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle={`${patient.data.name} ${patient.data.surname}`}
        />
      ) : (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle="..."
        />
      )}
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          <Text style={generalStyle.titleText}>{result.testType}</Text>
          <ImageCard
            title="Podgląd"
            imageData={result.content.data}
            imageType={result.content.type}
          />
          <View style={generalStyle.rowSpread}>
            <Text style={generalStyle.titleText}>Uzyj do analizy AI</Text>
            <PersonalizedCheckbox
              checkboxValue={result.ai_selected}
              handleValueChange={() => handleCheckboxForAiSelection(result.id)}
            />
          </View>
          <PersonalizedTextInput
            placeholder="Wpisz nowy komentarz"
            onChange={setComment}
            iconButton={<SendButton handleOnClick={handleSendComment} />}
          />
          {resultComments.isSuccess ? (
            <CommentsCard
              title="Komentarze do badania"
              data={resultComments.data}
            />
          ) : (
            <LoadingCard />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
