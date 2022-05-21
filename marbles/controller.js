const fs = require('fs');

const getData = async (ctx) => {
    const data = fs.readFileSync('diagram.json', 'utf8');
    ctx.body = JSON.parse(data)
};

module.exports = {
    getData
};