const sidebar_content = require("../../../config/cms-sidebar.json")

async function getSidebarContent(req, res, href) {
    // console.log(sidebar_content)
    let page_active
    let page_parent_active
    // console.log(page_active)
    for (const key of sidebar_content) {
        if (key.child.length > 0 && page_active == undefined) {
            page_parent_active = key.page_name
            if (key.href == href) {
                page_parent_active = key.page_name
                page_active = key
                break;
            } else {
                for (const key2 of key.child) {
                    if (key2.href == href) {
                        page_active = key2;
                        break;
                    }
                }
            }

        }
        else {
            if (key.href == href) {
                page_parent_active = key.page_name
                page_active = key
                break;
            }
        }
    }
    // console.log("page_active",page_active)




    // res.render(page_active.page_name,
    //     {
    //         page_title: page_active.title,
    //         sidebar: sidebar_content,
    //         page_name: page_active.page_name,
    //         page_parent_active: page_parent_active,
    //         // layout:"./layouts/cms-layout.ejs"
    //         // payload:req.session.views
    //     }
    // )
    res.render(page_active.page_name,
        {
            page_title: page_active.title,
            sidebar: sidebar_content,
            page_name: page_active.page_name,
            page_parent_active: page_parent_active,
            layout: "./layouts/cms.ejs"
        }
        
    )
}

exports.getSidebarContent = getSidebarContent;