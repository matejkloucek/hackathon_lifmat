import axios from "axios";

export const getChatAnswer = async (query: string): Promise<string> => {
  const response = await axios.get(`http://192.168.116.41:8080/chat_api/${query}`);
  return response.data;
};
