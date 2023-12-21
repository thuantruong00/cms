// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____

const sidebarControl = require("../../services/cms/sidebarControl")
// import sidebarControl from "../../services";

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____


// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
    let res_sidebar_ctrl = await sidebarControl.getSidebarContent("a51")
    // console.log(res_sidebar_ctrl)

    res.render("cms-page/product-detail",
        {
            ...res_sidebar_ctrl,
            layout: "./layouts/cms.ejs",
        }

    )
}

exports.action = action;