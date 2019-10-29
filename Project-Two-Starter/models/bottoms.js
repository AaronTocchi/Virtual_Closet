module.exports = function(sequelize, DataTypes) {
    var Bottoms = sequelize.define("Bottoms", {
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
  
    return Bottoms;
  };