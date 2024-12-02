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

import { UserContext } from "components/organisms/context";
import {
  usePatientData,
  useAiData,
  formatCommentsData,
} from "components/organisms/dataHooks";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useCallback, useContext, useState } from "react";
import { ScrollView, View, Text, SafeAreaView } from "react-native";

import {
  useFetchResultCommentsData,
  useSendResultComment,
} from "services/commentsData";
import { useFetchResult } from "services/resultsData";
import { doctorDataPagination } from "services/utils";

export const ResultPreviewScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "ResultPreview">) => {
  const { currentUser } = useContext(UserContext);
  const { resultId, patientId, resultTitle } = route.params;
  const [comment, setComment] = useState<string>();
  const { isSuccess, data: result } = useFetchResult(
    currentUser,
    resultId,
    null,
    patientId,
  );
  const { preparePatientData } = usePatientData(currentUser, patientId);
  const { handleCheckboxForAiSelection, updateAiSelectedData } = useAiData(
    currentUser,
    patientId,
  );
  const resultComments = useFetchResultCommentsData(
    currentUser,
    resultId,
    (data) => data.map(formatCommentsData),
    doctorDataPagination.resultComments,
    patientId,
  );

  const patientData = preparePatientData();

  useFocusEffect(
    useCallback(() => {
      return updateAiSelectedData;
    }, []),
  );

  const handleSendComment = () => {
    if (comment.length > 0) {
      useSendResultComment(currentUser, patientId).mutateAsync({
        resultId: resultId,
        doctorId: currentUser.id,
        content: comment,
      }); // here you can define onSuccess, onError and onSettled logic
    }
  };

  return (
    <>
      {patientData.isSuccess ? (
        <Navbar
          navbarDescriptionTitle={`${patientData.data.name} ${patientData.data.surname}`}
        />
      ) : (
        <Navbar navbarDescriptionTitle="..." />
      )}
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          <Text style={generalStyle.titleText}>{resultTitle}</Text>
          {isSuccess && result.content !== undefined ? (
            <>
              <ImageCard
                title="Podgląd"
                imageData={result.content.data}
                imageType={result.content.type}
              />
              <View style={generalStyle.rowSpread}>
                <Text style={generalStyle.titleText}>Uzyj do analizy AI</Text>
                <PersonalizedCheckbox
                  checkboxInitialValue={result.aiSelected}
                  handleValueChange={(value: boolean) =>
                    handleCheckboxForAiSelection(result.id, value)
                  }
                />
              </View>
              <PersonalizedTextInput
                placeholder="Wpisz nowy komentarz"
                onChange={setComment}
                iconButton={<SendButton handleOnClick={handleSendComment} />}
              />
            </>
          ) : (
            <LoadingCard />
          )}
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
