module.exports = (sequelize, DataTypes) => {
    const PostMedia = sequelize.define('PostMedia', {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        media_path: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return PostMedia
}