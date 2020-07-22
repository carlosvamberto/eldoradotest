module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define("device", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      category: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      color: {
          type:Sequelize.STRING(16),          
      },
      partNumber: {
          type: Sequelize.INTEGER,
          validate: { min: 1 }
      }
    });
  
    return Device;
  };