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
  campus: number;

  somoim_name: string;

  description: string;

  somoim_url: string;

  registant_name: string;

  represent_url: string;
}

// define Model

function initDB() {
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
  Somoim.sync({ force: true });
  return Somoim;
}

const SomoimDB = initDB();

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

async function getUserCampusNo(email) {
  let emailTemp = email.split('@');
  if (emailTemp[1].indexOf('student') !== -1) emailTemp = emailTemp[1].split('student.');

  switch (emailTemp[1]) {
    case '1337.ma':
      return Campus.MAROC1337;
    case '19.be':
      return Campus.BELGIQUE19;
    case '21-school.ru':
      return Campus.RUSSIE21;
    case 'le-101.fr':
      return Campus.LYON;
    case '42madrid.com':
      return Campus.MADRID;
    case '42.fr':
      return Campus.PARIS;
    case '42sp.org.br':
      return Campus.SAOPAULO;
    case '42seoul.kr':
      return Campus.SEOUL;
    case '42.us.org':
      return Campus.SILICON_VALLEY;
    case '42tokyo.jp':
      return Campus.TOKYO;
    case 'codam.nl':
      return Campus.CODAM;
    default:
      return -1;
  }
}

async function getUserCampusName(campusNo) {
  switch (campusNo) {
    case Campus.MAROC1337:
      return '1337';
    case Campus.BELGIQUE19:
      return '19';
    case Campus.RUSSIE21:
      return '21';
    case Campus.LYON:
      return '42lyon';
    case Campus.MADRID:
      return '42madrid';
    case Campus.PARIS:
      return '42paris';
    case Campus.SAOPAULO:
      return '42saopaulo';
    case Campus.SEOUL:
      return '42seoul';
    case Campus.SILICON_VALLEY:
      return '42sv';
    case Campus.TOKYO:
      return '42tokyo';
    case Campus.CODAM:
      return 'codam';
    default:
      return 'undefined campus';
  }
}

export { getUserCampusNo, getUserCampusName, Campus, SomoimDB };
