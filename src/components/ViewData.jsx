import axios from "axios";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import {
  Table,
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import constants from "../constants";

const headers = [
  { label: "title", key: "name" },
  { label: "isbn", key: "isbn" },
  { label: "authors", key: "author_mail" },
  { label: "description", key: "description" },
  { label: "publishedAt", key: "published_at" },
];

const ViewData = () => {
  const backendurl = constants.backendurl;
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleSearch = () => {
    if (search == "isbn") {
      searchIsbn();
      console.log("isbn search");
      console.log(input);
    } else if (search == "email") {
      searchEmail();
      console.log("email search");
      console.log(input);
    }
  };
  const [data, setData] = useState([]);
  const getAllData = () => {
    setCurrentP("alldata");
    setSearch("");
    const url = backendurl + "getall/all";
    axios
      .get(url)
      .then((response) => {
        if (response.status == 201) {
          console.log(response.data.data);
          setData(response.data.data);
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const getAllDataSorted = () => {
    setCurrentP("alldataSorted");
    setSearch("");
    const url = backendurl + "getall/sorted";
    axios
      .get(url)
      .then((response) => {
        if (response.status == 201) {
          console.log(response.data.data);
          setData(response.data.data);
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const searchIsbn = () => {
    const url = backendurl + `getone/isbn/${input}`;
    axios
      .get(url)
      .then((response) => {
        if (response.status == 201) {
          console.log(response.data.data);
          setData(response.data.data);
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const searchEmail = () => {
    const url = backendurl + `getone/email/${input}`;
    axios
      .get(url)
      .then((response) => {
        if (response.status == 201) {
          console.log(response.data.data);
          setData(response.data.data);
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const csvReport = {
    data: data,
    headers: headers,
    filename: "data.csv",
  };
  const [currentP, setCurrentP] = useState("");
  return (
    <div>
      <div>
        <Container className="mx-5">
          <ButtonGroup aria-label="Basic example">
            <Button
              variant={currentP === "alldata" ? "secondary" : "primary"}
              onClick={getAllData}
            >
              View All Data{" "}
            </Button>
            <Button
              variant={currentP === "alldataSorted" ? "secondary" : "primary"}
              onClick={getAllDataSorted}
            >
              View All Data (Sorted)
            </Button>

            <Button
              variant={currentP === "isbnSearch" ? "secondary" : "primary"}
              onClick={() => {
                search !== "isbn" ? setSearch("isbn") : setSearch("");
                setCurrentP("isbnSearch");
              }}
            >
              Search By ISBN
            </Button>
            <Button
              variant={currentP === "emailSearch" ? "secondary" : "primary"}
              onClick={() => {
                search !== "email" ? setSearch("email") : setSearch("");
                setCurrentP("emailSearch");
              }}
            >
              Search By Author Email
            </Button>
          </ButtonGroup>

          <Button className="m-5" variant="warning">
            <CSVLink {...csvReport}>Export to CSV</CSVLink>
          </Button>

          {search !== "" && (
            <Row className="g-2">
              <Col sm={{ span: 4, offset: 4 }}>
                <InputGroup className="m-3">
                  <Form.Control
                    placeholder="SEARCH"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={handleInputChange}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          )}
        </Container>
        <Container>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Id</th>
                <th>Category</th>
                <th>Title</th>
                <th>{"Author Email(s)"}</th>
                <th>ISBN</th>
                <th>Published At</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e) => {
                return (
                  <tr key={e.id + Math.random()}>
                    <td>{e.id}</td>
                    <td>{e.published_at === null ? "Book" : "Magazine"}</td>
                    <td>{e.name}</td>
                    <td>
                      {e.author_mail.split(",").map((i) => {
                        return i + "\n";
                      })}
                    </td>
                    <td>{e.isbn}</td>
                    <td>{e.published_at !== null ? e.published_at : "N/A"}</td>
                    <td>{e.description !== null ? e.description : "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default ViewData;
