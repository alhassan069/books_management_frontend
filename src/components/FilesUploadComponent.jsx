import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Alert,
  Table,
} from "react-bootstrap";
import constants from "../constants";

export const FilesUploadComponent = () => {
  const [file, setFile] = useState();
  const [template, setTemplate] = useState("");
  const [alert, setAlert] = useState("");
  const backendurl = constants.backendurl;
  const [unprocessedFiles, setUnprocessedFiles] = useState([]);

  useEffect(() => {
    const url = backendurl + "api/getfiles";
    axios
      .get(url)
      .then((res) => setUnprocessedFiles(res.data.files))
      .catch((err) => console.log(err));
  }, []);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
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
    } else if (e === "success1") {
      setAlert("success1");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    } else if (e === "failed1") {
      setAlert("failed1");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = backendurl + "api/file";
    const formData = new FormData();
    formData.append("csvFile", file);
    formData.append("template", template);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        if (response.status == 201) {
          handleAlert("success");
          setTemplate("");
        }
      })
      .catch((err) => {
        if (err) handleAlert("failed");
      });
  };

  const handleProcessFile = () => {
    const url = backendurl + "process";
    const formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        if (response.status == 201) {
          handleAlert("success1");
          setTemplate("");
        }
      })
      .catch((err) => {
        if (err) handleAlert("failed1");
      });
  };

  return (
    <>
      <Container className="mt-5">
        {alert === "success" && (
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <Alert variant="success" onClose={() => setAlert("")} dismissible>
                <Alert.Heading>
                  Successfully Uploaded the file! You can process it now.
                </Alert.Heading>
              </Alert>
            </Col>
          </Row>
        )}
        {alert === "failed" && (
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <Alert variant="danger" onClose={() => setAlert("")} dismissible>
                <Alert.Heading>
                  Oh snap! You got an error in uploading the data!
                </Alert.Heading>
              </Alert>
            </Col>
          </Row>
        )}
        {alert === "success1" && (
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <Alert variant="success" onClose={() => setAlert("")} dismissible>
                <Alert.Heading>Successfully Processed the files.</Alert.Heading>
              </Alert>
            </Col>
          </Row>
        )}
        {alert === "failed1" && (
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <Alert variant="danger" onClose={() => setAlert("")} dismissible>
                <Alert.Heading>
                  Oh snap! You got an error in processing the data!
                </Alert.Heading>
              </Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col md={{ span: 4, offset: 10 }}>
            <Button onClick={handleProcessFile}>Process Files</Button>
          </Col>
        </Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>CSV Type</Form.Label>
            <Form.Select
              aria-label="Select csv type"
              onChange={handleTemplateChange}
              value={template}
            >
              <option>Open this select menu</option>
              <option value="book">Book</option>
              <option value="magazine">Magazine</option>
              <option value="author">Author</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </Form>
      </Container>
      <Container className="mt-5">
        <Row>
          <h4> Unprocessed Files</h4>
        </Row>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>File Name</th>
              <th>Template</th>
            </tr>
          </thead>
          <tbody>
            {unprocessedFiles.map((e) => {
              return (
                <tr key={e.id + Math.random()}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.template_name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
