module.exports = function(sequelize, DataTypes) {
    var Shoes = sequelize.define("Shoes", {
      shoe_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      shoe_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      shoe_temp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shoe_waterProof: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
    });
  
    return Shoes;
  };