import { DataTypes, Sequelize } from "sequelize";

const sequlize = new Sequelize("sqlite::memory:");

const CustomVehicles = sequlize.define("CustomVehicles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default CustomVehicles;
