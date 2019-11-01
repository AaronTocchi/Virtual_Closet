var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  // Will add userId to Closet model
  User.associate = function(models) {
    User.hasMany(models.Closets, {foreignKey: 'userId',
     onDelete: "cascade"
    });
  };

  return User;
};
