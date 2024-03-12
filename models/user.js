const profileImageBasePath = 'uploads/profile_images'

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING,
        },
        profileImageName: {
            type: DataTypes.STRING,
        },
    })
    User.associate = models => {
        User.hasMany(models.Post, {foreignKey: 'user_id'})
        User.hasMany(models.Like, {foreignKey: 'user_id'})
        User.hasMany(models.Comment, {foreignKey: 'user_id'})
        User.hasMany(models.Follow, {foreignKey: 'follower_id'})
        User.hasMany(models.Follow, {foreignKey: 'followed_id'})
    }
    return User
}
module.exports.profileImageBasePath = profileImageBasePath
