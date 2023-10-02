import { Request, Response, Router } from "express";
import { signIn, signUp } from "../controllers/users.controllers";

const router = Router();

router.get("/signup", function (req: Request, res: Response) {
  res.send("signup");
});
router.post("/signup", signUp);

router.get("/signin", function (req: Request, res: Response) {
  res.send("signin");
});
router.post("/signin", signIn, function (req: Request, res: Response) {
  res.redirect(`/notes`);
});

router.get("/notes", function (req: Request, res: Response) {
  res.send("Logged In");
});

export default router;
