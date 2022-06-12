const fs = require('fs');
const { sendDataToS3 } = require('../handleDataForVisualization/sendDataToS3');
//const t = require('../handleDataForVisualization/result/diagram.json')

const getData = async (ctx) => {
    const data = fs.readFileSync('/home/evgeniia/study/rxVisualizer/backend/handleDataForVisualization/result/diagram.json', 'utf8');
    // await sendDataToS3();
    ctx.body = JSON.parse(data);
};

module.exports = {
    getData
};