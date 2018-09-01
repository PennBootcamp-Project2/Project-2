module.exports = function(sequelize, DataTypes) {
    var Books = sequelize.define("Books", {
      author: DataTypes.STRING,
      title: DataTypes.STRING
    });
    return Books;
  };  