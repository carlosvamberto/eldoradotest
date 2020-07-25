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
          validate: {
            isInt:true,
            notNull: {msg:"Please enter your category"},
          }
      },
      color: {
          type:Sequelize.STRING(16),
          allowNull: false,           
          validate: {
            notEmpty: true, 
            notNull: {msg:"Please enter your color name"},
            len: [1,16] 
          } 
      },
      partNumber: {
          type: Sequelize.INTEGER,
          validate: { min: 1 }
      }
    });
  
    return Device;
  };