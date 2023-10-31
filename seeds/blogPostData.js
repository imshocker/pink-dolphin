const { blogPost } = require('../models');

const blogpostdata = [
  {
    id: 1,
    title: 'Need help debugging.',
    date: '10/26/2023',
    user_id: 1,
    contents: 'Could someone help me out, I keep getting errors with this code.\n' +
      'var animation = bodymovin.loadAnimation({ \n' +
      'container: document.getElementById(anim), \n' +
      'rederer: svg, \n' +
      'loop: true, \n' +
      'autoplay true, \n' +
      'path: data.json \n' +
      '});',
  },
  {
    id: 2,
    title: 'Dimensions',
    date: '10/23/2023',
    user_id: 2,
    contents: 'How many dimensions are there really?',
  },
  {
    id: 3,
    title: 'Front end frameworks',
    date: '10/26/2023',
    user_id: 3,
    contents: 'Could someone give me a good framework for building user interfaces?',
  },
  {
    id: 4,
    title: 'Variables',
    date: '08/13/2023',
    user_id: 4,
    contents: 'What is the difference between let, const, and var for variable declaration?',
  },
  {
    id: 5,
    title: 'Where is he?',
    date: '09/20/2023',
    user_id: 5,
    contents: 'I am looking for Hanzo Hasashi. If anyone knows where he is, I would greatly appreciate the information.',
  },
  {
    id: 6,
    title: 'TEST',
    date: '10/30/2023',
    user_id: 10,
    contents: 'TEST',
  }
];

const seedblogPost = () => blogPost.bulkCreate(blogpostdata);

module.exports = seedblogPost;