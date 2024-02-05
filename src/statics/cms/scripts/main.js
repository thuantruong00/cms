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

