import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { exec } from "child_process";

// .env settings
let isDevelopment = true;
const envProduction = "/snapshot/.env";

if (fs.existsSync(envProduction)) {
  isDevelopment = false;
}

if (isDevelopment) {
  dotenv.config(); // development
} else {
  dotenv.config({
    path: envProduction, // production
  });
}

// environment variables
const portServer = process.env.PORT;
const urlServer = process.env.URL_SERVER;
const cmdStop = process.env.CMD_STOP;
const cmdStart = process.env.CMD_START;
const bot = process.env.BOT;
const timeBot = process.env.TIMEBOT;

const app = express();
const port = portServer;

// robot time in minutes
const time = 1000 * 60 * Number(timeBot);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

const checkResponseSystems = async () => {
  try {
    const url = urlServer;
    const response = await axios.get(url);

    if (response.data.status === "success" && response.data.data === "ok") {
      console.log("System Working");
      // robot active
      if (bot) {
        setTimeout(checkResponseSystems, time);
      }
      return;
    } else {
      console.log("System not Working");
      // run shell stop command
      exec(`${cmdStop}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running the script: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`Erro script: ${stderr}`);
          return;
        }
        console.log(`Script Stop: ${stdout}`);
        exec(`${cmdStart}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error running the script: ${error.message}`);
            return;
          }

          if (stderr) {
            console.error(`Erro script: ${stderr}`);
            return;
          }
          console.log(`Script Started: ${stdout}`);
          // robot active
          if (bot) {
            setTimeout(checkResponseSystems, time);
          }
          return;
        });
      });
    }
  } catch (error) {
    console.log("System not Working");
    // run shell stop command
    exec(`${cmdStop}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running the script: ${error.message}`);
      }

      if (stderr) {
        console.error(`Erro script: ${stderr}`);
      }
      console.log(`Script Stop: ${stdout}`);
      exec(`${cmdStart}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running the script: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`Erro script: ${stderr}`);
          return;
        }
        console.log(`Script Started: ${stdout}`);
        // robot active
        if (bot) {
          setTimeout(checkResponseSystems, time);
        }
        return;
      });
    });
  }
};

checkResponseSystems();
