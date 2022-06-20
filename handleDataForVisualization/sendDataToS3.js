const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

const sendDataToS3 = async apiKey => {
    // const pathToDiagram = path.join(__dirname, './result/diagram.json');

    // if (fs.existsSync(pathToDiagram)) {

    //     const form = new FormData();
        
    //     form.append('diagram', fs.createReadStream(pathToDiagram));

    //     await axios({
    //         method: 'post',
    //         url: 'http://localhost:1111/diagrams/upload-json',
    //         data: form,
    //         headers: {
    //             'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
    //         },
    //         params: {
    //             'apiKey': apiKey
    //         },
    //     })
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     });
    // } else {
    //     console.log('Empty data');
    // };

    // const form = new FormData();
    
    // form.append('diagram', fs.createReadStream('/home/evgeniia/study/rxVisualizer/backend/handleDataForVisualization/result/diagram.json'));
};

module.exports = {
    sendDataToS3
};