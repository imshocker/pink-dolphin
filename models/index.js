const User = require('./User');
const blogPost = require('./blogPost');
const Comment = require('./Comment');

blogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
});

Comment.belongsTo(blogPost, {
  foreignKey: 'blogpost_id',
});

module.exports = { User, blogPost, Comment };