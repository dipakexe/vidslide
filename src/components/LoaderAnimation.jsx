import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = styled.div`
  height: 27px;
  aspect-ratio: 5;
  --c: #000 90deg, #0000 0;
  background: conic-gradient(from 135deg at top, var(--c)),
    conic-gradient(from -45deg at bottom, var(--c)) 12.5% 100%;
  background-size: 20% 50%;
  background-repeat: repeat-x;
  clip-path: inset(0 100% 0 0);
  animation: ${keyframes`
    90%, to {
      clip-path: inset(0);
    }
  `} 1s infinite linear;
`;

const LoaderAnimation = () => {
  return <Loader />;
};

export default LoaderAnimation;
