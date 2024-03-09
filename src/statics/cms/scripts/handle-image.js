//handle static-content-detail
$('.btn-close-modal').click(function () {
  $('.wrap-modal').toggleClass('d-none');
});

function handleOpenModal(id) {
  $('.modal-upload').attr('id-modal', id + '');
  $('.wrap-modal').toggleClass('d-none');
}

function handleUploadToDB(type, pageId) {
  let data = [];

  $('.bg-wrap-form').each(function (index, element) {
    const id = $(this).find('.input-text').attr('id-item');
    data.push({
      id: id,
      value: $(`#input-text-${id}`).val(),
      class: $(`#input-css-${id}`).val(),
      attr_href: $(`#input-link-${id}`).val(),
      attr_target: $(`#input-target-${id}`).val(),
      display: !$(`#input-checkbox-${id}`).is(':checked')
    });
  });

  $.ajax({
    url: `/cms/static-content/${type}/${pageId}/update-form`,
    data: { ...data },
    type: 'post',
    cache: false,

    success: function (result) {
      if (result.data.status) {
        alert('Chinh sua thanh cong');
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert('Chinh sua that bai');
    }
  });
}

//handle view-image

function handleSubmitGeneral() {
  let id = $('.modal-upload').attr('id-modal');

  if (!$("input[name='image-check']").is(':checked')) {
    alert('Nothing to submit!');
  } else {
    $('.wrap-modal').toggleClass('d-none');
    const url = $('input[type=radio]:checked').attr('url');
    $(`#input-text-${id}`).val(url);
    $(`#img-${id}`).attr('src', url);
    // $('.wrap-view-image').removeAttr('id-modal');
  }
}

function handleSubmitProduct() {
  var data = [];
  $("input[name ='image-check']").each(function (index, element) {
    if ($(element).is(':checked')) {
      data.push({ url: $(element).attr('url'), id: $(element).attr('id-item') });
    }
  });

  for (const item of data) {
    var element = document.getElementById('images-product');

    var img = document.createElement('img');
    var btnDel = document.createElement('button');
    var div = document.createElement('div');
    div.setAttribute('class', 'position-relative mr-3');
    div.setAttribute('id', 'div-id-' + item.id);
    div.width = 70;
    div.height = 90;
    img.src = item.url;
    img.width = 70;
    img.height = 90;
    img.setAttribute('class', 'image-chosen ');
    img.setAttribute('item-id', item.id + '');
    btnDel.setAttribute('id', item.id + '');
    btnDel.append('X');
    btnDel.setAttribute(
      'class',
      'position-absolute pe-auto btn-del-image translate-middle badge border border-light rounded-circle bg-danger p-1'
    );
    btnDel.onclick = function () {
      document.getElementById(`div-id-${item.id}`).remove();
    };
    div.appendChild(img);
    div.appendChild(btnDel);
    element.appendChild(div);
  }

  $('.image-default').addClass('d-none');

  $('.wrap-modal').toggleClass('d-none');
}

function handleRemoveImage(id) {
  console.log(document.getElementById(id));
  var div = document.getElementById(id);
  div.remove();
}

function handleUploadImage() {
  const type = $('.btn-upload-image').attr('type-image');
  let inputFile = $('.input-upload')[0];
  var formData = new FormData();
  if (inputFile.files.length == 0) {
    alert('Select image file.');
    return;
  }

  if (inputFile.files.length == 1) {
    formData.append('file', inputFile.files[0]);
  } else {
    for (var i = 0; i < inputFile.files.length; i++) {
      formData.append('file', inputFile.files[i]);
    }
  }

  if (inputFile.files) {
    $.ajax({
      url: `/cms/images/upload/${type}`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        const data = result.resData;
        data.map((item) => {
          var div = document.createElement('div');
          div.style.width = '50px';
          div.setAttribute('class', 'm-1');

          var img = document.createElement('img');
          img.src = item.url;
          img.width = 50;
          img.height = 60;

          var input = document.createElement('input');
          if (type == 'product') {
            input.type = 'checkbox';
          } else {
            input.type = 'radio';
          }
          input.setAttribute('id-item', item.id);
          input.setAttribute('name', 'image-check');
          input.setAttribute('url', item.url);

          var element = document.getElementById('list-image');

          div.appendChild(img);
          div.appendChild(input);
          element.appendChild(div);

          $('.input-upload').val('');
        });
        alert(`Uploaded ${data.length} ${data.length > 1 ? 'items' : 'item'}`);
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  }
}

//handle images.ejs
//handle upload image
$('.btn-link').click(function () {
  const type = $('.btn-link').attr('type-image');

  let inputFile = $('.input-upload')[0];
  var formData = new FormData();
  if (inputFile.files.length == 0) {
    alert('Select image file.');
    return;
  }

  if (inputFile.files.length == 1) {
    formData.append('file', inputFile.files[0]);
  } else {
    for (var i = 0; i < inputFile.files.length; i++) {
      formData.append('file', inputFile.files[i]);
    }
  }

  if (inputFile.files) {
    $.ajax({
      url: `/cms/images/upload/${type}`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        const data = result.resData;
        data.map((item) => {
          var div = document.createElement('div');
          div.style.width = '50px';
          div.setAttribute('class', 'm-1');
          var img = document.createElement('img');
          img.src = item.url;
          img.width = 50;
          img.height = 60;

          var input = document.createElement('input');
          input.type = 'checkbox';
          input.setAttribute('id-item', item.id);

          var element = document.getElementById('list-image');

          div.appendChild(img);
          div.appendChild(input);
          element.appendChild(div);

          $('.input-upload').val('');
        });
        alert(`Uploaded ${data.length} ${data.length > 1 ? 'items' : 'item'}`);
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  }
});

//handle delete image
$('.btn-delete').click(function () {
  const data = [];
  const type = $('.btn-link').attr('type-image');

  $("input[type='checkbox']").each(function (index, element) {
    if ($(element).is(':checked')) {
      data.push(Number($(this).attr('id-item')));
      $(this).parent().remove();
    }
  });

  if (data.length > 0) {
    var formData = new FormData();
    for (var i = 0; i < data.length; i++) {
      formData.append('id', data[i]);
    }

    $.ajax({
      url: `/cms/images/delete/${type}`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        alert(`Deleted ${result.payload.count} items`);
      },
      error: function (error) {
        console.error('Error: ', error);
      }
    });
  } else {
    alert('No item is selected');
    return;
  }
});

//handle check all image
$('.btn-check-all').click(function () {
  $("input[type='checkbox']").each(function (index, element) {
    $(this).prop('checked', true);
  });
});

