const fs = require('fs').promises;

async function modifyCssFile(cssFilePath, newContent) {
  try {
    await fs.writeFile(cssFilePath, newContent, 'utf8');
  } catch (error) {
    console.error(`Error modifying CSS file: ${error}`);
    throw error;
  }
}

async function action(req, res) {
  const type = req.params.type;
  const data = req.body.d;

  if (type == 'css') {
    // Usage example
    const cssFilePath = './src/statics/cms/styles/custom.css';

    modifyCssFile(cssFilePath, data)
      .then(() => {
        res.send({
          message: 'Update css successfully'
        });
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  } else {
    const jsFilePath = './src/statics/cms/scripts/custom.js';

    modifyCssFile(jsFilePath, data)
      .then(() => {
        res.send({
          message: 'Update js successfully'
        });
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }
}

exports.action = action;

