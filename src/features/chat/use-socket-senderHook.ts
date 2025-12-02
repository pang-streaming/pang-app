import { useCallback } from "react";
import { useSocket } from "./socket-provider";



function useSocketSender(channel: string) {
  const socket = useSocket(); 
  
  const emitter = useCallback((data: unknown) => {
    if (!socket || !socket.connected) {
      console.warn(`Socket is not connected. Cannot emit to channel: ${channel}`);
      return;
    }
    
    socket.emit(channel, data);
  }, [socket, channel]);
  
  return emitter;
}

export default useSocketSender;