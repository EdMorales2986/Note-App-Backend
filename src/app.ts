import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import passport from "passport";
import passportMiddleWare from "./middlewares/passport";

import authRoutes from "./routes/auth.routes";
import privateRoutes from "./routes/private.routes";

//ANCHOR - Init
const app = express();

//ANCHOR - Settings
app.set("port", process.env.PORT || 3000);

//ANCHOR - Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleWare);

app.use(authRoutes);
app.use(privateRoutes);

//ANCHOR - Routes
app.get("/", function (req, res) {
  res.send(`http:/localhost:${app.get("port")}`);
});

export default app;
