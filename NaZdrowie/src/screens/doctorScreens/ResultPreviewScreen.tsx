import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import {
  PersonalizedCheckbox,
  PersonalizedTextInput,
  SendButton,
} from "components/atoms";
import { ImageCard, CommentsCard, Navbar } from "components/molecules";
import { QueryWrapper } from "components/organisms";

import { UserContext } from "components/organisms/context";
import {
  usePatientData,
  useAiData,
  formatCommentsData,
} from "components/organisms/dataHooks";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useCallback, useContext, useState } from "react";
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";

import {
  useFetchResultCommentsData,
  useSendResultComment,
} from "services/commentsData";
import {
  useFetchResult,
  useFetchResultContent,
  useMarkResultAsViewed,
} from "services/resultsData";
import { doctorDataPagination } from "services/utils";

export const ResultPreviewScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "ResultPreview">) => {
  const { currentUser } = useContext(UserContext);
  const { resultId, patientId, resultTitle } = route.params;
  const [comment, setComment] = useState<string>();
  const { preparePatientData } = usePatientData(currentUser, patientId);
  const { handleCheckboxForAiSelection, updateAiSelectedData } = useAiData(
    currentUser,
    patientId,
  );
  const viewResult = useMarkResultAsViewed(currentUser);
  const resultQuery = useFetchResult(currentUser, resultId, null, patientId);
  const resultContentQuery = useFetchResultContent(
    currentUser,
    resultId,
    patientId,
  );
  const resultCommentsQuery = useFetchResultCommentsData(
    currentUser,
    resultId,
    (data) => data.map(formatCommentsData),
    doctorDataPagination.resultComments,
    patientId,
  );
  const sendResultComment = useSendResultComment(
    currentUser,
    patientId,
    resultId,
  );
  const patientData = preparePatientData();
  useFocusEffect(
    useCallback(() => {
      viewResult.mutate({ patientId, resultId, doctorId: currentUser.id });
      return updateAiSelectedData;
    }, []),
  );

  const handleSendComment = async () => {
    if (comment.length > 0) {
      if (comment.trim().length > 0) {
        await sendResultComment.mutateAsync({
          resultId: resultId,
          doctorId: currentUser.id,
          content: comment,
        });
        setComment("");
      }
    }
  };

  return (
    <>
      <QueryWrapper
        queries={[patientData]}
        renderSuccess={([patient]) => (
          <Navbar
            navbarDescriptionTitle={`${patient.name} ${patient.surname}`}
          />
        )}
        renderLoading={() => <Navbar navbarDescriptionTitle="..." />}
        renderError={(errors) => {
          Toast.show({
            type: "error",
            text1: "Błąd w pobieraniu informacji o pacjenice",
            text2: errors.join(" "),
          });
          return <Navbar navbarDescriptionTitle="..." />;
        }}
      />
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          <Text style={generalStyle.titleText}>{resultTitle}</Text>
          <QueryWrapper
            queries={[resultQuery]}
            renderSuccess={([result]) => {
              return (
                <>
                  <QueryWrapper
                    queries={[resultContentQuery]}
                    temporaryTitle="Podgląd"
                    renderSuccess={([resultContent]) => (
                      <ImageCard
                        title="Podgląd"
                        imageData={resultContent.data}
                        imageType={resultContent.type}
                      />
                    )}
                  />
                  <View style={generalStyle.rowSpread}>
                    <Text style={generalStyle.titleText}>
                      Uzyj do analizy AI
                    </Text>
                    <PersonalizedCheckbox
                      checkboxInitialValue={result.aiSelected}
                      handleValueChange={(value: boolean) =>
                        handleCheckboxForAiSelection(result.id, value)
                      }
                    />
                  </View>
                </>
              );
            }}
          />
          <PersonalizedTextInput
            placeholder="Wpisz nowy komentarz"
            onChange={setComment}
            value={comment}
            iconButton={<SendButton handleOnClick={handleSendComment} />}
          />
          <QueryWrapper
            queries={[resultCommentsQuery]}
            temporaryTitle="Komentarze do badania"
            renderSuccess={([resultComments]) => (
              <CommentsCard
                title="Komentarze do badania"
                data={resultComments}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
