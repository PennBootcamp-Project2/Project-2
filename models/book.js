// const db = require(".")
module.exports = function(sequelize, DataTypes) {
    const Book = sequelize.define("Book", {
        isbn: {
          type: DataTypes.STRING,
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
        // current_book: {
        //     type: DataTypes.BOOLEAN, 
        //     required: false
        // },
        average_rating: {
            type: DataTypes.DECIMAL, 
            required: true
        }, 
        description: {
            type: DataTypes.STRING,
            required: true
        },
        image_link: {
            type: DataTypes.STRING,
            required: false
        },
        page_count: {
            type: DataTypes.INTEGER,
            required: false
        },
      });
    Book.associate = function(models){
        Book.belongsToMany(models.User, { 
            through: 'UserBooks'
        });
    }
      
    return Book;


  };


//   id int NOT NULL AUTO_INCREMENT,
//     isbn int NOT NULL,
// 	title varchar (255) NOT NULL, 
//     author varchar (255) NOT NULL,
//     purchase_link varchar(255) NOT NULL,
//     price int NULL,
//     average_rating DEC NOT NULL,
//     description varchar(2000) NOT NULL,
// 	PRIMARY KEY (id)