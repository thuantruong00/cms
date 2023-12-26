// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl')


// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____


// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
    let sidebar_data = await sidebarControl("a53", "superadmin"); 

    res.render('cms-page/product-category-detail',
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