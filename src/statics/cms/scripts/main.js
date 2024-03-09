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
function handleOnChangeName(isCategory, isProduct) {
  let name = $('#ip-name').val().trim().toLowerCase();
  let slug = convertViToEn(name.replaceAll(' ', '-'));

  if (isCategory) {
    if (isProduct) {
      document.getElementById('ip-slug').value = `${slug}`;
      document.getElementById('ip-hint').innerText = `/cms/product-category/${slug}`;
    } else {
      document.getElementById('ip-slug').value = `${slug}`;
      document.getElementById('ip-hint').innerText = `/cms/post-category/${slug}`;
    }
  } else {
    if (isProduct) {
      document.getElementById('ip-slug').value = `${slug}`;
      document.getElementById('ip-hint').innerText = `/cms/product/${slug}`;
    } else {
      document.getElementById('ip-slug').value = `${slug}`;
      document.getElementById('ip-hint').innerText = `/cms/post/${slug}`;
    }
  }
}

function handleOnChangeSlug(isCategory, isProduct) {
  let name = $('#ip-slug').val().trim().toLowerCase();
  let slug = convertViToEn(name.replaceAll(' ', '-'));

  if (isCategory) {
    if (isProduct) {
      document.getElementById('ip-hint').innerText = `/cms/product-category/${slug}`;
    } else {
      document.getElementById('ip-hint').innerText = `/cms/post-category/${slug}`;
    }
  } else {
    if (isProduct) {
      document.getElementById('ip-hint').innerText = `/cms/product/${slug}`;
    } else {
      document.getElementById('ip-hint').innerText = `/cms/post/${slug}`;
    }
  }
}

