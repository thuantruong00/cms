// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____

const sidebarControl = require("../../services/cms/sidebarControl")
// import sidebarControl from "../../services";

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____


// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;
    let sidebar_data = await sidebarControl("a52", role_current_user)
    // console.log(res_sidebar_ctrl)

    res.render(sidebar_data.active_page.page_name,
        {
            ...sidebar_data,
            layout: "./layouts/cms-layout.ejs",
        }

    )
}

exports.action = action;