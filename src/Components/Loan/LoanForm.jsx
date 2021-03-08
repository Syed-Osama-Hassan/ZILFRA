import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import SendButton from "../SendButton/SendButton";
import NavBar from '../NavBar/NavBar';

const LoanForm = () => {
  return (
    <>
    <NavBar />
      <div>
        <div className="container fluid nav_bg">
          <div className="row">
            <div className="col-6 mx-auto">
              <br />
              <h5>Request Loan</h5>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">Name</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">
                    abc@gmail.com
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3" />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Rp</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Amount (to the nearest dollar)" />
                <InputGroup.Append>
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Problem Explaination</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" aria-label="With textarea" />
              <br/>
              <SendButton/>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoanForm;
