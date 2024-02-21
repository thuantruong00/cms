// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('~/services/cms/sidebarControl');

const authorize = require('~/middlewares/authorization.middleware.js');

const { getAllUsers, createUser } = require('~/models/User.model.ts');

// utils
const date = require('~/utils/date.util.js');

const CreateAccountHandler = async (req, res, next) => {
  const { username, password, email } = req.body;
  const user = await createUser(username, password, email);

  if (!user) {
    res.send({ status: 'fail' });
  }
  res.send({ status: 'success' });
};

const AccountViewHandler = [
  authorize(['root', 'superadmin']),
  async (req, res, next) => {
    
    //
    const sidebarData = await sidebarControl('a1', 'root');

    // query db to get all users
    const users = await getAllUsers();

    // formatting raw user array
    const formattedUsers = users.reduce((result, item, idx) => {
      console.log({ result });
      const { id, username, status, type, created_at } = item;
      if (type !== 'root') {
        result.push({ id, username, role: type, status, created_at: date.format(created_at) });
        return result;
      }
      return result;
    }, []);

    // result
    res.render(sidebarData.active_page.page_name, {
      layout: 'layouts/cms-layout.ejs',
      ...sidebarData,
      payload: [...formattedUsers]
    });
  }
];

const UpdateAccountHandler = [
  authorize(['root', 'superadmin']),
  (req, res, next) => {
    console.log(req.originalUrl);
  }
];

module.exports = { AccountViewHandler, UpdateAccountHandler, CreateAccountHandler };
