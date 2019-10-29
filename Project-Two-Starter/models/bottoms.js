module.exports = function(sequelize, DataTypes) {
    var Bottoms = sequelize.define("Bottoms", {
      bottom_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      bottom_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      bottom_temp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bottom_waterProof: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
    });
  
    return Bottoms;
  };