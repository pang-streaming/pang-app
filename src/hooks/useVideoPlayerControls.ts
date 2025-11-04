import { useVideoPlayer, VideoPlayer } from 'expo-video';
import { useEvent } from 'expo';

interface UseVideoPlayerControlsOptions {
  source: string;
  onPlayPause?: () => void;
}

export function useVideoPlayerControls({ 
  source, 
  onPlayPause 
}: UseVideoPlayerControlsOptions) {
  const player = useVideoPlayer(source, (player: VideoPlayer) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    onPlayPause?.();
  };

  return {
    player,
    isPlaying,
    handlePlayPause,
  };
}

