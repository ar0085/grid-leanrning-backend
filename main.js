const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hellow Workd");

// });

const handleUserInput = (key, currIdx) => {
  switch (key) {
    case "ArrowUp":
      console.log("upArrow");
      return move(0, -1, currIdx);
    case "ArrowDown":
      console.log("downArrow");
      return move(0, 1, currIdx);
    case "ArrowLeft":
      return move(1, -1, currIdx);
    case "ArrowRight":
      return move(1, 1, currIdx);
    default:
      break;
  }
};

const move = (dir, change, currIdx) => {
  let currCoord = currIdx;
  if (
    currCoord[dir] + change > -1 && dir === 0
      ? currCoord[dir] + change < 20
      : currCoord[dir] + change < 60
  ) {
    currCoord[dir] += change;
  }
  return currCoord;
};

app.post("/key-pressed", function (req, res) {
  const keyStroke = req.body.keyStroke;
  const currIdx = JSON.parse(req.body.currentIdx).data;
  const machineState = req.body.machineState;
  const nextMachineState = "focus";
  const destIdx = handleUserInput(keyStroke, currIdx);
  res.status(200).send({ destIdx, nextMachineState });
});

const keyFunc = () => {
  console.log("Hi");
};

app.listen(3000, () => console.log("Server started"));
