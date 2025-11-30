import { useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyInfo, updateMyInfo, uploadImage } from "@/entities/user/api";
import * as ImagePicker from "expo-image-picker";

export const useEdit = () => {
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const user = data?.data;

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || "");
      setProfileImageUrl(user.profileImage || "");
    }
  }, [user]);

  const handleImageUpload = async () => {
    try {
      // 권한 요청
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
        return;
      }

      // 이미지 선택
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const imageUri = result.assets[0].uri;
      
      setIsUploading(true);
      
      // FormData 생성
      const formData = new FormData();
      const filename = imageUri.split('/').pop() || 'profile.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;
      
      formData.append('image', {
        uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
        name: filename,
        type: type,
      } as any);

      // 이미지 업로드
      const uploadResponse = await uploadImage(formData);
      console.log("이미지 업로드 응답:", uploadResponse);
      
      const imageUrl = uploadResponse.data || uploadResponse.url || uploadResponse;
      setProfileImageUrl(imageUrl);
      
      Alert.alert("성공", "프로필 이미지가 업로드되었습니다.");
    } catch (error: any) {
      console.error("이미지 업로드 실패:", error);
      const errorMessage = error?.message || String(error);
      
      if (errorMessage.includes("Cannot find module") || errorMessage.includes("expo-image-picker")) {
        Alert.alert(
          "모듈 오류", 
          "expo-image-picker 모듈을 찾을 수 없습니다.\n\n앱을 재시작하거나 개발 빌드를 다시 해주세요:\n1. Metro bundler 재시작 (--clear 옵션)\n2. 앱 재시작"
        );
      } else {
        Alert.alert(
          "업로드 실패",
          error.response?.data?.message || errorMessage || "이미지 업로드에 실패했습니다."
        );
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleComplete = async () => {
    if (!nickname.trim()) {
      Alert.alert("오류", "닉네임을 입력해주세요.");
      return;
    }

    setIsSaving(true);
    try {
      await updateMyInfo(
        nickname.trim(),
        undefined,
        undefined,
        profileImageUrl || undefined,
        undefined,
        undefined
      );
      
      await queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      
      Alert.alert("성공", "프로필이 수정되었습니다.", [
        { text: "확인", onPress: () => router.back() }
      ]);
    } catch (error: any) {
      console.error("프로필 수정 오류:", error);
      Alert.alert(
        "수정 실패",
        error.response?.data?.message || error.message || "프로필 수정 중 오류가 발생했습니다."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    nickname,
    setNickname,
    profileImageUrl,
    setProfileImageUrl,
    isSaving,
    isLoading,
    isUploading,
    handleComplete,
    handleImageUpload,
  };
};

