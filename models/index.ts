'use strict';

import "dotenv/config";


import fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
import { DatabaseConnection } from "../interfaces/dataBaseConecction";
const db: any = {};
let sequelize: any;

const dbConfig: DatabaseConnection = {
  host: process.env.DB_HOST || '74.208.24.181',
  port: process.env.DB_PORT || '5432',
  username: process.env.DB_USR || 'postgres',
  password: process.env.DB_PSW || '90Y9B8yh$45',
  database: process.env.DB_NAME || 'clariti-cgv' 
};

sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'postgres',
});

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && ((file.slice(-3) === '.ts') ||  (file.slice(-3) === '.js'));
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
