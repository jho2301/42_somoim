const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME || 'somoim_db',
	process.env.DB_USER || 'root',
	process.env.DB_PASSWORD || '',
	{
		host: process.env.DB_HOST || 'localhost',
		dialect: 'mysql'
	}
);

//set connection
function init_db() {

	//define Model

	const Model = Sequelize.Model;

	class Somoim extends Model { }

	Somoim.init(
		{
			somoim_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			description: {
				type: Sequelize.STRING,
			},
			somoim_url: {
				type: Sequelize.STRING,
			},
			campus: {
				type: Sequelize.STRING,
				allowNull: false
			},
			registant_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			represent_emoji: {
				type: Sequelize.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'somoim'
		}
	);
	Somoim.sync({ alter: true })
	return (Somoim);
}

const SomoimDB = init_db();

export default SomoimDB;


