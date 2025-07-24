
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { file, data } = JSON.parse(event.body || '{}');

  if (!file || !data) {
    return { statusCode: 400, body: 'Missing file or data' };
  }

  const filePath = path.join(__dirname, '..', file);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return { statusCode: 200, body: 'File saved successfully' };
  } catch (error) {
    return { statusCode: 500, body: 'Failed to write file' };
  }
};
