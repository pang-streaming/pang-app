import { FollowButton } from "@/components/follow/FollowButton";
import { OtherUserResponse } from "@/entities/user/type";
import { Image, Text } from "react-native";
import { View } from "react-native";
import styled from "styled-components";


export const UserProfileInfoSection = ({data}:OtherUserResponse) => {
    return(
        <UserInfo>
            {data.profileImage ? (
                <Avatar source={{ uri: data.profileImage }} />
            ) : (
                <AvatarPlaceholder source={require("@/assets/null-profile.png")} />
            )}
            <UserInfoColumn>
              <Name>{data.nickname}</Name>
              <FollowText>팔로워 {data.followerCount}</FollowText>
              <Description>{data.description ?? ''}</Description>
            </UserInfoColumn>
          </UserInfo>
    )
}


const UserInfo = styled(View)`
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const Avatar = styled(Image)`
  width: 90px;
  height: 90px;
  border-radius: ${({ theme }) => theme.borders.maximum};
  background-color: ${({ theme }) => theme.colors.content.normal};
`;

const AvatarPlaceholder = styled(Image)`
  width: 90px;
  height: 90px;
  border-radius: ${({ theme }) => theme.borders.maximum};
  background-color: ${({ theme }) => theme.colors.content.normal};
`;

const UserInfoColumn = styled(View)`
  flex-direction: column;
  gap: 3px;
`;

const Name = styled(Text)`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const FollowText = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin-bottom: 6px;
  margin-top: 4px;
`;

const Description = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;


