import React, { useState } from "react";
import axios from "axios";
import constants from "../constants";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const AddData = () => {
  const backendurl = constants.backendurl;
  const [type, setType] = useState("book");
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [publish, setPublish] = useState("");
  const [alert, setAlert] = useState("");
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const clearForms = () => {
    setTitle("");
    setIsbn("");
    setAuthor("");
    setDesc("");
    setPublish("");
    setType("book");
  };
  const handleAlert = (e) => {
    if (e === "success") {
      setAlert("success");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    } else if (e === "failed") {
      setAlert("failed");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let postData = {
      name: title,
      isbn: isbn,
      author_mail: author,
    };
    if (desc !== "") {
      postData.description = desc;
    } else if (publish !== "") {
      postData.published_at = publish;
    }
    let url = backendurl + "add";
    axios
      .post(url, postData)
      .then((response) => {
        if (response.status === 201) {
          clearForms();
          handleAlert("success");
        }
        console.log(response);
      })
      .catch((error) => {
        handleAlert("failed");
        console.log("There was an error!", error);
      });
  };
  return (
    <div>
      <Container>
        {alert === "success" && (
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <Alert variant="success" onClose={() => setAlert("")} dismissible>
                <Alert.Heading>Successfully Added the entry.</Alert.Heading>
              </Alert>
            </Col>
          </Row>
        )}
        {alert === "failed" && (
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <Alert variant="danger" onClose={() => setAlert("")} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              </Alert>
            </Col>
          </Row>
        )}
        <Row className="m-3">
          <h4>Add new Data</h4>
          <Col md={{ span: 6, offset: 2 }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Choose Type</Form.Label>
                <Form.Select
                  aria-label="Select csv type"
                  value={type}
                  onChange={handleTypeChange}
                >
                  <option value="book">Book</option>
                  <option value="magazine">Magazine</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{"Author Email(s)"}</Form.Label>
                <Form.Control
                  type="text"
                  value={author}
                  placeholder="Author Emails (Comma Seperated)"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Group>
              {type === "book" && (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Form.Group>
              )}
              {type === "magazine" && (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Published At</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="DD.MM.YY"
                    value={publish}
                    onChange={(e) => setPublish(e.target.value)}
                  />
                </Form.Group>
              )}

              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* <form onSubmit={handleSubmit}>
        <select
          name="typeInp"
          id="typeInp"
          value={type}
          onChange={handleTypeChange}
        >
          <option value="book">Book</option>
          <option value="magazine">Magazine</option>
        </select>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <input
          type="text"
          value={author}
          placeholder="Author Emails (Comma Seperated)"
          onChange={(e) => setAuthor(e.target.value)}
        />
        {type === "book" && (
          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        )}
        {type === "magazine" && (
          <input
            type="text"
            placeholder="Published At"
            value={publish}
            onChange={(e) => setPublish(e.target.value)}
          />
        )}
        <input type="submit" />
      </form> */}
    </div>
  );
};

export default AddData;
