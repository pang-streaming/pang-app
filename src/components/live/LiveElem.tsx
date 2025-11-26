import { ImageBackground, Text, View, Image, Pressable } from "react-native";
import styled, { ThemeProps } from "styled-components/native";
import { LiveChip } from "../ui/LiveChip";
import { More } from "../icons/More";
import { IStreamDataResponse } from "@/entities/video/type";
import { LastVideo } from "@/entities/video/type";
import { useRouter } from "expo-router";
import { fetchLiveStreamDetail } from "@/entities/stream/api";
import NormalThumbnail from '@/assets/thumbnail.svg'

interface LiveElemProps {
  stream?: IStreamDataResponse;
  video?: LastVideo;
}

export default function LiveElem({ stream, video }: LiveElemProps) {
  const router = useRouter();
  const data = stream || video;
  const thumbnail = data?.thumbnail || data?.url;
  const title = data?.title || "";
  const nickname = data?.nickname || "";
  const profileImage = data?.profileImage || "";
  const viewCount = stream?.viewCount || video?.viewCount || 0;
  const streamId = stream?.streamId || video?.streamId;

  const handlePress = async () => {
    if (!streamId) return;
    
    try {
      await fetchLiveStreamDetail(streamId);
      router.push(`/stream-viewer?streamId=${streamId}`);
    } catch (error) {
      console.error("Failed to fetch stream detail:", error);
    }
  };

  return (
    <Container onPress={handlePress}>
      {thumbnail ? (
        <Thumbnail source={{ uri: thumbnail }}>
          {stream && <LiveChip viewerCount={viewCount} />}
        </Thumbnail>
      ) : (
        <ThumbnailPlaceholder>
          <NormalThumbnail width="100%" height="100%" />
          {stream && <LiveChip viewerCount={viewCount} />}
        </ThumbnailPlaceholder>
      )}
      <InfoSection>
        <Title>{title}</Title>
        <View style={{ flexDirection: "row", alignItems: 'center', gap: 3 }}>
          {profileImage ? (
            <ProfileImage source={{ uri: profileImage }} />
          ) : (
            <ProfileImage source={require("@/assets/null-profile.png")} />
          )}
          <StreamerName>{nickname}</StreamerName>
        </View>
      </InfoSection>
        <More />
    </Container>
  );
}

const Container = styled(Pressable)`
  width: 100%;
  gap: 10px;
  flex-direction: row;
`;
const Thumbnail = styled(ImageBackground)`
  width: 158px;
  height: 89px;
  border-radius: 4px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
  position: relative;
  overflow: hidden;
`;

const ThumbnailPlaceholder = styled(View)`
  width: 158px;
  height: 89px;
  border-radius: 4px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const InfoSection = styled(View)`
  flex: 1;
`;
const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  margin-bottom: 5px;
`;
const ProfileImage = styled(Image)`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  object-fit: cover;
`;
const StreamerName = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
  margin-bottom: 3px;
`;
