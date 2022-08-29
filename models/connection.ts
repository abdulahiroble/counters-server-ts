import { Sequelize } from "sequelize-typescript";
import { Counter } from "./counter.model";
import config from "config";

const connection = new Sequelize(config.get("mysql_db"), {
  dialect: "mysql",
  models: [Counter],
  logging: true,
});

export default connection;
