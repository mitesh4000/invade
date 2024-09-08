import currentTime from "../utils/currentTime";
const chalk = require("chalk");

function checkEnvironmentVariables() {
  if (!process.env.MONGODB_URI) {
    console.error(`Error: Environment variabel for MONGODB_URI is not set.`);
    throw new Error(`PORT is required.`);
  }

  if (!process.env.PORT) {
    console.error(`Error: Environment variabel for PORT is not set.`);
    throw new Error(`PORT is required.`);
  }

  if (!process.env.BASE_API_URL) {
    console.error(`Error: BASE_API_URL is not set.`);
    throw new Error(`BASE_API_URL is required.`);
  }

  if (!process.env.CRON_SHEDULE || !process.env.CRON_SHEDULE) {
    console.error(`Error: CRON_SCHEDULE_IS_NOT_PROVIDED is not set.`);
    throw new Error(`BASE_API_URL is required.`);
  }

  if (!process.env.IPINFO_API_KEY) {
    console.error(`Error: IPINFO_API_KEY is not provided.`);
    throw new Error(`IPINFO_API_KEY is required.`);
  }
  console.log(
    chalk.yellow(
      `==================================================  [${chalk.red(
        currentTime()
      )}]`
    )
  );
  console.log(
    chalk.magentaBright("[    Env variables are ok starting server ]")
  );
}

export default checkEnvironmentVariables;
