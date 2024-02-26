let click_status = true;
$('.my-dropdown-button').click(function () {
  /*
    ===== dropdown menu
        <a class="my-dropdown-button"  dropdown-menu-name="#profile" ></a>
        <div class="dropdown-child-buble" id="profile"></div>
        dropdown-child-buble : close when click out
    */
  click_status = false;
  let menu_id = $(this).attr('dropdown-menu-name');
  $(menu_id).toggleClass('d-none');
  $(this).toggleClass('dropdown-btn-active');
  setTimeout(() => {
    click_status = true;
  }, 1000);
});

$(window).click(function () {
  if (click_status) {
    // console.log('w');
    $('.dropdown-btn-buble').removeClass('dropdown-btn-active');
    $('.dropdown-child-buble').addClass('d-none');
  }
});

function handleUploadFile(type) {
  let data = $(`#input-${type}-file`).val();
  $.ajax({
    url: `/cms/custom/upload/${type}`,
    data: { d: data },
    type: 'post',
    cache: false,

    success: function (result) {
      alert(result.message);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert('Chinh sua that bai');
    }
  });
}

//post category
function handleOnChangePostName(isCategory) {
  let postName = $('#ip-name').val().trim().toLowerCase();
  let slug = convertViToEn(postName.replaceAll(' ', '-'));
  console.log(slug);

  if (isCategory) {
    document.getElementById('ip-slug').value = `/cms/${slug}`;
  } else {
    var selectValue = $('#select-category-option').find(':selected').text();
    selectValue = convertViToEn(selectValue.trim().toLowerCase());
    selectValue = selectValue.replaceAll(' ', '-');
    document.getElementById('ip-slug').value = `/cms/${selectValue}/${slug}`;
  }
}

