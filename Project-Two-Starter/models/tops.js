module.exports = function(sequelize, DataTypes) {
    var Tops = sequelize.define("Tops", {
      top_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      top_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      top_temp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      top_waterProof: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
    });
  
    return Tops;
  };