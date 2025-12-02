import { useEffect, useState } from "react";
import { useSocket } from "./socket-provider";
import { randomColor } from "./random-color";
import * as SecureStore from "expo-secure-store";


export interface ChatItem {
  viewerName: string;
  chatting: string;
  color: string;
  type?: 'message' | 'sponsor';
  sponsorAmount?: number;
  message?: string;
}
export interface ISendDonationMessageRequest {
  token?: string
  roomId: string;   
  message?: string; 
  amount: number;   
  voiceId?: string; 
  youtube?: string;
}


export const useChat = (streamId: string) => {
  const getToken = async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync("accessToken");
    } catch (error) {
      console.warn('[Chat] 토큰을 가져오는 중 오류:', error);
      return null;
    }
  };
  
  const socket = useSocket();
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    if (!socket || !streamId) {
      console.warn('[Chat] 소켓 또는 streamId가 없습니다:', { socket: !!socket, streamId });
      return;
    }

    console.log('[Chat] 방 입장 시도:', streamId);

    const join = () => {
      console.log('[Chat] 소켓 연결됨, 방 입장:', streamId);
      socket.emit("join_room", streamId);
    };

    if (socket.connected) {
      join();
    } else {
      console.log('[Chat] 소켓 연결 대기 중...');
    }

    socket.on("connect", join);
    const handleChatMessage = (data: any) => {
      setChatList((prev) => [
        ...prev,
        {
          viewerName: data.nickname,
          chatting: data.message,
          color: randomColor(),
          type: 'message',
        },
      ]);
    };

    const handleSponsorMessage = (data: any) => {
      console.log("받은 후원 메시지:", data);
      setChatList((prev) => [
        ...prev,
        {
          viewerName: data.nickname || "익명",
          chatting: `${data.amount?.toLocaleString()}개를 후원하셨습니다`,
          color: "#ff6b6b",
          type: 'sponsor',
          sponsorAmount: data.amount,
          message: data.message
        },
      ]);
    };

    socket?.on("chat_message", handleChatMessage);
    socket?.on("donation_message", handleSponsorMessage);

    return () => {
      socket.off("connect", join);
      socket.off("chat_message", handleChatMessage);
      socket.off("donation_message", handleSponsorMessage);
    };
  }, [socket, streamId]);

  const sendMessage = async (overrideMessage?: string) => {
    if (!socket || !socket.connected) {
      console.warn("Socket is not connected");
      return;
    }
    const token = await getToken();
    const messageToSend = overrideMessage ?? chat;
    const trimmedMessage = messageToSend.trim();
    if (!trimmedMessage) {
      console.warn("Message is empty");
      return;
    }
    if (!token) {
      console.warn("Access token is missing");
      return;
    }
    console.log("Sending message:", { token: token, message: trimmedMessage, roomId: streamId });
    socket.emit("chat_message", {
      token,
      message: trimmedMessage,
      roomId: streamId,
    });
    if (overrideMessage === undefined) {
      setChat("");
    }
  };

  const addSponsorMessage = async (data:ISendDonationMessageRequest) => {
    if (socket && socket.connected) {
      const token = await getToken();
      if (token) {
        data.token = token;
        socket.emit("send_donation", data);
      } else {
        console.warn("Access token is missing for donation");
      }
    }
  };

  return { chat, setChat, chatList, sendMessage, addSponsorMessage };
};
