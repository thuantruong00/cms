// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____

const sidebarControl = require("../../services/cms/sidebarControl")

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____


// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
    let sidebar_data = await sidebarControl("a43", "superadmin")

    res.render("cms-page/post-category-detail",
        {
            ...sidebar_data,
            layout: "./layouts/cms-layout.ejs",
        }

    )
}

exports.action = action;