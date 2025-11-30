import TopVideoList from "@/components/explore/TopVideoList";
import LiveElem from "@/components/live/LiveElem";
import { useLiveByUsername } from "@/entities/stream/useStream";
import { useVideoByUsername } from "@/entities/video/useVideo";
import { Text, ActivityIndicator } from "react-native";
import { View } from "react-native";
import styled from "styled-components";
import { IStreamDataResponse } from "@/entities/video/type";

interface Props {
  username: string;
}

export const UserProfileHome = ({ username }: Props) => {
  const { data: livesData, isLoading: livesLoading, isError: livesError } = useLiveByUsername(username);
  const { data: videosData, isLoading: videosLoading, isError: videosError } = useVideoByUsername(username);

  const topVideoItems = livesData?.map((live: IStreamDataResponse) => ({
    streamId: live.streamId,
    title: live.title,
    thumbnail: live.thumbnail || live.url,
    url: live.url,
    username: live.username,
    nickname: live.nickname,
    profileImage: live.profileImage,
    viewCount: live.viewCount,
  })) || [];

  const videos = videosData?.data || [];

  if (livesLoading || videosLoading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      {topVideoItems.length > 0 && (
        <TopVideoList itemWidthRatio={0.9} items={topVideoItems} />
      )}
      <Content>
        {videos.length > 0 && (
          <>
            <Label>동영상</Label>
            {videos.map((video) => (
              <LiveElem key={video.streamId} video={video} />
            ))}
          </>
        )}
        {videos.length === 0 && !videosLoading && (
          <EmptyText>동영상이 없습니다</EmptyText>
        )}
      </Content>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: column;
  flex: 1;
  padding-top: 20px;

`;

const Content = styled(View)`
  padding: 0 20px;
  gap: 10px;
`;

const Label = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 10px;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const EmptyText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
  padding: 20px 0;
`;
