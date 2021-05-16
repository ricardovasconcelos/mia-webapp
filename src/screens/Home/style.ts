import styled from 'styled-components'
import theme from '../../style/theme'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  .leafMap{
    width: 100%;
    height: 100%;
  }

  .miaLogo {
    z-index: 999;
    right: 0;
    position: absolute;
    background-color: ${theme.colors.primary};
    padding: 10px;
    border-radius: 10px;
  }
`