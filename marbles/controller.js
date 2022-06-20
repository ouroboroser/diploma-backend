const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
const { sendDataToS3 } = require('../handleDataForVisualization/sendDataToS3');

const getData = async ctx => {
    const pathToDiagram = path.join(__dirname, '../handleDataForVisualization/result/diagram.json');

    let data;

    if (fs.existsSync(pathToDiagram)) {
        data = JSON.parse(fs.readFileSync(pathToDiagram, 'utf8'));
    } else {
        data = [];
    };
   
    ctx.body = data;
};

const saveDiagramToS3 = async ctx => {
    const apiKey = ctx.request.body.apiKey;

    console.log('api keyAAAAAAAAAAAAAAAAAAAAAAAAAAA', apiKey);

    const pathToDiagram = path.join(__dirname, '../handleDataForVisualization/result/diagram.json');

    if (fs.existsSync(pathToDiagram)) {

        const form = new FormData();
        
        form.append('diagram', fs.createReadStream(pathToDiagram));

        await axios({
            method: 'post',
            url: 'http://localhost:1111/diagrams/upload-json',
            data: form,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            },
            params: {
                'apiKey': apiKey
            },
        })
        .then(response => {
            ctx.status = response.status,
            ctx.body = response.statusText
          
        })
        .catch(e => {
            const errStatus = e.response.status;
            const errorMsg = {
                error: e.response.data.error
            };

            ctx.throw(errStatus, errorMsg);
        });
    } else {
        console.log('Empty data');
    };

    //await sendDataToS3(apiKey);
    // ctx.body = 204;
};

module.exports = {
    getData,
    saveDiagramToS3
};