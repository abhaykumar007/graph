import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import NavBar from "./components/navbar";
import { Bar } from "react-chartjs-2";
import Graph from "./components/graph";
// import Graph from "./components/graph";

function App() {
  const [enter, setEnter] = useState(false);
  const [graphFlag, setGraphFlag] = useState(false);
  const [xAxis, setxAxis] = useState();
  const [yAxis, setyAxis] = useState();
  const [input, setInput] = useState([
    { number: "", probability: "" },
    { number: "", probability: "" },
  ]);

  function graphCalculation() {
    let sum = 0;
    input.forEach((element) => {
      // console.log("element", element.probability);
      sum += parseInt(element.probability);
    });
    // console.log("sum", sum);
    if (sum == 100) {
      let weights = [];
      let results = [];
      input.forEach((element) => {
        weights.push(element.probability / 100);
        results.push(element.number);
      });
      // var weights = [0.1, 0.2, 0.4, 0.3];
      // var results = [0, 1, 2, 3];

      function getRandom() {
        let num = Math.random();
        let s = 0;
        let lastIndex = weights.length - 1;

        for (let i = 0; i < lastIndex; ++i) {
          s += weights[i];
          if (num < s) {
            return results[i];
          }
        }
        return results[lastIndex];
      }

      let arr = [];
      let freqRef = [];
      for (let i = 0; i < 1000; i++) {
        let num = getRandom();
        arr.push(num);
        if (freqRef[num]) {
          freqRef[num]++;
        } else {
          freqRef[num] = 1;
        }
      }
      let freq = [];
      let number = [];
      input.forEach((element) => {
        freq.push(freqRef[element.number]);
        number.push(element.number);
      });
      setxAxis(number);
      setyAxis(freq);
      // console.log("arr", arr);
      // console.log("freqRef", freqRef);
      // console.log("freq", freq);
      // console.log("number", number);
    } else {
      alert("Check probabilities");
    }
  }

  function handelAddRow() {
    setInput((prevState) => [...prevState, [{ number: "", probability: "" }]]);
  }
  function handelInput(i, e, ref) {
    var newInput = [...input];
    if (ref == "number") {
      newInput[i].number = e.target.value;
    } else {
      newInput[i].probability = e.target.value;
    }
    setInput(newInput);
    // console.log("input", newInput);
  }

  function handelGraph() {
    setGraphFlag(true);
    graphCalculation();
  }
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        {enter ? (
          <div className="input-parent">
            <h1>Welcome to Graph Maker</h1>
            <p>
              Enter the Numbers and there respective probabilities to create
              probability distribution graph
            </p>
            <div className="input-header">
              <h2>Numbers</h2>
              <h2>Probability</h2>
            </div>
            <div className="input">
              {input?.map((element, i) => (
                <div key={i}>
                  <input
                    placeholder="number"
                    onChange={(e) => handelInput(i, e, "number")}
                  />
                  <input
                    placeholder="probability"
                    onChange={(e) => handelInput(i, e, "probality")}
                  />
                </div>
              ))}
              {!graphFlag && (
                <div className="input-button">
                  <div className="add-row">
                    <button onClick={handelAddRow}>ADD ROW</button>
                  </div>
                  <div className="create-graph">
                    <button onClick={handelGraph}>CREATE GRAPH</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="entro-page">
            <h1>Click Here To Enter the app</h1>
            <button onClick={() => setEnter(true)}>Click Me</button>
          </div>
        )}

        {graphFlag && xAxis && yAxis && (
          <div className="graph">
            <h1>Graph of Probabilites</h1>
            <Graph xAxis={xAxis} yAxis={yAxis} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// 1 = 10
// 2 = 20
// 3 = 30
// 4 = 40

// var num = Math.random() * 100;
// if (num < 10) return 1;
// //probability 0.3
// else if (num < 30) return 2;
// // probability 0.3
// else if (num < 60) return 3;
// //probability 0.3
// else return 4; //probability 0.1

// let sum = 0;
// for (let i = 0; i < ref.length; i++) {
//   console.log("keys in for", ref[i], i);
//   sum += ref[i];
//   if (num < ref[i]) {
//     console.log("in first loop");
//     return obj[ref[i]];
//   } else if (num > ref[i - 1] && num < ref[i] + sum) {
//     console.log("in second loop");
//     return obj[ref[i]];
//   } else if (num > ref[i]) {
//     console.log("in third loop");
//     return obj[ref[i]];
//   }
