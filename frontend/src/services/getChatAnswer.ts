import axios from "axios";

export const getChatAnswer = async (query: string): Promise<string> => {
  const response = await axios.get(`http://localhost:8080/chat_api/${query}`);
  return response.data;
};
