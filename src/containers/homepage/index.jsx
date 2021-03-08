import React from "react";
import styled from "styled-components";
import { Footer } from "../../Components/footer";
import { Marginer } from "../../Components/marginer";
import { MoreAboutSection } from "./moreAboutSection";
import { ReviewsSection } from "./reviewsSection";
import { ServicesSection } from "./servicesSection";
import { TopSection } from "./topSection";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Homepage(props) {
  return (
    <PageContainer>
      <TopSection />
      <ServicesSection />
      <Marginer direction="vertical" margin="2em" />
      <ReviewsSection />
      <MoreAboutSection />
      <Marginer direction="vertical" margin="8em" />
      <Footer />
    </PageContainer>
  );
}
