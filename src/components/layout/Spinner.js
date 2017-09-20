import React from 'react'
import styled from 'styled-components'

const Spinner = ({ className = '' }) => {
  return (
    <div className={`${className} sk-cube-grid`}>
      <div className="sk-cube sk-cube1" />
      <div className="sk-cube sk-cube2" />
      <div className="sk-cube sk-cube3" />
      <div className="sk-cube sk-cube4" />
      <div className="sk-cube sk-cube5" />
      <div className="sk-cube sk-cube6" />
      <div className="sk-cube sk-cube7" />
      <div className="sk-cube sk-cube8" />
      <div className="sk-cube sk-cube9" />
    </div>
  )
}

const StyledSpinner = styled(Spinner)`
  ${props => `
  width: ${props.size || '90px'};
  height: ${props.size || '90px'};
  margin: 100px auto;

  .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #333;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }
  .sk-cube1 {
    animation-delay: 0.2s;
  }
  .sk-cube2 {
    animation-delay: 0.3s;
  }
  .sk-cube3 {
    animation-delay: 0.4s;
  }
  .sk-cube4 {
    animation-delay: 0.1s;
  }
  .sk-cube5 {
    animation-delay: 0.2s;
  }
  .sk-cube6 {
    animation-delay: 0.3s;
  }
  .sk-cube7 {
    animation-delay: 0s;
  }
  .sk-cube8 {
    animation-delay: 0.1s;
  }
  .sk-cube9 {
    animation-delay: 0.2s;
  }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    }
  }

  @keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    }
  }
`};
`

export default StyledSpinner
