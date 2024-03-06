module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reply_to_id: {
            type: DataTypes.INTEGER,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    Comment.associate = models => {
        // Define associations
        Comment.belongsTo(models.User, {foreignKey: 'user_id'})
        Comment.belongsTo(models.Post, {foreignKey: 'post_id'})
    };
    return Comment
}