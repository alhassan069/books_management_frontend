import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Chess = () => {
  const initdata = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  const [matrix, setMatrix] = useState(initdata);
  const [globalState, setGlobalState] = useState("");
  const handleClick = (iM, jM) => {
    console.log("clicked", iM, jM, globalState, matrix);
    if (globalState === "") {
      let tempMatrix = [...matrix];
      tempMatrix[iM][jM] = 2;
      if (!!tempMatrix[iM - 1][jM - 2]) tempMatrix[iM - 1][jM - 2] = 3;
      if (!!tempMatrix[iM + 1][jM - 2]) tempMatrix[iM + 1][jM - 2] = 3;
      if (!!tempMatrix[iM + 1][jM + 2]) tempMatrix[iM + 1][jM + 2] = 3;
      if (!!tempMatrix[iM - 1][jM + 2]) tempMatrix[iM - 1][jM + 2] = 3;
      if (!!tempMatrix[iM + 2][jM + 1]) tempMatrix[iM + 2][jM + 1] = 3;
      if (!!tempMatrix[iM + 2][jM - 1]) tempMatrix[iM + 2][jM - 1] = 3;
      if (!!tempMatrix[iM - 2][jM + 1]) tempMatrix[iM - 2][jM + 1] = 3;
      if (!!tempMatrix[iM - 2][jM - 1]) tempMatrix[iM - 2][jM - 1] = 3;

      setMatrix(tempMatrix);
      setGlobalState("knight");
    } else if (globalState === "knight") {
      let tempMatrix = [...matrix];
      let m = tempMatrix.length;
      if (tempMatrix[iM][jM] === 3) {
        for (let i = 0; i < m; i++) {
          for (let j = 0; j < m; j++) {
            if (i === iM && j == jM) {
              tempMatrix[i][j] = 2;
            } else {
              tempMatrix[i][j] = 1;
            }
          }
        }

        if (iM - 1 >= 0 && jM - 2 >= 0 && !!tempMatrix[iM - 1][jM - 2])
          tempMatrix[iM - 1][jM - 2] = 3;

        if (iM + 1 <= 7 && jM - 2 >= 0 && !!tempMatrix[iM + 1][jM - 2])
          tempMatrix[iM + 1][jM - 2] = 3;

        if (iM + 1 <= 7 && jM + 2 <= 7 && !!tempMatrix[iM + 1][jM + 2])
          tempMatrix[iM + 1][jM + 2] = 3;

        if (iM - 1 >= 0 && jM + 2 <= 7 && !!tempMatrix[iM - 1][jM + 2])
          tempMatrix[iM - 1][jM + 2] = 3;

        if (iM + 2 <= 7 && jM + 1 <= 7 && !!tempMatrix[iM + 2][jM + 1])
          tempMatrix[iM + 2][jM + 1] = 3;

        if (iM + 2 <= 7 && jM - 1 >= 0 && !!tempMatrix[iM + 2][jM - 1])
          tempMatrix[iM + 2][jM - 1] = 3;

        if (iM - 2 >= 0 && jM + 1 <= 7 && !!tempMatrix[iM - 2][jM + 1])
          tempMatrix[iM - 2][jM + 1] = 3;

        if (iM - 2 >= 0 && jM - 1 >= 0 && !!tempMatrix[iM - 2][jM - 1])
          tempMatrix[iM - 2][jM - 1] = 3;
        setMatrix(tempMatrix);
        setGlobalState("knight");
      }
    }
  };
  return (
    <Container>
      <Row className="mt-5">
        <h5>Positioning of Knight</h5>
        <Col sm={{ span: 4, offset: 4 }}>
          <table>
            <tbody>
              {matrix.map((row, i, matrix1) => {
                return (
                  <tr key={i}>
                    {row.map((column, j, matrix2) => {
                      return (
                        <td
                          style={{
                            height: "50px",
                            width: "50px",
                            border: "1px solid black",
                          }}
                          className={(i + j) % 2 == 0 ? "whitebg" : "blackbg"}
                          key={i + j}
                          onClick={() => handleClick(i, j)}
                        >
                          {matrix[i][j] === 2 && (
                            <img
                              src="./portablejim-Chess-tile-Knight-2.png"
                              style={{ height: "25px", margin: "7px" }}
                            />
                          )}
                          {matrix[i][j] === 3 && (
                            <div
                              style={{
                                height: "30px",
                                width: "30px",
                                backgroundColor: "orange",
                                borderRadius: "50%",
                              }}
                            ></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Chess;
