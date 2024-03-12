module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('Follow', {
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        followed_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    Follow.associate = models => {
        Follow.belongsTo(models.User, {foreignKey: 'follower_id', as: 'follower'})
        Follow.belongsTo(models.User, {foreignKey: 'followed_id', as: 'followed'})
    }
    return Follow
}