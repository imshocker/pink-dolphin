const bcrypt = require('bcrypt');
const { User } = require('../models');

const userData = [
    {
        username: 'mws1997',
        password: 'password1', // Plain text password
    },
    {
        username: 'mortimer',
        password: 'password2',
    },
    {
        username: 'chrisJ77',
        password: 'password3',
    },
    {
        username: 'VectorMan',
        password: 'password4',
    },
    {
        username: 'NoobSaibot',
        password: 'password5',
    },
    {
        username: 'kirby333',
        password: 'password6',
    },
    {
        username: 'rickC137',
        password: 'password7',
    },
    {
        username: 'frankB',
        password: 'password8',
    },
    {
        username: 'osmosis',
        password: 'password9',
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




