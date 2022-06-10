const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

const sendDataToS3 = async () => {
    const form = new FormData();
    
    form.append('diagram', fs.createReadStream('/home/evgeniia/study/rxVisualizer/backend/handleDataForVisualization/result/diagram.json'));
    
    await axios({
        method: 'post',
        url: 'http://localhost:1111/diagrams/upload-json',
        data: form,
        headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
        },
    })
    .then(response => {
        console.log(response);
    })
    .catch(e => {
        console.log(e);
    });
};

module.exports = {
    sendDataToS3
};