function handleSubmitCategoryPost() {
  let postName = $('#ip-name').val().trim();
  let hint = $('#ip-slug').val().trim();
  let postSlug = $('#ip-hint').text().trim();
  let postDescription = $('#ip-description').val().trim();

  if (postName == '' || postSlug == '' || postDescription == '' || hint == '') {
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
  document.getElementById('ip-description').value = postDescription;
  document.getElementById('ip-hint').innerText = postSlug;

  document.getElementById('ip-slug').value = getSlugHint(postSlug);

  $(`.button-submit`).addClass('d-none');
  $(`.button-edit`).removeClass('d-none');
  $(`.button-edit`).attr('id-item', id);
}

function handleEditCategory(id) {
  let postName = $('#ip-name').val().trim();
  let postSlug = $('#ip-hint').text().trim();
  let postDescription = $('#ip-description').val().trim();

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
  let slug = convertViToEn($('#ip-hint').text().trim());
  let hint = $('#ip-slug').val().trim();
  let url = $('#image-post').attr('src');
  let checked = $('#active-checked').is(':checked');
  let status = checked ? 'active' : 'inactive';
  var selectValue = $('#select-category-option').find(':selected').val();

  if (selectValue == '') {
    selectValue = 1;
  }

  if (
    content == '' ||
    excerpt == '' ||
    title == '' ||
    slug == '' ||
    hint == '' ||
    url == '/cms/images/index/default-image.jpeg'
  ) {
    alert('Missing parameter');
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
  let slug = convertViToEn($('#ip-hint').text().trim());
  let hint = $('#ip-slug').val().trim();
  let url = $('#image-post').attr('src');
  let checked = $('#active-checked').is(':checked');
  let status = checked ? 'active' : 'inactive';
  var selectValue = $('#select-category-option').find(':selected').val();

  if (content == '' || excerpt == '' || title == '' || slug == '' || hint == '') {
    alert('Missing parameter');
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
  let postName = $('#ip-name').val().trim().toLowerCase();
  let slug = convertViToEn(postName.replaceAll(' ', '-'));

  if (isCategory) {
    document.getElementById('ip-slug').value = `/cms/${slug}`;
  } else {
    var selectValue = $('#select-category-option').find(':selected').text();
    selectValue = convertViToEn(selectValue.trim().toLowerCase());
    selectValue = selectValue.replaceAll(' ', '-');
    document.getElementById('ip-slug').value = `/cms/${selectValue}/${slug}`;
  }
}

function handleSubmitCategoryProduct() {
  let name = $('#ip-name').val().trim();
  let slug = $('#ip-hint').text().trim();
  let hint = $('#ip-slug').val().trim();
  let description = $('#ip-description').val().trim();
  // var selectValue = $('#select-category-option').find(':selected').val();
  var parent_id = null;
  // if (selectValue != 0) {
  //   parent_id = selectValue;
  // }

  if (name == '' || slug == '' || description == '' || hint == '') {
    alert('Missing parameter');
    return;
  }

  let data = {
    name,
    slug,
    description,
    parent_id
  };

  console.log(data);

  $.ajax({
    url: `/cms/product-category`,
    data,
    type: 'post',
    cache: false,
    success: function (result) {
      if (result.errCode == 0) {
        alert(result.message);
        document.getElementById('ip-name').value = ` `;
        document.getElementById('ip-slug').value = ``;
        document.getElementById('ip-description').value = ``;
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

  document.getElementById('ip-name').value = postName;
  document.getElementById('ip-hint').innerText = postSlug;
  document.getElementById('ip-description').value = postDescription;

  document.getElementById('ip-slug').value = getSlugHint(postSlug);

  $(`.button-submit`).addClass('d-none');
  $(`.button-edit`).removeClass('d-none');
  $(`.button-edit`).attr('id-item', id);
}

function handleEditCategoryProduct(id) {
  let name = $('#ip-name').val().trim();
  let slug = $('#ip-hint').text().trim();
  let hint = $('#ip-slug').val().trim();
  let description = $('#ip-description').val().trim();

  if (name == '' || slug == '' || description == '' || hint == '') {
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
        document.getElementById('ip-name').value = ` `;
        document.getElementById('ip-slug').value = ``;
        document.getElementById('ip-description').value = ``;
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

//Product
function handleSubmitProduct() {
  $('.wrap-modal').toggleClass('d-none');
}

function handleCreateNewProduct() {
  let name = $('#ip-name').val().trim();
  let slug = $('#ip-hint').text().trim();
  let hint = $('#ip-slug').val().trim();
  let description = editorDescription.getData();
  let detail = editorDetail.getData();
  let label = editorLabel.getData();
  let saleDesc = editorSaleDesc.getData();
  let price = $('#ip-price').val().trim();
  let order = $('#ip-order').val().trim();
  let unit = $('#ip-unit').val().trim();
  let quantity = $('#ip-quantity').val().trim();
  let isShow = $('#select-is-show-price-option').find(':selected').val().trim();
  let statusStock = $('#select-status-stock-option').find(':selected').val().trim();
  let isSale = $('#select-is-sale-option').find(':selected').val().trim();
  let saleBy = $('#select-sale-option').find(':selected').val().trim();
  let isActive = $('#active-checked').is(':checked');

  var percentSale = 0;
  var priceSale = 0;
  var arrayCategory = [];
  var arrayImage = [];

  $('.check-category').each(function (index, element) {
    if ($(this).is(':checked')) {
      arrayCategory.push($(this).val());
    }
  });

  $('.image-chosen').each(function (index, element) {
    arrayImage.push($(element).attr('src'));
  });

  //validate
  if (arrayCategory.length == 0) {
    alert('Chose category is require');
    return;
  }
  if (name == '' || slug == '' || description == '' || price == '' || unit == '' || hint == '') {
    alert('Missing parameter.');
    return;
  }
  if (!isNumeric(price) && !isNumeric(order) && !isNumeric(quantity) && !isNumeric(percentSale)) {
    alert('Input require numeric.');
    return;
  }

  if (arrayImage.length == 0) {
    arrayImage = ['/cms/images/index/default-image.jpeg', ''];
  } else if (arrayImage.length == 1) {
    arrayImage.push('');
  }
  const array = {
    arrayCategory,
    arrayImage
  };

  percentSale = $('#ip-sale-percent').val().trim();
  priceSale = $('#ip-sale-price').val().trim();

  const data = {
    name,
    slug,
    description,
    detail,
    label,
    saleDesc,
    price,
    order,
    unit,
    quantity,
    isShow,
    statusStock,
    isSale,
    saleBy,
    priceSale,
    percentSale,
    isActive,
    array
  };

  $.ajax({
    url: '/cms/new-product',
    data,
    cache: false,
    type: 'post',
    success: function (result) {
      alert(result.message);
      if (result.errCode == 0) {
        location.reload();
      } else {
      }
    }
  });
}

function handleDeleteProduct(idPost) {
  $.ajax({
    url: `/cms/product/delete/${idPost}`,
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

function handleUpdateProduct(idPost) {
  let name = $('#ip-name').val().trim();
  let slug = $('#ip-hint').text().trim();
  let hint = $('#ip-slug').val().trim();
  let description = editorDescription.getData();
  let detail = editorDetail.getData();
  let label = editorLabel.getData();
  let saleDesc = editorSaleDesc.getData();
  let price = $('#ip-price').val().trim();
  let order = $('#ip-order').val().trim();
  let unit = $('#ip-unit').val().trim();
  let quantity = $('#ip-quantity').val().trim();
  let isShow = $('#select-is-show-price-option').find(':selected').val().trim();
  let statusStock = $('#select-status-stock-option').find(':selected').val().trim();
  let saleBy = $('#select-sale-option').find(':selected').val().trim();
  let isSale = $('#select-is-sale-option').find(':selected').val().trim();
  let isActive = $('#active-checked').is(':checked');

  var percentSale = 0;
  var priceSale = 0;
  var arrayCategory = [];
  var arrayImage = [];

  $('.check-category').each(function (index, element) {
    if ($(this).is(':checked')) {
      arrayCategory.push($(this).val());
    }
  });

  $('.image-chosen').each(function (index, element) {
    arrayImage.push($(element).attr('src'));
  });

  //validate
  if (arrayCategory.length == 0) {
    alert('Chose category is require');
    return;
  }
  if (name == '' || slug == '' || description == '' || price == '' || unit == '' || hint == '') {
    alert('Missing parameter.');
    return;
  }
  if (!isNumeric(price) && !isNumeric(order) && !isNumeric(quantity) && !isNumeric(percentSale)) {
    alert('Input require numeric.');
    return;
  }

  if (arrayImage.length == 0) {
    arrayImage = ['/cms/images/index/default-image.jpeg', ''];
  } else if (arrayImage.length == 1) {
    arrayImage.push('');
  }
  const array = {
    arrayCategory,
    arrayImage
  };

  percentSale = $('#ip-sale-percent').val().trim();
  priceSale = $('#ip-sale-price').val().trim();

  const data = {
    name,
    slug,
    description,
    detail,
    label,
    saleDesc,
    price,
    order,
    unit,
    quantity,
    isShow,
    statusStock,
    isSale,
    saleBy,
    priceSale,
    percentSale,
    isActive,
    array
  };
  console.log(data);

  $.ajax({
    url: `/cms/product/update/${idPost}`,
    data,
    cache: false,
    type: 'post',
    success: function (result) {
      if (result.errCode == 0) {
        window.location.href = '/cms/product';
        alert(result.message);
      } else {
        alert(result.message);
      }
    }
  });
}

//action selector
function handleOnChangeUnit(val) {
  $('#unit-product').text(val);
}

function handleOnChangeIsSale() {
  $('#ip-sale-price').attr('disabled', function (_, disabled) {
    return !disabled;
  });
  $('#ip-sale-percent').attr('disabled', function (_, disabled) {
    return !disabled;
  });
  $('#radio-sale-price').attr('disabled', function (_, disabled) {
    return !disabled;
  });
  $('#radio-sale-percent').attr('disabled', function (_, disabled) {
    return !disabled;
  });
}

function handleDeleteImage(id) {
  document.getElementById(id).remove();
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

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getSlugHint(slug) {
  let array = slug.split('/');
  return array[array.length - 1];
}

