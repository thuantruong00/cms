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

//handle upload image
$('#btn-link').click(function () {
  const type = $('#btn-link').attr('type-image');

  let inputFile = $('#input-upload')[0];
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
        console.log(result);
        const data = result.resData;
        console.log(data);
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

          $('#input-upload').val('');
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
$('#btn-delete').click(function () {
  const data = [];
  const type = $('#btn-link').attr('type-image');

  $("input[type='checkbox']").each(function (index, element) {
    if ($(element).is(':checked')) {
      data.push(Number($(this).attr('id-item')));
      $(this).parent().remove();
    }
  });

  if (data.length > 0) {
    var formData = new FormData();
    for (var i = 0; i < data.length; i++) {
      // console.log('data: ',data[i])
      formData.append('id', data[i]);
    }

    $.ajax({
      url: `/cms/images/delete/${type}`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        console.log(result);
        alert(`Deleted ${result.count} items`);
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

$('#btn-check-all').click(function () {
  $("input[type='checkbox']").each(function (index, element) {
    $(this).prop('checked', true);
  });
});

