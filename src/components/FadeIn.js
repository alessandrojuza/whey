import React from "react";
import styled, { keyframes } from "styled-components";
import "./FadeIn.css";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const FadeIn = ({ duration = 600, delay = 0, children, ...delegated }) => {
  return (
    <Wrapper
      className="wrapper"
      {...delegated}
      style={{
        ...(delegated.style || {}),
        animationDuration: duration + "ms",
        animationDelay: delay + "ms",
      }}
    >
      {children}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
  }
`;
export default FadeIn;
