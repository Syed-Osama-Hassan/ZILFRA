import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import { Marginer } from "../../Components/marginer";
import { OurSerivce } from "../../Components/ourService";
import { SectionTitle } from "../../Components/sectionTitle";

import Service1Img from "../../assets/illustrations/web_development_.png";
import Service2Img from "../../assets/illustrations/mobile_phone.png";
import Service3Img from "../../assets/illustrations/bug_fixed.png";

const ServicesContainer = styled(Element)`
  width: 100%;
  min-height: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

export function ServicesSection(props) {
  return (
    <ServicesContainer name="servicesSection">
      <SectionTitle>Loaning, FundRasing & Committee Money</SectionTitle>
      <Marginer direction="vertical" margin="3em" />
      <OurSerivce
        title="Zero Interest Loan"
        description="Loan of upto 50000 will be provided to the respective users, loan will be returned to the respective users who provided it."
        imgUrl={Service1Img}
      />
      <OurSerivce
        title="Fund Raising"
        description="Fund Raiser is for the ones who can not afford to return the loan, those people can benefit from this oppurtunity."
        imgUrl={Service2Img}
        isReversed
      />
      <OurSerivce
        title="Committee Money"
        description="A coventional practice of committee money to utilize savings in an optimum way now available on ZILFRA"
        imgUrl={Service3Img}
      />
    </ServicesContainer>
  );
}
