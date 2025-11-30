import { useState } from "react";
import { Platform, Alert } from "react-native";
import { uploadImage, uploadPost } from "../api";
import * as ImagePicker from "expo-image-picker";
import { useQueryClient } from "@tanstack/react-query";


interface UseWriteModalProps {
  communityId: number;
  onSuccess?: () => void;
  onClose?: () => void;
}

export const useWriteModal = ({ communityId, onSuccess, onClose }: UseWriteModalProps) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const pickImage = async () => {
    try {
      setError(null);
      
      let permissionResult;
      try {
        permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();
      } catch (permErr) {
        console.error("권한 확인 오류:", permErr);
        permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      let finalStatus = permissionResult.status;

      if (finalStatus !== 'granted') {
        try {
          const requestResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
          finalStatus = requestResult.status;
        } catch (requestErr) {
          console.error("권한 요청 오류:", requestErr);
          Alert.alert(
            "권한 오류", 
            "이미지 접근 권한을 요청하는데 실패했습니다."
          );
          return;
        }
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          "권한 필요", 
          "이미지 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요."
        );
        return;
      }

      // 이미지 선택
      let result;
      try {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
          allowsMultipleSelection: false,
        });
      } catch (launchErr) {
        console.error("이미지 선택기 실행 오류:", launchErr);
        Alert.alert("오류", "이미지 선택기를 열 수 없습니다.");
        return;
      }

      if (result.canceled) {
        return;
      }

      if (!result.assets || result.assets.length === 0) {
        return;
      }

      const asset = result.assets[0];
      if (asset && asset.uri) {
        if (images.length >= 5) {
          Alert.alert("알림", "이미지는 최대 5개까지 추가할 수 있습니다.");
          return;
        }
        setImages(prev => [...prev, asset.uri]);
      }
    } catch (err: any) {
      console.error("이미지 선택 오류:", err);
      const errorMessage = err?.message || String(err) || "알 수 없는 오류";
      
      if (errorMessage.includes("Cannot find module") || errorMessage.includes("expo-image-picker")) {
        Alert.alert(
          "모듈 오류", 
          "expo-image-picker 모듈을 찾을 수 없습니다.\n\n앱을 재시작하거나 개발 빌드를 다시 해주세요."
        );
      } else if (errorMessage.includes("permission") || errorMessage.includes("권한")) {
        Alert.alert("권한 오류", "이미지 접근 권한이 필요합니다.");
      } else {
        Alert.alert("오류", "이미지를 선택하는데 실패했습니다.\n다시 시도해주세요.");
      }
      setError(errorMessage);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("제목과 내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadingImages(true);

    try {
      const imageUrls: string[] = [];
      
      for (const imageUri of images) {
        try {
          const formData = new FormData();
          const filename = imageUri.split('/').pop() || 'image.jpg';
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : 'image/jpeg';
          
          formData.append('image', {
            uri: imageUri,
            name: filename,
            type,
          } as any);

          const imageRes = await uploadImage(formData as any);
          const imageUrl = imageRes.data || imageRes.url || "";
          if (imageUrl) {
            imageUrls.push(imageUrl);
          }
        } catch (err) {
          console.error("이미지 업로드 실패:", err);
        }
      }

      setUploadingImages(false);

      await uploadPost({
        title,
        content,
        communityId,
        images: imageUrls.length > 0 ? imageUrls : undefined,
      });

      queryClient.invalidateQueries({ queryKey: ["postList", communityId] });

      onSuccess?.();
      onClose?.();
    } catch (err: any) {
      setError(err.message || "게시글 업로드 실패");
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    images,
    pickImage,
    removeImage,
    loading,
    uploadingImages,
    error,
    handleSubmit,
  };
};
