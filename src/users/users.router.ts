import express, { Router, Request, Response } from "express";
import { users } from "../data/users";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(users);
});

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const user = users.find((user) => user.id.toString() === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send();
  }
});

router.post("/", (req: Request, res: Response) => {
  const user = req.body;
  console.log("user", user);
  users.push(user);
  res.json(user);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const userData = req.body;
  const updatedUsers = users.map((user, idx) => {
    if (user.id.toString() === id) {
      const { name, age } = userData;
      user = { ...user, age, name };
    }
    return user;
  });
  res.json(updatedUsers);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedUsers = users.filter((user) => user.id.toString() !== id);
  res.json(updatedUsers);
});
export default router;
