module.exports = function(sequelize, DataTypes) {
    var Tops = sequelize.define("Tops", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      temp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      waterProof: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
    },
    {
      timestamps: false
    });
  
    return Tops;
  };