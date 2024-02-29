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
    return Comment
}