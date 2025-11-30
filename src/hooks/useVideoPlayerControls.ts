import { useVideoPlayer, VideoPlayer } from 'expo-video';
import { useEvent } from 'expo';
import { useEffect, useState } from 'react';

interface UseVideoPlayerControlsOptions {
  source: string;
  onPlayPause?: () => void;
  isLive?: boolean;
}

export function useVideoPlayerControls({ 
  source, 
  onPlayPause,
  isLive = false
}: UseVideoPlayerControlsOptions) {
  const [playerError, setPlayerError] = useState<string | null>(null);
  
  // URL 유효성 검사 함수
  const isValidUrl = (url: string | null | undefined): boolean => {
    if (!url || url.trim() === '') return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };
  
  // 유효한 소스가 있을 때만 플레이어 초기화
  // 더미 URL을 사용하여 플레이어를 초기화하되, 실제 URL이 준비될 때까지 업데이트하지 않음
  const validSource = isValidUrl(source) ? source : null;
  const dummySource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  
  const player = useVideoPlayer(validSource || dummySource, (player: VideoPlayer) => {
    if (validSource) {
      try {
        player.loop = !isLive; // 라이브 스트림은 반복하지 않음
        console.log('Video player initialized with source:', validSource, 'isLive:', isLive);
        
        // 에러 리스너 추가
        const statusListener = player.addListener('statusChange', (status) => {
          console.log('Player status:', status);
          if (status.error) {
            // 더미 URL로 인한 오류는 무시
            if (!validSource) {
              return;
            }
            console.error('Player error:', status.error);
            const errorMessage = status.error.message || String(status.error);
            // 특정 오류 메시지를 더 사용자 친화적으로 변환
            if (errorMessage.includes('Failed to load') || errorMessage.includes('could not be completed')) {
              setPlayerError('비디오를 불러올 수 없습니다. 네트워크 연결을 확인해주세요.');
            } else {
              setPlayerError(errorMessage);
            }
          }
        
          // 플레이어가 준비되면 재생
          if (status.status === 'readyToPlay') {
            try {
              if (!player.playing) {
                console.log('Player ready, starting playback');
                setTimeout(() => {
                  try {
                    player.play();
                  } catch (playError) {
                    console.error('Error playing video:', playError);
                  }
                }, 100);
              }
            } catch (error) {
              console.error('Error checking playing state:', error);
            }
          }
        });
        
        // 초기 재생 시도
        setTimeout(() => {
          try {
            if (!player.playing) {
              player.play();
            }
          } catch (error) {
            console.error('Error in initial play attempt:', error);
          }
        }, 500);
      } catch (error) {
        console.error('Error initializing video player:', error);
        setPlayerError(String(error));
      }
    }
  });

  // 소스가 변경되면 플레이어 업데이트
  useEffect(() => {
    if (!player) {
      return;
    }
    
    // 유효한 소스가 없으면 업데이트하지 않음
    if (!validSource) {
      return;
    }
    
    // 현재 플레이어의 소스와 동일하면 업데이트하지 않음
    try {
      const currentSource = (player as any).source;
      if (currentSource === validSource) {
        return;
      }
    } catch (error) {
      // 소스를 확인할 수 없으면 계속 진행
    }

    // 플레이어가 유효한지 확인
    try {
      // 플레이어 객체가 유효한지 간단히 확인
      if (typeof player !== 'object') {
        return;
      }
    } catch (error) {
      console.warn('Player not ready, skipping update:', error);
      return;
    }

    try {
      console.log('Updating video player with source:', validSource, 'isLive:', isLive);
      setPlayerError(null);
      
      // 플레이어가 현재 더미 소스를 사용 중이면 즉시 교체
      try {
        const currentSource = (player as any).source;
        if (currentSource === dummySource || currentSource !== validSource) {
          player.replace(validSource);
          player.loop = !isLive;
        }
      } catch {
        // 소스를 확인할 수 없으면 그냥 교체
        player.replace(validSource);
        player.loop = !isLive;
      }
      
      // 플레이어 상태 확인 후 재생
      let status: string | undefined;
      try {
        status = player.status;
        console.log('Current player status:', status);
      } catch (error) {
        console.warn('Could not get player status, waiting for ready state:', error);
        // 상태를 가져올 수 없으면 리스너를 통해 처리
        return;
      }
      
      if (status === 'readyToPlay') {
        try {
          if (!player.playing) {
            setTimeout(() => {
              try {
                player.play();
              } catch (playError) {
                console.error('Error playing video:', playError);
              }
            }, 500);
          }
        } catch (error) {
          console.error('Error checking playing state:', error);
        }
      } else if (status === 'loading') {
        // 상태가 로딩 중이면 준비될 때까지 기다린 후 재생
        let retryCount = 0;
        const maxRetries = 10; // 최대 10번 재시도 (약 2초)
        
        const checkAndPlay = () => {
          // 플레이어가 유효한지 확인
          if (!player) {
            return;
          }
          
          try {
            const currentStatus = player.status;
            if (currentStatus === 'readyToPlay') {
              try {
                if (!player.playing) {
                  player.play();
                }
              } catch (playError) {
                console.error('Error playing video:', playError);
              }
            } else if (currentStatus === 'loading' && retryCount < maxRetries) {
              retryCount++;
              setTimeout(checkAndPlay, 200);
            }
          } catch (error) {
            // 플레이어가 아직 준비되지 않았으면 재시도하지 않고 종료
            console.warn('Player not ready in checkAndPlay, stopping retry:', error);
            return;
          }
        };
        setTimeout(checkAndPlay, 500);
      }
    } catch (error) {
      console.error('Error updating video player:', error);
      setPlayerError(String(error));
    }
  }, [validSource, isLive, player]);

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player?.playing ?? false,
  });

  const handlePlayPause = () => {
    if (!player) return;
    
    try {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
      onPlayPause?.();
    } catch (error) {
      console.error('Error in handlePlayPause:', error);
    }
  };

  return {
    player,
    isPlaying,
    handlePlayPause,
    error: playerError,
  };
}

