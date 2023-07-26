import app from "./app.js";
import connect from "./database/connection.js";

// run database
connect();

// run server
app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});
