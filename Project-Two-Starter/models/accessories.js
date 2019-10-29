module.exports = function(sequelize, DataTypes) {
    var Accessories = sequelize.define("Accessories", {
      accessory_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      accessory_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      accessory_temp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accessory_waterProof: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
    });
  
    return Accessories;
  };