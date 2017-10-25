import React from 'react'
import { Container, Row, Logo } from './index'
import theme from '../theme'

const FooterContainer = Container.extend`
  position: absolute;
  bottom: 0;
  width: 100%;
`
const Footer = () => {
  return (
    <FooterContainer bgColor={theme.black}>
      <Row marginBottom="0">
        <Logo />
      </Row>
    </FooterContainer>
  )
}

export default Footer
