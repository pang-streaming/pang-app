

import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

export const More = () => {
  return (
    <Container>
        <Dot/>
        <Dot/>
        <Dot/>
    </Container>
  )
}


const Container = styled(View)`
width: 20px;
height: 20%;
padding-right: 10px;
align-items: flex-end;
flex-direction: column;
gap: 2px;
margin-top: 3px;
`

const Dot = styled(View)`
    width: 2px;
    height: 2px;
    border-radius: 1px;
    background-color : white;

`