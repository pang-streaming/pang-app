import { useState, useEffect, useRef } from "react";
import { LayoutChangeEvent, Pressable, TextInput, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import styled from "styled-components/native";
import type { ThemeProps } from "@/theme/types";
import Logo from "@/assets/logo.svg";
import Text from "./Text";
import { useCategoryStore, type Category } from "@/stores/useCategoryStore";
import { usePathname } from "expo-router";
import Search from "@/assets/search.svg";
import FocusedSearch from "@/assets/focused-search.svg";
import ChevronLeft from "@/assets/chevron-left.svg";
import { useSearch } from "@/features/search/useSearch";
import SearchResults from "@/components/search/SearchResults";

const HOME_CATEGORIES: Category[] = [
  "탐색",
  "카테고리",
  "실시간",
  "동영상",
  "클립",
];
const FOLLOWING_CATEGORIES: string[] = ["전체", "라이브"];
const CHARGE_CATEGORIES: string[] = ["충전", "사용내ㅇ역", "구매내역"];

type TabCategory = Category | string;

export default function Header() {
  const pathname = usePathname();
  const selectedCategory = useCategoryStore((s) => s.selectedCategory);
  const setSelectedCategory = useCategoryStore((s) => s.setSelectedCategory);
  const selectedTabCategory = useCategoryStore((s) => s.selectedTabCategory);
  const setSelectedTabCategory = useCategoryStore(
    (s) => s.setSelectedTabCategory
  );
  const [buttonLayouts, setButtonLayouts] = useState<{
    [key: string]: { x: number; width: number };
  }>({});
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const getCategories = (): TabCategory[] => {
    if (pathname === "/follow" || pathname === "/(tabs)/follow") {
      return FOLLOWING_CATEGORIES;
    } else if (pathname === "/charge" || pathname === "/(tabs)/charge") {
      return CHARGE_CATEGORIES;
    } else if (pathname === "/" || pathname === "/(tabs)/index") {
      return HOME_CATEGORIES;
    } else if (pathname === "/(tabs)/(more)") {
      return [];
    } else {
      return [];
    }
  };


  const categories = getCategories();
  const isHomeTab =
    pathname === "/" ||
    pathname === "/(tabs)" ||
    pathname === "/(tabs)/" ||
    pathname === "/(tabs)/index";

  useEffect(() => {
    if (!isHomeTab && categories.length > 0) {
      const firstCategory = categories[0] as string;
      if (
        selectedTabCategory !== firstCategory &&
        !categories.includes(selectedTabCategory)
      ) {
        setSelectedTabCategory(firstCategory);
      }
    }
  }, [
    pathname,
    isHomeTab,
    categories,
    selectedTabCategory,
    setSelectedTabCategory,
  ]);

  useEffect(() => {
    const categoryKey = isHomeTab ? selectedCategory : selectedTabCategory;
    if (buttonLayouts[categoryKey]) {
      const { x, width } = buttonLayouts[categoryKey];
      indicatorX.value = withSpring(x, {
        damping: 18,
        stiffness: 300,
        mass: 0.5,
      });
      indicatorWidth.value = withSpring(width, {
        damping: 18,
        stiffness: 300,
        mass: 0.5,
      });
    }
  }, [selectedCategory, selectedTabCategory, buttonLayouts, isHomeTab]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorX.value }],
      width: indicatorWidth.value,
    };
  });

  const handleButtonLayout = (category: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setButtonLayouts((prev) => ({
      ...prev,
      [category]: { x, width },
    }));
  };

  const handleCategoryPress = (category: TabCategory) => {
    if (isHomeTab) {
      setSelectedCategory(category as Category);
    } else {
      setSelectedTabCategory(category as string);
    }
  };

  const [searchOn, setSearchOn] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchInputRef = useRef<TextInput>(null);
  const { data: searchData, isLoading: isSearchLoading } =
    useSearch(searchKeyword || "");

  useEffect(() => {
    if (searchOn && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOn]);

  const handleSearchClose = () => {
    setSearchOn(false);
    setSearchKeyword("");
  };
  

  return (
    <Container>
      {!searchOn ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo height={35} />
          <Search
            onPress={() => {
              setSearchOn(true);
            }}
          />
        </View>
      ) : (
        <View
          style={{
            gap: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ChevronLeft onPress={handleSearchClose} />
          <SearchBarWrapper>
            <SearchInput
              ref={searchInputRef}
              placeholder="검색어를 입력해주세요"
              placeholderTextColor="#666"
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              autoFocus
            />
            <FocusedIcon />
          </SearchBarWrapper>
        </View>
      )}

      {searchOn && (
        <SearchResults
          data={searchData}
          isLoading={isSearchLoading}
          onClose={handleSearchClose}
        />
      )}

      {!searchOn && (
        <HeaderCategory>
          {categories.map((category) => {
            const isActive = isHomeTab
              ? selectedCategory === category
              : selectedTabCategory === category;
            return (
              <SelectCategoryButton
                key={category}
                onPress={() => handleCategoryPress(category)}
                onLayout={(event: LayoutChangeEvent) =>
                  handleButtonLayout(category as string, event)
                }
                isActive={isActive}
              >
                <SelectCategoryButtonText
                  weight="bold"
                  size={16}
                  isActive={isActive}
                >
                  {category}
                </SelectCategoryButtonText>
              </SelectCategoryButton>
            );
          })}
          <AnimatedIndicator style={animatedIndicatorStyle} />
        </HeaderCategory>
      )}
    </Container>
  );
}

const SelectCategoryButton = styled(Pressable)<{ isActive?: boolean }>`
  height: 100%;
  padding: 10px;
  position: relative;
`;

const SelectCategoryButtonText = styled(Text)<{ isActive?: boolean }>`
  color: ${({ theme, isActive }: ThemeProps & { isActive?: boolean }) =>
    isActive ? theme.colors.primary.normal : theme.colors.stroke.normal};
`;

const Container = styled.View`
  width: 100%;
  padding: 0 15px;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  position: relative;
`;

const HeaderCategory = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 10px;
  margin-left: -15px;
  margin-right: -15px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.border.light};
  position: relative;
`;

const AnimatedIndicator = styled(Animated.View)`
  position: absolute;
  bottom: -1px;
  height: 3px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
  border-radius: 1.5px;
`;



const SearchBarWrapper = styled(View)`
  flex: 1;
  height: 40px;
  position: relative;
  justify-content: center;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  padding: 12px 45px 12px 16px;
  border-radius: ${({ theme }: ThemeProps) => theme.borders.maximum};
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`;

const FocusedIcon = styled(FocusedSearch)`
  position: absolute;
  right: 16px;
`;
