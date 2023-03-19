import "./App.css";
import { useState } from "react";
import { Grid, Typography, TextField, IconButton } from "@mui/material";
import { Command } from "./command";
import { HelpOutline } from "@mui/icons-material";

type Ops = string[]; // array of operations
type Op = string; // operation
type Sexpr = string; // S-exression
const C = new Command();

function App() {
  const [outputStack, setOutputStack] = useState<string[]>([]);
  const [inputFieldValue, setInputFieldValue] = useState("");
  const [userCmdList, setUserCmdList] = useState<string[]>([]);

  const exprToOps = (expr: Sexpr): Ops =>
    expr.split(" ").filter((op: Op) => op.length > 0);

  const onEnter = (expr: Sexpr) => {
    console.log("evaluating expression = ", expr);
    const ops = exprToOps(expr);

    // evaluate expression and set output stack to result
    setOutputStack(C.evaluateOps(ops)(outputStack));

    clearInput(); // clear input field

    setUserCmdList(C.getUserCmdNames());
  };

  const clearInput = () => setInputFieldValue("");

  return (
    <Grid container padding={4} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" className="title" color="secondary">
          Coren
        </Typography>
        <Typography variant="body2" color="#000000">
          ( ver. 0.0.3 )
        </Typography>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <TextField
          id="expression"
          label="expression"
          variant="outlined"
          color="primary"
          placeholder="Enter an expression"
          sx={{
            input: { color: "#fffdd0", fontFamily: "Monospace" },
            width: "100%",
          }}
          focused
          autoFocus
          value={inputFieldValue}
          onChange={(e) => setInputFieldValue(e.target.value)}
          onKeyDown={(e) => {
            e.key == "Enter" ? onEnter((e.target as HTMLInputElement).value) : {};
          }}
        />
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <>
          <Typography
            variant="subtitle1"
            color="#cccaa6"
            sx={{ fontFamily: "Monospace" }}
          >
            {outputStack.length === 0 ? "( stack empty )" : ""}
          </Typography>
          {[...outputStack].reverse().map((entry, i) => (
            <div key={i}>
              <Typography
                component="span"
                color={"#444444"}
                align="left"
                sx={{ fontSize: 14, fontFamily: "Monospace" }}
              >
                {i + 1}.{" "}
              </Typography>
              <Typography
                variant="h6"
                component="span"
                color={i === 0 ? "secondary" : "primary"}
                sx={{ fontFamily: "Monospace" }}
                align="left"
              >
                {entry}
              </Typography>
            </div>
          ))}
        </>
      </Grid>
      <Grid item xs={1}>
        {userCmdList.map((cmd) => {
          return (
            <Typography key={cmd} color="secondary" sx={{ fontSize: 16 }}>
              {cmd}
            </Typography>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <Typography color="#000000" sx={{ fontSize: 20 }}>
          ( Refresh page to clear all. Enter `cls` to clear stack. )
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <IconButton>
          <HelpOutline color="secondary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default App;
