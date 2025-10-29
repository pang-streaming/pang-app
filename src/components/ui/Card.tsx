import React from 'react';
import { Text, ViewStyle, TextStyle, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface CardProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
  marginRight?: number;
  scale?: number | Animated.AnimatedInterpolation<string | number>;
  opacity?: number | Animated.AnimatedInterpolation<string | number>;
  style?: ViewStyle | ViewStyle[];
}

interface CardContainerProps {
  width: number;
  height: number;
  backgroundColor: string;
  borderRadius: number;
  marginRight: number;
}

export default function Card({
  children,
  width = screenWidth * 0.8,
  height = width * (9 / 16),
  backgroundColor = '#f8f9fa',
  borderRadius = 12,
  marginRight = 5,
  scale = 1,
  opacity = 1,
  style,
}: CardProps) {
  return (
    <AnimatedCardContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      marginRight={marginRight}
      style={[
        {
          transform: [{ scale }],
          opacity,
        },
        style,
      ]}
    >
     {children} 
    </AnimatedCardContainer>
  );
}

const AnimatedCardContainer = styled(Animated.View)<CardContainerProps>`
  width: ${(props:CardContainerProps) => props.width}px;
  height: ${(props:CardContainerProps) => props.height}px;
  background-color: ${(props:CardContainerProps) => props.backgroundColor};
  border-radius: ${(props:CardContainerProps) => props.borderRadius}px;
  margin-right: ${(props:CardContainerProps) => props.marginRight}px;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
