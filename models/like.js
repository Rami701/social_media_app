module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    Like.associate = models => {
        // Define associations
        Like.belongsTo(models.Post, { foreignKey: 'post_id' })
        Like.belongsTo(models.User, {foreignKey: 'user_id'})
    };
    return Like
}