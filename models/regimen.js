module.exports = function(sequelize, DataTypes) {
    const Regimen = sequelize.define("Regimen", {
        page_count: {
          type: DataTypes.INTEGER,
          required: true
        },
        current_page: {
          type: DataTypes.INTEGER,
          required: true
        },
        start_date: {
          type: DataTypes.DATEONLY, 
          required: true
        },
        end_date: {
            type: DataTypes.DATEONLY, 
            required: false
        }, 
        userId: {
            type: DataTypes.INTEGER, 
            required: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            required: true
        }
      });
    // Regimen.associate = function(models){
    //     Regimen.belongsTo(models.Book, { 
    //         through: 'BookRegimen'
    //     });
    // }
      
    return Regimen;


  };