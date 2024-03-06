const postMediaBasePath = 'uploads/post_media'

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        caption: {
            type: DataTypes.STRING,
        }
    })
    Post.associate = models => {
        // Define associations
        Post.belongsTo(models.User, {foreignKey: 'user_id'})
        Post.hasMany(models.PostMedia, { foreignKey: 'post_id' })
        Post.hasMany(models.Like, {foreignKey: 'post_id'})
        Post.hasMany(models.Comment, {foreignKey: 'post_id'})
    };
    return Post
}

module.exports.postMediaBasePath = postMediaBasePath