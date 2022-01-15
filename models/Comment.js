const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create the Comment Model
class Comment extends Model {}

// define table columns and their configuration
Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		comment_text: {
			type: DataTypes.STRING,
			allowNulle: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		},
		post_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "post",
				key: "id",
			},
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "comment",
	}
);

module.exports = Comment;
