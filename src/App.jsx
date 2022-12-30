import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddData from "./components/AddData";
import { FilesUploadComponent } from "./components/FilesUploadComponent";
import ViewData from "./components/ViewData";
import { Container, Navbar, Button, Row, Col } from "react-bootstrap";
import Chess from "./components/Chess";
function App() {
  const [currentView, setCurrentView] = useState("view");
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://uploads-ssl.webflow.com/60d5a97381523ace9d3c87bb/635c2962030b63121e5651ff_raftlabs.png"
              alt="RAFTLABS"
            />
          </Navbar.Brand>

          <Row>
            <Col md="auto">
              <Button
                variant={currentView === "upload" ? "secondary" : "primary"}
                size="sm"
                onClick={() => setCurrentView("upload")}
              >
                Upload CSV
              </Button>
            </Col>
            <Col md="auto">
              <Button
                variant={currentView === "view" ? "secondary" : "primary"}
                size="sm"
                onClick={() => setCurrentView("view")}
              >
                View Data
              </Button>
            </Col>
            <Col md="auto">
              <Button
                variant={currentView === "add" ? "secondary" : "primary"}
                size="sm"
                onClick={() => setCurrentView("add")}
              >
                Add Data
              </Button>
            </Col>
            <Col md="auto">
              <Button
                variant={currentView === "chess" ? "secondary" : "primary"}
                size="sm"
                onClick={() => setCurrentView("chess")}
              >
                Chess Knight
              </Button>
            </Col>
          </Row>
        </Container>
      </Navbar>

      <div className="bodyContainer">
        {currentView === "upload" && <FilesUploadComponent />}
        {currentView === "view" && <ViewData />}
        {currentView === "add" && <AddData />}
        {currentView === "chess" && <Chess />}
      </div>
    </div>
  );
}
export default App;
