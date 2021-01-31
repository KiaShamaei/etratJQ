$(document).ready(function(){
  //validate mobile number ============================== 
  $('#userMobile').on('keyup', function(e){
    if (e.target.value.length == 11){
    const showmessage = $("#validMobile");
    const check = IsIranPhone($(this), showmessage)
    debugger;
    if (check){
        $('#submit').removeAttr('disabled')
    }else{
        $('#submit').attr('disabled','disabled') 
    }
  }

  });
    $("#RegisterForm").on('submit',function(e){
          const userMobile = $("#userMobile").val() ;
          e.preventDefault();
          
      
             localStorage.setItem ('userMobile' , userMobile)
             getData(userMobile);    
        });
//move after set loacalstorage   
        const handleData = function(){

        window.location.replace("./verifycode.html");
        }
        var datares ;
        const getData =function(userMobile){
           $.ajax ({
               
             type : 'GET',
             url : "https://etrat.cloud.papraco.com/api/send-otp?phone-number="+userMobile,
              //Authorization : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMjE2MTMzOH0.zh_c6LYlA6e1xgeIvmJNWK8WlNDl0PUvpBjqV_GPa4gNcVhgtJPw8PjxELkjop_i3IPqT5ZN4OqcaBcb5KoAQQ",
              accept :"*/*",
             success : function(){
                
               handleData();
             },
             error : function(err){
               if(err.status == 401 ){
                 alert ( 'مجدد تلاش کنید ')
                 window.location.replace('./login.html')
               }
             }
         
           })
        }
        //check valid mobile phone  number 
        function IsIranPhone(phone, showmessage) {
          const value = phone.val();
              var phoneno = /^(\+98|0)?9\d{9}$/;
              if ((value.match(phoneno))) {
                  showmessage.html("")
                  return true;
          
              } else {
                  showmessage.html("شماره موبایل وارد شده صحیح نیست! ")
                  phone.focus();
                  phone.select()
          
              }
          }
         
})

