import axios from 'axios';

export default function sendErrorNotification(error, location, request) {
  axios.post('/services/T0HHFUDBJ/B05NDL383S7/3z2cRsHPpITQMwVFCPMfShSc', {
    text: `Error: ${error.message} \nin request: ${request} \nat file: ${location} `,
  });
}
