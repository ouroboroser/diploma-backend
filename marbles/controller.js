const fs = require('fs');
//const t = require('../handleDataForVisualization/result/diagram.json')

const getData = async (ctx) => {
    const data = fs.readFileSync('/home/evgeniia/study/rxVisualizer/backend/handleDataForVisualization/result/diagram.json', 'utf8');
    ctx.body = JSON.parse(data)
};

module.exports = {
    getData
};