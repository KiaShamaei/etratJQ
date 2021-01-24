$(document).ready(function () {
    
    const getData =function(userMobile,otp){
        $.ajax ({
            
          type : 'GET',
          url : "http://payment.etrat-fatemi.com:8080/api/verify?otp="+otp+"&phone-number="+userMobile,
           Authorization : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMjE2MTMzOH0.zh_c6LYlA6e1xgeIvmJNWK8WlNDl0PUvpBjqV_GPa4gNcVhgtJPw8PjxELkjop_i3IPqT5ZN4OqcaBcb5KoAQQ",
           accept :"*/*",
          success : function(){
              debugger;
            window.location.replace("/services.html")
          },
          error : function(err){
            if(err.status != 200 ){
              alert ( 'پسورد یا نام کاربری شما درست نیست ')
            }
          }
      
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
        const userMObile = localStorage.getItem('userMobile')
        getData(userMObile,otp);
        
    })

    $(function() {
        // Initialize form validation on the registration form.
        // It has the name attribute "registration"
        $("#veriFyForm").validate({
          // Specify validation rules
          rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            otp :{
              required: true,
              maxlength: 1,
              digits: true
            },
            otp1 :{
                required: true,
                maxlength: 1,
                digits: true

              },
            otp2 :{
                required: true,
                maxlength: 1,
                digits: true
              },
            otp3 :{
                required: true,
                maxlength: 1,
                digits: true
              }

          },
          // Specify validation error messages
          messages: {
              otp: "لطفا شماره را درست وارد کنید  ",
          },
          // Make sure the form is submitted to the destination defined
          // in the "action" attribute of the form when valid
          // submitHandler: function(form) {
          //   form.submit();
          // }
          
        });
      });








})