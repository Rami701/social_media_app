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
    PostMedia.associate = models => {
        // Define associations
        PostMedia.belongsTo(models.Post, { foreignKey: 'post_id' }); // Each media file belongs to a post
    };
    return PostMedia
}