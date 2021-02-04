$(document).ready(function(){
  localStorage.clear(); 
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
 
          localStorage.setItem("id_token" , res.id_token)
          window.location.replace('./mainIcon.html')
        }
        var datares ;
        const getData =function(inputData){
           $.ajax ({
             type : 'POST',
             url : "https://etrat.cloud.papraco.com/api/authenticate",
             contentType : 'application/json',
              data:JSON.stringify(inputData),
              headers:{
                Authorization : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMjE2MTMzOH0.zh_c6LYlA6e1xgeIvmJNWK8WlNDl0PUvpBjqV_GPa4gNcVhgtJPw8PjxELkjop_i3IPqT5ZN4OqcaBcb5KoAQQ",
                accept :"*/*",
              },
             dataType: 'json',
             success : function(datares){
               handleData(datares);
             },
             error : function(err){
               if(err.status == 401 ){
                 alert ( 'پسورد یا نام کاربری شما ');
                 
               }
             }
         
           })
        }
        $('#guest').on('click' , function(){
          window.location.replace ('./register.html')
        })
        // const checkEnter = function(){
        //   const inputUser = $('#userName');
        //   const inputpass = $('#password');
        //   const messageuser = $('#validuser');
        //   const messagepass = $('#validpass')
        //   const chekuser = checkRequired(inputUser,messageuser);
        //   const checkpass = checkRequired(inputpass,messagepass);
        //   if(checkpass&&chekuser)
        //   {
        //     $("#btnpos").removeAttr('disabled')
        //   }else
        //   {
        //     $("#btnpos").attr('disabled')
        //   }
        // }
        const inputpass = $('#password');
        inputpass.on('input', function(){
        
          if($("#password").val().length >= 1 && $('#userName').val().length >= 1 )
          {
            $("#submit").removeAttr('disabled');
          }
        })
        

      
})



