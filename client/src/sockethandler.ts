const con = new WebSocket("ws://localhost:3001/");

con.onopen = () => {
  console.log("Connected to the server");
  con.send(
    JSON.stringify({
      event: "msg",
      data: "new client connected",
    })
  );
};

export { con };
