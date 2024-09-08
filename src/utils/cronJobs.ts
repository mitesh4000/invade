const cron = require("node-cron");

const cronJobe = () => {
  cron.schedule(process.env.CRON_SHEDULE, () => {
    console.log("Running scheduled task at midnight...");
  });
};

export default cronJobe;
