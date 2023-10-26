const {Comment} = require('../models');
const commentdata = [

  {
    blogpost_id: 1,
    date: '11/22/2015',
    user_name: 'kirby333',
    contents: 'My suggestion would be to create a minimum version of your website in codepen.io 8 or codesandbox.io 4 that replicates your issue. It will it make it easier of us to help you.',
  },
  {
    blogpost_id: 2,
    date: '10/25/2023',
    user_name: 'rickC137',
    contents: 'You really are a disappointment, Morty. You are a walking, talking blemish on the face of intelligence. There are an infinite amount of Universes, Morty. Infinite. An infinite number of timelines.',
  },
  {
    blogpost_id: 2,
    date: '10/25/2083',
    user_name: 'rickC137',
    contents: 'See Morty. I am commenting on your post exactly 60 years into the future. How awesome Morty?!',
  },
  {
    blogpost_id: 3,
    date: '10/26/2023',
    user_name: 'frankB',
    contents: 'React is one, and it was developed by Facebook. Vue.js is also another one.',

  },
  {
    blogpost_id: 4,
    date: '09/07/2023',
    user_name: 'osmosis',
    contents: 'var has function scope and can be hoisted. let has block scope and cannot be hoisted. const has block scope and cannot be hoisted, and its value cannot be reassigned after declaration.',
  },
  {
    blogpost_id: 5,
    date: '09/22/2023',
    user_name: 'rickC137',
    contents: 'What does this have to do with tech, or even science at all for that matter?',
  },
  {
    blogpost_id: 5,
    date: '09/22/2023',
    user_name: 'NoobSaibot',
    contents: '@rickC137 >:(',
  },
]


const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;