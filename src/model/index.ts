/* eslint-disable camelcase */
import { Sequelize, Model, INTEGER, STRING } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'somoim_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    define: {
      underscored: true,
      freezeTableName: true,
    },
  }
);

class Somoim extends Model {
  id: number;

  campus: number;

  somoim_name: string;

  description: string;

  somoim_url: string;

  registant_name: string;

  represent_emoji: string;
}

Somoim.init(
  {
    campus: {
      type: INTEGER,
      allowNull: false,
    },
    somoim_name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: STRING,
    },
    somoim_url: {
      type: STRING,
    },
    registant_name: {
      type: STRING,
      allowNull: false,
    },
    represent_emoji: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'somoims',
  }
);

Somoim.sync();

enum Campus {
  MAROC1337 = 1,
  BELGIQUE19,
  RUSSIE21,
  LYON,
  MADRID,
  PARIS,
  SAOPAULO,
  SEOUL,
  SILICON_VALLEY,
  TOKYO,
  CODAM,
  HIVE,
}

export { Campus, Somoim };
