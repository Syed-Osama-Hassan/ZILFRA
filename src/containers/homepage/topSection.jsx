import React from "react";
import { Element, scroller } from "react-scroll";
import styled from "styled-components";
import Roll from 'react-reveal/Roll';
import BackgroundImg from "../../assets/pictures/background.svg";
import { DownArrow } from "../../Components/downArrow";
import { Marginer } from "../../Components/marginer";
import { Navbar } from "../../Components/NavBar/nav/index";

const TopContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  // background-size: cover;
  position: relative;
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  // background-color: rgba(55, 55, 55, 0.89);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MotivationalText = styled.h1`
  font-size: 34px;
  font-weight: 500;
  line-height: 1.4;
  color: #000000;
  margin: 0;
  text-align: center;
`;

const DownArrowContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

export function TopSection(props) {
  const scrollToNextSection = () => {
    scroller.scrollTo("servicesSection", { smooth: true, duration: 1500 });
  };


  return (
    <Element name="topSection">
      <TopContainer>
        <BackgroundFilter>
          <Navbar />
          <Marginer direction="vertical" margin="8em" />
          <Marginer direction="vertical" margin="4em" />
          <Roll left>
          <h1>ZILFRA</h1>
          <MotivationalText>The Financial Stability Trio</MotivationalText>
          </Roll>
          <Marginer direction="vertical" margin="2em" />
          <DownArrowContainer onClick={scrollToNextSection}>
            <DownArrow />
          </DownArrowContainer>
        </BackgroundFilter>
      </TopContainer>
    </Element>
  );
}
