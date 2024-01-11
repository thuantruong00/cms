$(document).ready(() => {
  $('#loginForm').submit((e) => {
    // prevent the default form submission
    e.preventDefault();

    $('input.login-btn').prop('disabled', true);

    // get the values from the form fields
    var i1 = $('#in1').val();
    var i2 = $('#in2').val();

    // validation

    // sending the data to the server
    $.ajax({
      url: 'http://localhost:8002/cms/sign-in',
      method: 'POST',
      data: {
        username: i1,
        password: i2
      },
      success: (res) => {
        $('div.section-res').addClass('success');
        $('div.section-res span').text('Đăng nhập thành công. Đang chuyển hướng...');

        //
        setTimeout(() => {
          $('div.section-res').removeClass('success');
          window.location.href = '/cms';
        }, 1000);
      },
      error: (xhr, status, error) => {
        if (xhr.status === 401) {
          $('div.section-res').addClass('error');
          $('div.section-res span').text('Tên đăng nhập hoặc mật khẩu không đúng.');

          $('input.login-btn').prop('disabled', false);

          setTimeout(() => {
            $('div.section-res').removeClass('error');
          }, 10000);
        }
      }
    });
  });
});
