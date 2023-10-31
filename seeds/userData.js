const bcrypt = require('bcrypt');
const { User } = require('../models');

const userData = [
    {
        id: 1,
        username: 'mws1997',
        password: 'password1', // Plain text passwords get hashed into DB
        blogposts: ['Need help debugging.',]
    },
    {
        id: 2,
        username: 'mortimer',
        password: 'password2',
        blogposts: ['Dimensions',]
    },
    {
        id: 3,
        username: 'chrisJ77',
        password: 'password3',
    },
    {
        id: 4,
        username: 'VectorMan',
        password: 'password4',
    },
    {
        id: 5,
        username: 'NoobSaibot',
        password: 'password5',
    },
    {
        id: 6,
        username: 'kirby333',
        password: 'password6',
    },
    {
        id: 7,
        username: 'rickC137',
        password: 'password7',
    },
    {
        id: 8,
        username: 'frankB',
        password: 'password8',
    },
    {
        id: 9,
        username: 'osmosis',
        password: 'password9',
    },
    {
        id: 10,
        username: 'Testing',
        password: 'password123',
    },
];

const seedUserData = async () => {
    const seededUsers = await Promise.all(userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
        return {
            ...user,
            password: hashedPassword, // Store the hashed password
        };
    }));

    await User.bulkCreate(seededUsers);
};

module.exports = seedUserData;




