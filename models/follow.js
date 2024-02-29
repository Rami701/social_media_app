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
    return Follow
}