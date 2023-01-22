//user model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true, //checks for email format
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastLoginTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      registrationTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
      },
    },
    { timestamps: false }
  );
  return User;
};
