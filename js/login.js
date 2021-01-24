$(document).ready(function(){
   
    $("#loginForm").on('submit',function(e){
          const name = $("#userName").val() ;
          const password = $("#password").val() ;
          
          e.preventDefault();
          const inputData = {
             password:password,
             rememberMe: true,
             username: name} ;
             getData(inputData);    
        });
//move after set loacalstorage   
        const handleData = function(res){
          localStorage.setItem({token : res.id-token})
          window.location.replace('')
        }
        var datares ;
        const getData =function(inputData){
           $.ajax ({
             type : 'POST',
             url : "http://payment.etrat-fatemi.com:8080/api/authenticate",
             contentType : 'application/json',
              data:JSON.stringify(inputData),
              Authorization : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMjE2MTMzOH0.zh_c6LYlA6e1xgeIvmJNWK8WlNDl0PUvpBjqV_GPa4gNcVhgtJPw8PjxELkjop_i3IPqT5ZN4OqcaBcb5KoAQQ",
              accept :"*/*",
             dataType: 'json',
             success : function(datares){
               handleData(datares);
             },
             error : function(err){
               if(err.status == 401 ){
                 alert ( 'پسورد یا نام کاربری شما ')
               }
             }
         
           })
        }
})
 $('#guest').on('click' , function(){
   window.location.replace ('/register.html')
 })

// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("#loginForm").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      userName: "required",
      userPassword:{
        required: true,
        minlength: 5
      }
    },
    // Specify validation error messages
    messages: {
      userName: "لطفا نام کاربری /کلمه عبور خود را وارد کنید",
      userPassword: {
        required: "رمز ورود را وارد کنید ",
        minlength: "رمز ورود باید حداقل 5 کاراکتر باشد "
      },
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    // submitHandler: function(form) {
    //   form.submit();
    // }
  });
});