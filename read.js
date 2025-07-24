
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const file = event.queryStringParameters.file;

  if (!file) {
    return { statusCode: 400, body: 'Missing file name' };
  }

  const filePath = path.join(__dirname, '..', file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: content,
    };
  } catch (error) {
    return { statusCode: 500, body: 'Failed to read file' };
  }
};
