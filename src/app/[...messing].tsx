import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Text from '@/components/ui/Text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '페이지를 찾을 수 없습니다' }} />
      <View style={styles.container}>
        <Text weight="bold" size={24} align="center" style={styles.title}>
          페이지를 찾을 수 없습니다
        </Text>
        
        <Text weight="regular" size={16} align="center" style={styles.description}>
          요청하신 페이지가 존재하지 않습니다.
        </Text>

        <Link href="/" style={styles.link}>
          <Text weight="medium" size={16} align="center">
            홈으로 돌아가기
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 16,
    color: '#333',
  },
  description: {
    marginBottom: 32,
    color: '#666',
  },
  link: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
  },
});