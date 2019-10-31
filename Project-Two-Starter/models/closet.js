module.exports = function(sequelize, DataTypes) {
    var Closets = sequelize.define("Closets", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      type: {
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

    Closets.associate = function (models) {
      models.Closets.belongsTo(models.User)
    }
  
    return Closets;
  };