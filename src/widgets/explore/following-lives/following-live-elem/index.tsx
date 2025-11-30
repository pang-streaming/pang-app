import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import styled from "styled-components";
import { useRouter } from "expo-router";

interface Props {
    streamId: string;
    streamerName: string;
    profileImage?: string;
    title: string;
    thumbnail?: string;
}

export const FollowingLiveElem = ({streamId, streamerName, profileImage, thumbnail, title}: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/stream-viewer?streamId=${streamId}`);
  };

  return (
    <Container onPress={handlePress}>
      {thumbnail ? (
        <Thumbnail source={{ uri: thumbnail }} />
      ) : (
        <ThumbnailPlaceholder />
      )}
      <Label>{title}</Label>
      <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
        {profileImage ? (
          <Avatar source={{ uri: profileImage }} />
        ) : (
          <Avatar source={require('@/assets/null-profile.png')} />
        )}
        <StreamerName>{streamerName}</StreamerName>
      </View>
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  flex-direction: column;
`;

const Thumbnail = styled(Image)`
  width: 195px;
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.medium};
`;

const ThumbnailPlaceholder = styled(View)`
  width: 195px;
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.medium};
`;

const Label = styled(Text) `
    font-size: 14px;
    margin: 4px 0;
    font-weight: 600;
    color: ${({theme}) => theme.colors.text.normal};
`
const Avatar = styled(Image)`
    width: 22px;
    height: 22px;
    background-color: ${({ theme }) => theme.colors.content.normal};
    border-radius: ${({theme}) => theme.borders.maximum};
`
const StreamerName = styled(Text)`
    font-size: 14px;
    font-weight: 600;
    color: ${({theme}) => theme.colors.text.subtitle};
`