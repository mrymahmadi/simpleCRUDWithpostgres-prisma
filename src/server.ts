import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

//* 1. Fetches all released songs.
app.get("/playlist", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    success: true,
    payload: users,
    message: "Operation Successful",
  });
});

//* 2. Fetches a specific song by its ID.
app.get(`/user/:id`, async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
  });
  res.json({
    success: true,
    payload: user,
  });
});

//* 3. Creates a new user.
app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  });
  res.json({
    success: true,
    payload: result,
  });
});

//* 6. Deletes a song by its ID.
app.delete(`/user/:id`, async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.json({
    success: true,
    payload: user,
  });
});

//* 6. Deletes a song by its ID.
app.delete(`/user/:id`, async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      password,
      email,
    },
  });
  res.json({
    success: true,
    payload: user,
  });
});

app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

// #6
app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
