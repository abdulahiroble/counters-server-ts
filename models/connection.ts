import { Sequelize } from "sequelize-typescript";

import { Counter } from "./counter.model";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "counter-app",
  password: "123456",
  database: "counters",
  logging: false,
  models: [Counter],
});

export default connection;
