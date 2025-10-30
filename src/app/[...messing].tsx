import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';
import Text from '@/components/ui/Text';

export default function NotFoundScreen() {
  const theme = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: '페이지를 찾을 수 없습니다' }} />
      <View style={[styles.container, { backgroundColor: theme.colors.background.normal }]}>
        <Text weight="bold" size={24} align="center" style={styles.title}>
          페이지를 찾을 수 없습니다
        </Text>
        
        <Text weight="regular" size={16} align="center" style={[styles.description, { color: theme.colors.text.subtitle }]}>
          요청하신 페이지가 존재하지 않습니다.
        </Text>

        <Link href="/" style={[styles.link, { backgroundColor: theme.colors.content.light }]}>
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
  },
  title: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 32,
  },
  link: {
    padding: 12,
    borderRadius: 8,
  },
});