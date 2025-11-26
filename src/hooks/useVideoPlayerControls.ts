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
  
  const player = useVideoPlayer(source || '', (player: VideoPlayer) => {
    if (source) {
      try {
        player.loop = !isLive; // 라이브 스트림은 반복하지 않음
        console.log('Video player initialized with source:', source, 'isLive:', isLive);
        
        // 에러 리스너 추가
        const statusListener = player.addListener('statusChange', (status) => {
          console.log('Player status:', status);
          if (status.error) {
            console.error('Player error:', status.error);
            setPlayerError(status.error.message || String(status.error));
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
    if (!player || !source) {
      return;
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
      console.log('Updating video player with source:', source, 'isLive:', isLive);
      setPlayerError(null);
      player.replace(source);
      player.loop = !isLive;
      
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
  }, [source, isLive, player]);

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

