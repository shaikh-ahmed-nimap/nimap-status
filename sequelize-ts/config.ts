import { Sequelize } from "sequelize";

const sequelize = new Sequelize('sequelize_ts', 'root', '12345678', {
    dialect: "mysql"
});

export default sequelize;