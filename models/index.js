const User = require('./User');
const blogPost = require('./blogPost');
const Comment = require('./Comment');

blogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
});

Comment.belongsTo(blogPost, {
  foreignKey: 'blogpost_id',
});

User.hasMany(blogPost, {
  foreignKey: 'user_name',
});

User.hasMany(Comment, {
  foreignKey: 'user_name',
});

blogPost.belongsTo(User, {
  foreginKey: 'user_name',
});

Comment.belongsTo(User, {
  foreignKey: 'user_name',
});

module.exports = { User, blogPost, Comment };