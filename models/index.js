const User = require('./User');
const blogPost = require('./blogPost');
const Comment = require('./Comment');

User.hasMany(blogPost, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_name',
});

blogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

blogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
});

Comment.belongsTo(blogPost, {
  foreignKey: 'blogpost_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_name',
});

module.exports = { User, blogPost, Comment };