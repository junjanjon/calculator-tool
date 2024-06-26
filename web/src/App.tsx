import { useState } from 'react'
import './App.css'
import Grid from '@mui/joy/Grid';
import BackspaceIcon from '@mui/icons-material/Backspace';

const formulaCalculator = (formula: string) => {
  try {
    if (formula === "") {
      return "";
    }
    // formula の中に指定外の文字が含まれている場合は null を返す
    if (formula.match(/[^0-9+\-*/().]/)) {
      return null;
    }
    // WARNING: eval を利用している。自分でパースすることでセキュリティを向上できる。
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/eval
    const result = eval?.(`"use strict"; ${formula}`);
    return result;
  }
  catch (e) {
    return null;
  }
};

function App() {
  const [formula, setFormula] = useState("")
  const [result, setResult] = useState("")

  const nextFormulaUpdate = (nextFormula: string) => {
    setFormula(nextFormula);
    const formulaResult = formulaCalculator(nextFormula)
    if (formulaResult !== null) {
      setResult(formulaResult.toString())
    }
  }

  const onClick = (value: string) => {
    const nextFormula = formula + value;
    nextFormulaUpdate(nextFormula);
  };

  const onClickEqual = () => {
    const formulaResult = formulaCalculator(formula)
    if (formulaResult !== null) {
      setFormula(formulaResult.toString());
      setResult(formulaResult.toString());
    }
    else {
      setResult("Error");
    }
  };

  const onClickBackClear = () => {
    const nextFormula = formula.slice(0, -1);
    nextFormulaUpdate(nextFormula);
  }

  const onClickClear = () => {
    setFormula("");
    setResult("")
  }

  const onClickAddBraces = () => {
    // formula 中に余っている "(" がある場合は ")" を追加する
    let leftBraceCount = 0;
    let rightBraceCount = 0;
    for (let i = 0; i < formula.length; i++) {
      if (formula[i] === "(") {
        leftBraceCount++;
      }
      if (formula[i] === ")") {
        rightBraceCount++;
      }
    }
    if (leftBraceCount > rightBraceCount) {
      const nextFormula = formula + ")";
      nextFormulaUpdate(nextFormula);
    }
    else {
      const nextFormula = formula + "(";
      nextFormulaUpdate(nextFormula);
    }
  }

  const buttons = [
    {value: "AC", onClick: () => onClickClear()},
    {value: "( )", onClick: () => onClickAddBraces()},
    {value: null},
    {value: "/", onClick: () => onClick("/")},
    {value: "7", onClick: () => onClick("7")},
    {value: "8", onClick: () => onClick("8")},
    {value: "9", onClick: () => onClick("9")},
    {value: "*", onClick: () => onClick("*")},
    {value: "4", onClick: () => onClick("4")},
    {value: "5", onClick: () => onClick("5")},
    {value: "6", onClick: () => onClick("6")},
    {value: "-", onClick: () => onClick("-")},
    {value: "1", onClick: () => onClick("1")},
    {value: "2", onClick: () => onClick("2")},
    {value: "3", onClick: () => onClick("3")},
    {value: "+", onClick: () => onClick("+")},
    {value: "0", onClick: () => onClick("0")},
    {value: ".", onClick: () => onClick(".")},
    {value: <BackspaceIcon />, onClick: () => onClickBackClear()},
    {value: "=", onClick: () => onClickEqual()},
  ];

  return (
    <>
      <Grid
        container
        spacing={2}
        columns={{ xs:4 }}>
        <Grid xs={4}
          style={{
            backgroundColor: "darkgray",
            borderRadius: "10px 10px 0 0",
          }}>
          <input
            color={"dark"}
            value={formula}
            style={{
              border: "none",
              backgroundColor: "darkgray",
              width: "90%",
              fontSize: "2em",
              color: "white",
              textAlign: "right",
            }}
            disabled={true}
          />
        </Grid>
        <Grid xs={4}
          style={{
            backgroundColor: "darkgray",
            borderRadius: "0 0 10px 10px",
          }}>
          <input
            value={result}
            style={{
              border: "none",
              backgroundColor: "darkgray",
              width: "90%",
              fontSize: "1.3em",
              color: "whitesmoke",
              textAlign: "right"
            }}
            disabled={true}
          />
        </Grid>
        {
          buttons.map((button) => {
            if (button.value === null) {
              return (
                <Grid xs={1} />
              )
            }
            return (
              <Grid xs={1}>
                <div
                  onClick={button.onClick}
                  style={{
                    position: "relative",
                    backgroundColor: "gray",
                    paddingTop: "100%",
                    width: "100%",
                    borderRadius: "50%",
                  }}>
                  <p
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}>{button.value}</p>
                </div>
              </Grid>
            )
          })
        }
      </Grid>
    </>
  )
}

export default App
