module.exports = function (sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    isbn: {
      type: DataTypes.INTEGER,
      required: true
    },
    title: {
      type: DataTypes.STRING,
      required: true
    },
    author: {
      type: DataTypes.STRING,
      required: true
    },
    purchase_link: {
      type: DataTypes.STRING,
      required: false
    },
    price: {
      type: DataTypes.INTEGER,
      required: false
    },
    average_rating: {
      type: DataTypes.DECIMAL,
      required: true
    },
    description: {
      type: DataTypes.STRING,
      required: true
    }
  });
  return Book;
  Book.belongsToMany(User, {
    through: UserBooks
  })

};