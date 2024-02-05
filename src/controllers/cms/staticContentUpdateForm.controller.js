// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const { updateSectionOfPage, findAllSectionOfPagesByPageId } = require('../../models/SectionOfPage.model');
// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const data = req.body;
  const arrayObjects = Object.entries(data).reduce((acc, [key, value]) => {
    const [index, property] = key.match(/\d+|\w+/g);
    const obj = acc[index] || {};
    obj[property] = value;
    acc[index] = obj;
    return acc;
  }, []);

  const dataArray = arrayObjects.map((item) => {
    return {
      ...item,
      id: Number(item.id),
      display: item.display === 'false' ? false : true
    };
  });

  const resDB = await updateSectionOfPage(dataArray);
  var payload = [];
  if (resDB.status) {
    res.send({
      data: resDB
    });
  }
}

exports.action = action;

