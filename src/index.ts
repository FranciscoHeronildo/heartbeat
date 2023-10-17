import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { execFile } from "child_process";

const portServer = process.env.PORT;
const stopFilePath = process.env.PATH_STOP;
const startFilePath = process.env.PATH_START;

const app = express();
const port = portServer;

app.listen(port, () => {
  console.log(`Express is listening at ${port}`);
});

const heartBeat = async () => {
  try {
    const response = await axios.get(`http://localhost:${port}/heartbeat`);

    if (response.status === 200) {
      console.log("Server is alive");
      return;
    } else {
      console.log("Server is dead");
      if (fs.existsSync(stopFilePath)) {
        execFile(`${stopFilePath}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error running the script: ${error.message}`);
          }
          if (stderr) {
            console.error(`Erro script: ${stderr}`);
          }
          console.log(`Script: ${stdout}`);
        });
      }
      if (fs.existsSync(startFilePath)) {
        execFile(`${startFilePath}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error running the script: ${error.message}`);
          }

          if (stderr) {
            console.error(`Erro script: ${stderr}`);
          }

          console.log(`Script: ${stdout}`);
        });
      }
    }
  } catch (err) {
    console.log(err);
    console.log("Server is dead");
    if (fs.existsSync(stopFilePath)) {
      execFile(`${stopFilePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running the script: ${error.message}`);
        }
        if (stderr) {
          console.error(`Erro script: ${stderr}`);
        }
        console.log(`Script: ${stdout}`);
      });
    }
    if (fs.existsSync(startFilePath)) {
      execFile(`${startFilePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running the script: ${error.message}`);
        }

        if (stderr) {
          console.error(`Erro script: ${stderr}`);
        }

        console.log(`Script: ${stdout}`);
      });
    }
  }
};

heartBeat();
