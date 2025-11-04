import { useState, useEffect } from "react";
import { LayoutChangeEvent, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import styled from "styled-components/native"
import type { ThemeProps } from "@/theme/types";
import Logo from '@/assets/logo.svg';
import Text from "./Text";

const CATEGORIES = ["탐색", "카테고리", "실시간", "동영상", "클립"];

export default function Header() {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
    const [buttonLayouts, setButtonLayouts] = useState<{ [key: string]: { x: number; width: number } }>({});
    const indicatorX = useSharedValue(0);
    const indicatorWidth = useSharedValue(0);

    useEffect(() => {
        if (buttonLayouts[selectedCategory]) {
            const { x, width } = buttonLayouts[selectedCategory];
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
    }, [selectedCategory, buttonLayouts]);

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

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <Container>
            <Logo height={35} /> 
            <HeaderCategory>
                {CATEGORIES.map((category) => (
                    <SelectCategoryButton
                        key={category}
                        onPress={() => handleCategoryPress(category)}
                        onLayout={(event: LayoutChangeEvent) => handleButtonLayout(category, event)}
                        isActive={selectedCategory === category}
                    >
                        <SelectCategoryButtonText weight="bold" size={16} isActive={selectedCategory === category}>
                            {category}
                        </SelectCategoryButtonText>
                    </SelectCategoryButton>
                ))}
                <AnimatedIndicator style={animatedIndicatorStyle} />
            </HeaderCategory>
        </Container>
    )
}

const SelectCategoryButton = styled(Pressable)<{ isActive?: boolean }>`    
    height: 100%;
    padding: 10px;   
    position: relative;
`

const SelectCategoryButtonText = styled(Text)<{ isActive?: boolean }>`
    color: ${({ theme, isActive }: ThemeProps & { isActive?: boolean }) => 
        isActive ? theme.colors.primary.normal : theme.colors.stroke.normal};
`

const Container = styled.View`
    width: 100%;
    padding: 15px;
    
    
    flex-direction: column;
    justify-content: center;
    align-content: space-between;

    margin-bottom: 20px;
`

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
`

const AnimatedIndicator = styled(Animated.View)`
    position: absolute;
    bottom: -1px;
    height: 3px;
    background-color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
    border-radius: 1.5px;
`