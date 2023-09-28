import app from "./app";
import "./database";

//ANCHOR - Start
app.listen(app.get("port"));
console.log(`http:/localhost:${app.get("port")}`);
