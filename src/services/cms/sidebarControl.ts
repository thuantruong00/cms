const sidebar_content = require('../../../config/cms-sidebar.json');

const getSidebarContent = async (id: number) => {
  // console.log(sidebar_content)
  let active_page = undefined;
  let page_parent_active;
  let error_page = {
    active_page: {
      title: 'Lỗi',
      page_name: './cms/error',
      page_parent_active: 'a0',
      page_id: 'a0'
    },
    sidebar: sidebar_content
  };
  try {
    for (const key of sidebar_content) {
      if (active_page == undefined) {
        if (key.child.length > 0) {
          page_parent_active = key.page_id;
          if (key.page_id == id) {
            // page_parent_active = key.page_id
            active_page = key;
            break;
          } else {
            for (const key2 of key.child) {
              if (key2.page_id == id) {
                active_page = key2;
                break;
              }
            }
          }
        } else {
          if (key.page_id == id) {
            page_parent_active = key.page_id;
            active_page = key;
            break;
          }
        }
      } else {
        break;
      }
    }
  } catch (error) {
    console.log(error);
    return error_page;
  }
  // console.log("ssss", active_page)
  if (active_page != undefined) {
    return {
      active_page: {
        title: active_page.title,
        page_name: active_page.page_name,
        page_parent_active: page_parent_active,
        page_id: active_page.page_id
      },
      sidebar: sidebar_content
    };
  } else {
    return error_page;
  }
};

export default getSidebarContent;
