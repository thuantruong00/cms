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

  console.log(arrayObjects)

  arrayObjects.map(async (item) => { 
    await updateSectionOfPage({
      ...item,
      id: Number(item.id),
      display: item.display === 'false' ? false : true
    });
  });

  res.send({
    data: 'ok'
  })
}

exports.action = action;

