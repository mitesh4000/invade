const requiredEnvVars = ["PORT"];

function checkEnvironmentVariables() {
  let varNotSet = 0;
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.error(`ERROR:${envVar} is not set`);
      varNotSet += 1;
    }
  });
  if (varNotSet > 0) {
    console.error(
      `[  ${varNotSet}/${requiredEnvVars.length} variables are not set  ]`
    );
  }
}

export default checkEnvironmentVariables;
