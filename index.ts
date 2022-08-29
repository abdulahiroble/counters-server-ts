import express, { Request, Response } from "express";
import "reflect-metadata";
import cors from "cors";
import config from "config";
import bodyParser from "body-parser";

import connection from "./models/connection";
import { Counter } from "./models/counter.model";

const app = express();

//cross origin allowed
app.use(cors({ origin: config.get("origin") }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(
  "/api/counters",
  async (req: Request, res: Response): Promise<Response> => {
    const counters: Counter[] = await Counter.findAll();
    return res.status(200).json(counters);
  }
);

app.post(
  "/api/counters",
  async (req: Request, res: Response): Promise<Response> => {
    const counter: Counter = await Counter.create({ value: 0, liked: false });
    return res.status(201).json(counter);
  }
);

app.put(
  "/api/counters",
  async (req: Request, res: Response): Promise<Response> => {
    await Counter.update({ value: 0 }, { where: {} });
    const resetedCounters: Counter[] = await Counter.findAll();
    return res.status(200).json(resetedCounters);
  }
);

app.put(
  "/api/counters/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await Counter.update({ ...req.body }, { where: { id } });
    const updatedCounter: Counter | null = await Counter.findByPk(id);
    return res.status(200).json(updatedCounter);
  }
);

app.delete(
  "/api/counters",
  async (req: Request, res: Response): Promise<Response> => {
    await Counter.destroy({ where: {} });
    return res.status(200).json({ message: "All counters deleted" });
  }
);

app.delete(
  "/api/counters/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedCounter: Counter | null = await Counter.findByPk(id);
    await Counter.destroy({ where: { id } });
    return res.status(200).json(deletedCounter);
  }
);

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(3001, () => {
      console.log("Server started on port 3001");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
