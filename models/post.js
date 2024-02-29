module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        media_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        caption: {
            type: DataTypes.STRING,
        }
    })
    return Post
}