function handleSubmitCategoryPost() {
  let postName = $('#ip-name').val();
  let postSlug = $('#ip-slug').val();
  let postDescription = $('#ip-description').val();

  if (postName.trim() == '' || postSlug.trim() == '' || postDescription.trim() == '') {
    alert('Missing parameter');
    return;
  }

  let data = {
    postName,
    postSlug,
    postDescription
  };

  $.ajax({
    url: `/cms/post-category`,
    data,
    type: 'post',
    cache: false,
    success: function (result) {
      if (result.errCode == 0) {
        document.getElementById('ip-name').value = ` `;
        document.getElementById('ip-slug').value = ``;
        document.getElementById('ip-description').value = ``;
        alert(result.message);
        location.reload();
      } else if (result.errCode == 1) {
        alert(result.message);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('error');
    }
  });
}

function handleDeleteCategory(id) {
  $.ajax({
    url: `/cms/post-category/delete/${id}`,
    type: 'post',
    data: id,
    cache: false,
    success: function (result) {
      $('.btn-close').click();

      if (result.errCode == 0) {
        alert(result.message);
        location.reload();
      } else if (result.errCode == 1) {
        alert(result.message);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('error');
    }
  });
}

function handleFillEditCategory(id) {
  let postName = $(`#name-id-${id}`).html();
  let postSlug = $(`#slug-id-${id}`).html();
  let postDescription = $(`#description-id-${id}`).html();

  document.getElementById('ip-name').value = postName;
  document.getElementById('ip-slug').value = postSlug;
  document.getElementById('ip-description').value = postDescription;

  $(`.button-submit`).addClass('d-none');
  $(`.button-edit`).removeClass('d-none');
  $(`.button-edit`).attr('id-item', id);
}

function handleEditCategory(id) {
  let postName = $('#ip-name').val();
  let postSlug = $('#ip-slug').val();
  let postDescription = $('#ip-description').val();

  if (postName.trim() == '' || postSlug.trim() == '' || postDescription.trim() == '') {
    alert('Missing parameter');
    return;
  }

  let data = {
    postName,
    postSlug,
    postDescription
  };

  $.ajax({
    url: `/cms/post-category/update/${id}`,

    data,
    type: 'post',
    cache: false,
    success: function (result) {
      console.log(result);
      if (result.errCode == 0) {
        alert(result.message);
        location.reload();
      } else if (result.errCode == 1) {
        alert(result.message);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('error');
    }
  });
}

//post
function handleCreateNewPost() {
  let content = editorContent.getData();
  let excerpt = editorExcerpt.getData();
  let title = $('#ip-name').val().trim();
  let slug = convertViToEn($('#ip-slug').val().trim());
  let url = $('#image-post').attr('src');
  let checked = $('#active-checked').is(':checked');
  let status = checked ? 'active' : 'inactive';
  var selectValue = $('#select-category-option').find(':selected').val();

  if (selectValue == '') {
    selectValue = 1;
  }

  if (content == '' || excerpt == '' || title == '' || slug == '' || url == '/cms/images/index/default-image.jpeg') {
    alert('Missing parameter');
    return;
  }

  if (!slug.startsWith('/cms/')) {
    alert('Slug start with "/cms/"');
    return;
  }

  let data = {
    content,
    excerpt,
    title,
    slug,
    url,
    status,
    selectValue
  };

  $.ajax({
    url: `/cms/new-post`,
    data,
    type: 'post',
    cache: false,
    success: function (result) {
      if (result.errCode == 0) {
        alert(result.message);
        location.reload();
      } else if (result.errCode == 1) {
        alert(result.message);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('error');
    }
  });
}

//detail post
function handleDeletePost(idPost, idCategory) {
  $.ajax({
    url: `/cms/post/delete/${idPost}/${idCategory}`,
    type: 'post',
    cache: false,
    success: function (result) {
      if (result.errCode == 0) {
        $('.btn-close').click();
        $(`#row-id-${idPost}`).addClass('d-none');
        alert(result.message);
      } else {
        $('.btn-close').click();
        alert(result.message);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('error');
    }
  });
}

function handleEditPost(idPost) {
  let content = editorContent.getData();
  let excerpt = editorExcerpt.getData();
  let title = $('#ip-name').val().trim();
  let slug = convertViToEn($('#ip-slug').val().trim());
  let url = $('#image-post').attr('src');
  let checked = $('#active-checked').is(':checked');
  let status = checked ? 'active' : 'inactive';
  var selectValue = $('#select-category-option').find(':selected').val();

  if (content == '' || excerpt == '' || title == '' || slug == '') {
    alert('Missing parameter');
    return;
  }

  if (!slug.startsWith('/cms/')) {
    alert('Slug start with "/cms/"');
    return;
  }

  let data = {
    content,
    excerpt,
    title,
    slug,
    url,
    status,
    selectValue
  };
  $.ajax({
    url: `/cms/post/edit/${idPost}`,
    data,
    type: 'post',
    cache: false,
    success: function (result) {
      if (result.errCode == 0) {
        alert(result.message);
        window.location.href = '/cms/post';
      } else {
        alert(result.message);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('error');
    }
  });
}

function handleOpenModalPost() {
  $('.wrap-modal').toggleClass('d-none');
}

function handleSubmitPost() {
  if (!$("input[name='image-check']").is(':checked')) {
    alert('Nothing to submit!');
  } else {
    const url = $('input[type=radio]:checked').attr('url');
    $(`#image-post`).attr('src', url);
    $('.wrap-modal').toggleClass('d-none');
    $('.wrap-view-image').removeAttr('id-modal');
  }
}

//Category product
function handleOnChangeCategoryProductName(isCategory) {
  let postName = $('#ip-category-product-name').val().trim().toLowerCase();
  let slug = convertViToEn(postName.replaceAll(' ', '-'));

  if (isCategory) {
    document.getElementById('ip-category-product-slug').value = `/cms/${slug}`;
  } else {
    var selectValue = $('#select-category-option').find(':selected').text();
    selectValue = convertViToEn(selectValue.trim().toLowerCase());
    selectValue = selectValue.replaceAll(' ', '-');
    document.getElementById('ip-category-product-slug').value = `/cms/${selectValue}/${slug}`;
  }
}

function handleSubmitCategoryProduct() {
  let name = $('#ip-category-product-name').val();
  let slug = $('#ip-category-product-slug').val();
  let description = $('#ip-category-product-description').val();
  var selectValue = $('#select-category-option').find(':selected').val();
  var parent_id = null;
  // if (selectValue != 0) {
  //   parent_id = selectValue;
  // }

  if (name.trim() == '' || slug.trim() == '' || description.trim() == '') {
    alert('Missing parameter');
    return;
  }

  let data = {
    name,
    slug,
    description,
    parent_id
  };

  $.ajax({
    url: `/cms/product-category`,
    data,
    type: 'post',
    cache: false,
    success: function (result) {
      if (result.errCode == 0) {
        alert(result.message);
        document.getElementById('ip-category-product-name').value = ` `;
        document.getElementById('ip-category-product-slug').value = ``;
        document.getElementById('ip-category-product-description').value = ``;
        $('#select-id-0').attr('selected', 'selected');
        location.reload();
      } else if (result.errCode == 1) {
        alert(result.message);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('error');
    }
  });
}

function handleDeleteCategoryProduct(id) {
  $.ajax({
    url: `/cms/product-category/delete/${id}`,
    type: 'post',
    cache: false,
    success: function (result) {
      $('.btn-close').click();

      if (result.errCode == 0) {
        setTimeout(() => {
          alert(result.message);
        }, 200);
        $(`#row-id-${id}`).addClass('d-none');
      } else if (result.errCode == 1) {
        setTimeout(() => {
          alert(result.message);
        }, 200);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('error');
    }
  });
}

function handleFillEditCategoryProduct(id) {
  let postName = $(`#name-id-${id}`).html();
  let postSlug = $(`#slug-id-${id}`).html();
  let postDescription = $(`#description-id-${id}`).html();

  document.getElementById('ip-category-product-name').value = postName;
  document.getElementById('ip-category-product-slug').value = postSlug;
  document.getElementById('ip-category-product-description').value = postDescription;

  $(`.button-submit`).addClass('d-none');
  $(`.button-edit`).removeClass('d-none');
  $(`.button-edit`).attr('id-item', id);
}
//
function handleEditCategoryProduct(id) {
  let name = $('#ip-category-product-name').val();
  let slug = $('#ip-category-product-slug').val();
  let description = $('#ip-category-product-description').val();

  if (name.trim() == '' || slug.trim() == '' || description.trim() == '') {
    alert('Missing parameter');
    return;
  }

  let data = {
    name,
    slug,
    description
  };

  $.ajax({
    url: `/cms/product-category/update/${id}`,

    data,
    type: 'post',
    cache: false,
    success: function (result) {
      if (result.errCode == 0) {
        alert(result.message);
        document.getElementById('ip-category-product-name').value = ` `;
        document.getElementById('ip-category-product-slug').value = ``;
        document.getElementById('ip-category-product-description').value = ``;
        $('#select-id-0').attr('selected', 'selected');
        location.reload();
      } else if (result.errCode == 1) {
        alert(result.message);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('error');
    }
  });
}

//other function
function convertViToEn(str) {
  str = str.replace(/\s+/g, ' ');
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str;
}

function clearInputPost() {
  editorContent.setData('');
  editorContent.getData('');
  document.getElementById('#ip-name').value = '';
  document.getElementById('#ip-slug').value = '';
  $('#image-post').attr('src', '/cms/images/index/default-image.jpeg');
  $('#active-checked').prop('checked', true);
  $('#select-id-1').attr('selected', 'selected');
}

