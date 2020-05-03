const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "somoim_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  }
);

// set connection
// define Model

function initDB() {
  const { Model } = Sequelize;

  class Somoim extends Model {}

  Somoim.init(
    {
      campus: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      somoim_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      somoim_url: {
        type: Sequelize.STRING,
      },
      registant_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      represent_emoji: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "somoim",
    }
  );
  Somoim.sync();
  return Somoim;
}

const SomoimDB = initDB();

exports.SomoimDB = SomoimDB;
