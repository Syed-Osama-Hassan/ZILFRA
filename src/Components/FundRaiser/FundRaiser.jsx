import React from "react";
import FrForm from "./FrForm";
import FrCases from "./FrCases";
import Cases from "../Cases/Cases";
const FundRaiser = () => {
return(
  <>
<FrForm/>
<FrCases/>
<div className="row">
        <Cases />
        <Cases />
        <Cases />
      </div>
</>
);
}
export default FundRaiser;