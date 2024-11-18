import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, OverlayProvider } from "components/organisms/context";
import { PatientResult } from "properties/types";
import React from "react";
import { View } from "react-native";
import {
  LoginScreen,
  RegisterScreen,
  ChoiceScreen,
} from "screens/authentication";
import {
  AllPatientsScreen,
  PatientDetailsScreen,
  AiDiagnosis,
  NewPatientsScreen,
} from "screens/doctorScreens";
import { ResultPreviewScreen } from "screens/doctorScreens/ResultPreviewScreen";
import { MainScreen } from "screens/main";
import { QrScannerScreen } from "screens/patientScreens";
import { axiosApi } from "services/axios";
import { HamburgerMenuProvider } from "components/organisms/context/HamburgerMenuProvider";
import primaryColors from "properties/colors";
import { AllResultsScreen } from "screens/patientScreens/AllResultsScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 2000,
      staleTime: 60_000,
      queryFn: async ({ queryKey }) => {
        const lastKey = queryKey[queryKey.length - 1];
        if (typeof lastKey === "string") {
          const { data } = await axiosInstance.get(lastKey);
          return data;
        }
      },
    },
  },
});
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Register: { doctorScreen: boolean };
  Choice: undefined;
  MainScreen: undefined;
  QrScanner: undefined;
  AllPatients: undefined;
  NewPatients: undefined;
  PatientDetails: { patientId: number };
  AiDiagnosis: { patientId: number };
  ResultPreview: { result: PatientResult; patientId: number };
  AllResults: { patientId: number };
};

const App = (): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <UserProvider>
          <HamburgerMenuProvider>
            <View style={{ flex: 1, backgroundColor: primaryColors.white }}>
              <NavigationContainer>
                <Stack.Navigator id={undefined}>
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: "Logowanie", headerShown: false }}
                  />
                  <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ title: "Rejestracja", headerShown: false }}
                  />
                  <Stack.Screen
                    name="Choice"
                    component={ChoiceScreen}
                    options={{ title: "Logowanie", headerShown: false }}
                  />
                  <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{ title: "Strona główna", headerShown: false }}
                  />
                  <Stack.Screen
                    name="QrScanner"
                    component={QrScannerScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="AllPatients"
                    component={AllPatientsScreen}
                    options={{ title: "Moi pacjenci", headerShown: false }}
                  />
                  <Stack.Screen
                    name="NewPatients"
                    component={NewPatientsScreen}
                    options={{ title: "Znajdź pacjenta", headerShown: false }}
                  />
                  <Stack.Screen
                    name="PatientDetails"
                    component={PatientDetailsScreen}
                    options={{ title: "Dane pacjenta", headerShown: false }}
                  />
                  <Stack.Screen
                    name="AiDiagnosis"
                    component={AiDiagnosis}
                    options={{ title: "Diagnozuj z AI", headerShown: false }}
                  />
                  <Stack.Screen
                    name="ResultPreview"
                    component={ResultPreviewScreen}
                    options={{ title: "Podgląd wyniku", headerShown: false }}
                  />
                  <Stack.Screen
                    name="AllResults"
                    component={AllResultsScreen}
                    options={{ title: "Historia wyników", headerShown: false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </HamburgerMenuProvider>
        </UserProvider>
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default App;
