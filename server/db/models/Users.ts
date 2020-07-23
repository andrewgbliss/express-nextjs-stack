import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import moment from 'moment';

class Users extends Model {
  public email!: string;
  public password!: string;
  public resetPasswordHash: string;
  public resetPasswordTimeout: string;
  public verificationHash: string;

  static associate(models) {
    Users.belongsTo(models.Accounts, {
      foreignKey: 'accountId',
      as: 'account',
    });
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password);
  }
  setResetPassword() {
    const timeout = 15;
    const today = new Date();
    const twoweeks = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 14
    );
    const str = this.email + twoweeks.toISOString();
    this.resetPasswordHash = crypto.createHash('md5').update(str).digest('hex');
    this.resetPasswordTimeout = moment()
      .add(Number(timeout), 'minutes')
      .format();
  }

  unsetResetPassword() {
    this.resetPasswordHash = null;
    this.resetPasswordTimeout = null;
  }

  hasValidResetPassword() {
    return moment().isBefore(this.resetPasswordTimeout);
  }

  verifyPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

export const UsersFactory = (sequelize) => {
  Users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      accountId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationHash: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      resetPasswordHash: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      resetPasswordTimeout: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'users',
      sequelize,
      paranoid: true,
      hooks: {
        beforeUpdate(user: Users) {
          if (user.changed('password')) {
            user.hashPassword();
          }
        },
        beforeCreate(user: Users) {
          user.hashPassword();
          const today = new Date();
          const nextweek = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7
          );
          const str = this.email + nextweek.toISOString();
          user.verificationHash = crypto
            .createHash('md5')
            .update(str)
            .digest('hex');
        },
      },
    }
  );

  return Users;
};
