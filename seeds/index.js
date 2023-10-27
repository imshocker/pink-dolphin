const sequelize = require('../config/connection');
const seedblogPosts = require('./blogPostData');
const seedComments = require('./commentData');
const seedUser = require('./userData');
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedblogPosts();

  await seedComments();

  process.exit(0);
};

seedAll();
