$(document).ready(function () {
  //timer for otp valid
  var timerOn = true;

  function timer(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0 && timerOn) {
      setTimeout(function () {
        timer(remaining);
      }, 1000);

      return;
    }
    timerOn = false;
    if (!timerOn) {
      $('#submitBtn').attr('disabled', 'disabled')
      timerOn = false
      return;
    }

    // Do timeout stuff here
    $('#submitBtn').removeAttr("disabled");
  }

  timer(60);

  //resend process ------------->
  const userMObile = localStorage.getItem('userMobile')
  const RegetData = function (userMobile) {
    $.ajax({

      type: 'GET',
      url: "http://payment.etrat-fatemi.com:8080/api/send-otp?phone-number=" + userMobile,
      Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMjE2MTMzOH0.zh_c6LYlA6e1xgeIvmJNWK8WlNDl0PUvpBjqV_GPa4gNcVhgtJPw8PjxELkjop_i3IPqT5ZN4OqcaBcb5KoAQQ",
      accept: "*/*",
      success: function (data) {
        debugger;
        localStorage.setItem("id_token",data.id_token)

      },
      error: function (err) {
        if (err.status != 200) {
          alert('پسورد یا نام کاربری شما درست نیست ')
        }
      }

    })
  }
  $('#resend').on('click', function () {

    timerOn = true;
    timer(60);
    $('#submitBtn').removeAttr("disabled");
    RegetData(userMObile);

  })



  //end resen process 

  const getData = function (userMobile, otp) {
    $.ajax({

      type: 'GET',
      url: "http://payment.etrat-fatemi.com:8080/api/verify?otp=" + otp + "&phone-number=" + userMobile,
      headers : {
      'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMjE2MTMzOH0.zh_c6LYlA6e1xgeIvmJNWK8WlNDl0PUvpBjqV_GPa4gNcVhgtJPw8PjxELkjop_i3IPqT5ZN4OqcaBcb5KoAQQ",
      'accept': "*/*",
      },
      success: function (data) {
        debugger;
        localStorage.setItem("id_token",data.id_token)
        window.location.replace("/services.html")
      },
      error: function (err) {
        if (err.status != 200) {
          alert('پسورد یا نام کاربری شما درست نیست ')
        }
      }

    })
  }
  // change input after enter value smoothly 
  //  $("#otp1").keyup( function(){
  //    $(this).next().focus() ;
  //  })
  const otplist = $('.inputOTP');
  for (let i = 0; i < otplist.length; i++) {
    otplist[i].addEventListener('keyup', function () {
      $(this).next().focus();
    })
  }

  $('#veriFyForm').on('submit', function (e) {
    debugger;
    e.preventDefault();
    const otp1 = $('#otp1').val();
    const otp2 = $('#otp2').val();
    const otp3 = $('#otp3').val();
    const otp4 = $('#otp4').val();
    const otp = otp1 + otp2 + otp3 + otp4;
    if (Validcode(otp)) {
      const userMObile = localStorage.getItem('userMobile')
      getData(userMObile, otp);
    } else {
      $("#otp1").focus()
    }

  })


  function Validcode(inputText) {

    var otpFormat = /^\d{4}$/;
    if (inputText.match(otpFormat)) {
      return true;
    }
    else {
      alert("لطفا فقط عدد وارد کنید ");
      var input = $('#otppart');
      input.focus();
      input.select()
      return false;
    }
  }








})