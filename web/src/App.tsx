import { useState } from 'react'
import './App.css'
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import { Button } from "@mui/joy";

function App() {
  const [formula, setFormula] = useState("")

  const onClick = (value: string) => {
    setFormula(formula + value)
  }

  const onClickEqual = () => {
    try {
      const result = eval(formula);
      setFormula(result);
    }
    catch (e) {
      setFormula("error");
    }
  };

  const onClickClear = () => {
    setFormula("");
  }

  const buttons = [
    {value: "AC", onClick: () => onClickClear()},
    {value: "", onClick: () => onClickClear()},
    {value: "", onClick: () => onClickClear()},
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
    {value: <></>, onClick: () => onClickEqual()},
    {value: "=", onClick: () => onClickEqual()},
  ];

  return (
    <>
      <Grid
        container
        spacing={2}
        columns={{ xs:4 }}>
        <Grid xs={4}>
          <Input
            color="primary"
            variant="solid"
            size={"lg"}
            value={formula}/>
        </Grid>
        {
          buttons.map((button) => {
            return (
              <Grid xs={1}>
                <Button
                  onClick={button.onClick}
                  size={"lg"}>{button.value}</Button>
              </Grid>
            )
          })
        }
      </Grid>
    </>
  )
}

export default App
