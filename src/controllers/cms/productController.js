// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebar = require('../../services/cms/sidebarControl')


// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____


// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;

    let sidebar_data = await sidebar("a51", role_current_user); 
    
    res.render("cms-page/product",
        {
            ...sidebar_data,
            layout: "./layouts/cms-layout.ejs",
        }

    )
    // res.render(sidebar_data.active_page.page_name,
    //     {
    //         ...sidebar_data,
    //         layout: "./layouts/cms.ejs",
    //     }

    // )
}

exports.action = action;