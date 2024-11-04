import { AiResults } from "properties/types/AiDataProps";

import axiosInstance from "./axios";

export const getAiPrediction: (
  base64Image: string,
) => Promise<AiResults> = async (base64Image: string) => {
  try {
    const response = await axiosInstance.post(
      // TODO: zmienić to na właiwy url
      "http://localhost:5001/predictions/test",
      {
        image: base64Image,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
