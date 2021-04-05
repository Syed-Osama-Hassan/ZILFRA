import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import { SectionTitle } from "../../Components/sectionTitle";
import Zoom from 'react-reveal/Zoom';
import AboutImgUrl from "../../assets/illustrations/rocket_launch_.png";

const MoreAboutContainer = styled(Element)`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1em;
`;

const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;

  @media screen and (max-width: 480px) {
    max-width: 100%;
    flex-direction: column-reverse;
  }
`;

const AboutText = styled.p`
  font-size: 21px;
  color: #2f2f2f;
  font-weight: normal;
  line-height: 1.4;
`;

const AboutImg = styled.img`
  width: 600px;
  height: 500px;
  margin-left: 2em;

  @media screen and (max-width: 480px) {
    width: 370px;
    height: 290px;
    margin-left: 0;
  }
`;

export function MoreAboutSection(props) {
  return (
    <>
    <Zoom bottom wait={1000}>
    <MoreAboutContainer>
      <SectionTitle>Why ZILFRA? </SectionTitle>
      <AboutContainer>
        <AboutText>
          A loan of upto 50,000 with an easy intsallment plan and with zero
          percent interest. {<br />}
          {<br />} Those who can not opt to loan they can choose fundraiser
          which is comletely free. {<br />}
          {<br />} By Committee money one can utilize his savings in an optimum
          way.
        </AboutText>
        <AboutImg src={AboutImgUrl} />
      </AboutContainer>
    </MoreAboutContainer>
    </Zoom>
    </>
  );
}
