import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");
const Player = sequelize.define("Player", {
  playerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  playerName: DataTypes.STRING,
  currentVehicle: DataTypes.INTEGER,
});

export default Player;
