import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";


const SocketContext: React.Context<Socket | null | undefined> = createContext<Socket | null | undefined>(undefined);

const getSocketURL = (): string => {
  if (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_SOCKET_URL) {
    return process.env.EXPO_PUBLIC_SOCKET_URL;
  }
  
  let configValue: string | undefined;
  try {
    const Config = require("react-native-config");
    const configObj = Config.default || Config;
    if (configObj && typeof configObj === "object") {
      configValue = configObj.VITE_SOCKET_URL;
      if (configValue) {
        return configValue;
      }
    }
  } catch (error) {
    console.warn('[Socket] react-native-config를 사용할 수 없습니다. EXPO_PUBLIC_SOCKET_URL을 사용하세요.');
  }
  
  return "http://localhost:3000";
};

function SocketProvider({ children }: React.PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketURL = getSocketURL();
    console.log('🔌 [Socket] 연결 시도:', socketURL);
    

    const isSecure = socketURL.startsWith('https://') || socketURL.startsWith('wss://');
    console.log('🔌 [Socket] Secure 모드:', isSecure);
    console.log('🔌 [Socket] URL 타입:', {
      isHttps: socketURL.startsWith('https://'),
      isHttp: socketURL.startsWith('http://'),
      isWss: socketURL.startsWith('wss://'),
      isWs: socketURL.startsWith('ws://'),
    });
    

    const newSocket = io(socketURL, {
      transports: ["polling", "websocket"], 
      upgrade: true, 
      rememberUpgrade: false,
      secure: isSecure,
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 20000, // 연결 타임아웃 20초
    });

    console.log('🔌 [Socket] 인스턴스 생성됨, 연결 상태:', newSocket.connected ? '연결됨' : '연결 안됨');

    setSocket(newSocket);

    newSocket.on('connect', () => {
        console.log('========================================');
        console.log('✅ [Socket] 연결 성공!');
        console.log('========================================');
        console.log('🔗 Socket ID:', newSocket.id);
        console.log('🌐 연결 URL:', socketURL);
        console.log('📡 Transport:', newSocket.io.engine.transport.name);
        console.log('✅ 연결 상태:', {
          connected: newSocket.connected,
          disconnected: newSocket.disconnected,
        });
        console.log('========================================');
    });

    newSocket.on('disconnect', (reason) => {
        console.log('❌ [Socket] 연결 끊김:', reason);
        console.log('❌ [Socket] 연결 상태:', {
          connected: newSocket.connected,
          disconnected: newSocket.disconnected,
        });
    });

    newSocket.on('connect_error', (error) => {
        console.error('❌ [Socket] 연결 오류:', error);
        console.error('❌ [Socket] 오류 상세:', {
          message: error.message,
          name: error.name,
          stack: error.stack,
        });
    });

    // 연결 상태 변경 감지
    newSocket.on('reconnect', (attemptNumber) => {
        console.log('🔄 [Socket] 재연결 성공, 시도 횟수:', attemptNumber);
    });

    newSocket.on('reconnect_attempt', (attemptNumber) => {
        console.log('🔄 [Socket] 재연결 시도 중...', attemptNumber);
    });

    newSocket.on('reconnect_error', (error) => {
        console.error('❌ [Socket] 재연결 오류:', error);
    });

    newSocket.on('reconnect_failed', () => {
        console.error('❌ [Socket] 재연결 실패');
    });

    return () => {
      console.log('🔌 [Socket] 정리 중...');
      newSocket.close();
      setSocket(null);
    };
  }, []);


  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

function useSocket(): Socket | null {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

export { SocketContext, SocketProvider, useSocket };