import axiosClient from '@/config/axios';
import { AxiosError } from 'axios';

async function verifyRoom(roomId: string) {
  try {
    if (!roomId) return false;

    await axiosClient.get(`rooms/${roomId}`);

    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;

      console.log(errorMessage);
    } else {
      console.log(error);
    }

    return false;
  }
}

export default verifyRoom;
