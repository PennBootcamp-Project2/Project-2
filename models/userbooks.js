module.exports = function(sequelize, DataTypes) {
    var UserBooks = sequelize.define("UserBooks", {
        status: DataTypes.STRING
      })
      return UserBooks;
    };