import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function Home() {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  //   handleClick
  const handleClick = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (data.status === 401 || !data) {
      console.log(`client error`);
    } else {
      setShow(true)
      console.log(`Email send`);
      setEmail("");
    }
  };

  return (
    <>
      {show ? (
        <>
          <Alert variant="primary" onClose={() => setShow(false)} dismissible>
            Your Email Succesfully Send
          </Alert>
        </>
      ) : (
        ""
      )}
      <div className="container mt-2">
        <div className="d-flex justify-content-center">
          <h2>Node js email send</h2>
        </div>

        <div className="d-flex justify-content-center">
          <Form className="mt-2 col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Your Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleClick}>
              Send
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
