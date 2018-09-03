module.exports = function(sequelize, DataTypes) {
    var UserBooks = sequelize.define("userBooks", {
        status: DataTypes.STRING, 
        bookId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
      })
      return UserBooks;
    };