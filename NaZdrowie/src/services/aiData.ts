import { AiResults } from "properties/types/AiDataProps";
import { axiosAiApi } from "./axios";


export const getAiPrediction: (
  base64Image: string,
) => Promise<AiResults> = async (base64Image: string) => {
  try {
    const response = await axiosAiApi.post(
      // TODO: zmienić to na właiwy url
      "TODO",
      {
        image: base64Image,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
