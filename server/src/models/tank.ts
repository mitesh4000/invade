import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");

const Tank = sequelize.define("Tank", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  x: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  y: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  angle: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hull: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  track: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  moving: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export { Tank };
