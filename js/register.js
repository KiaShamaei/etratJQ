$(document).ready(function(){
   
    $("#RegisterForm").on('submit',function(e){
          const userMobile = $("#userMobile").val() ;
          e.preventDefault();
        //   const inputData = {
        //     "phone-number" : userMobile 
        //      } ;
             localStorage.setItem ('userMobile' , userMobile)
             getData(userMobile);    
        });
//move after set loacalstorage   
        const handleData = function(){
        window.location.replace("/verifycode.html");
        }
        var datares ;
        const getData =function(userMobile){
           $.ajax ({
               
             type : 'GET',
             url : "http://payment.etrat-fatemi.com:8080/api/send-otp?phone-number="+userMobile,
              Authorization : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMjE2MTMzOH0.zh_c6LYlA6e1xgeIvmJNWK8WlNDl0PUvpBjqV_GPa4gNcVhgtJPw8PjxELkjop_i3IPqT5ZN4OqcaBcb5KoAQQ",
              accept :"*/*",
             success : function(){
                 debugger;
               handleData();
             },
             error : function(err){
               if(err.status != 200 ){
                 alert ( 'پسورد یا نام کاربری شما درست نیست ')
               }
             }
         
           })
        }
})

// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("#RegisterForm").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      userMobile :{
        required: true,
        rangelength: [11,13]
      }
    },
    // Specify validation error messages
    messages: {
        userMobile: "لطفا شماره موبایل را صحیح وارد کنید ",
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    // submitHandler: function(form) {
    //   form.submit();
    // }
  });
});