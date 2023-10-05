import express from "express";
// import session from "express-session";
// import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import passport from "passport";
import passportMiddleWare from "./middlewares/passport";

import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";
import privateRoutes from "./routes/private.routes";

// Init
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// app.use(cookieParser());
// app.use(
//   session({
//     secret: `${process.env.JWTSECRET}`,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

passport.use(passportMiddleWare);

app.use(authRoutes);
app.use(notesRoutes);
app.use(privateRoutes);

// Routes
app.get("/", function (req: express.Request, res: express.Response) {
  res.send(`http://localhost:${app.get("port")}`);
});

export default app;
