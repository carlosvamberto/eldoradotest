module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
          type: Sequelize.STRING(128),
          allowNull: false,
          validate: {
            notEmpty:true,
            notNull: {msg:"Please enter your name"},
            len: [1,128]            
          }
      }
    });
  
    return Category;
  };