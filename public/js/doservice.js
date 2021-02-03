$(document).ready(function(){


const ss="Bearer"+" "+localStorage.getItem('id_token');

//payment get data ===============================
    const getData = function (amount , typeid) {
      
         
        $.ajax({

          type: 'GET',
           url: "https://etrat.cloud.papraco.com/api/transactions/code?amount="+amount+"&type-id="+typeid,
          headers :{
          accept: "*/*",
          Authorization: "Bearer"+" "+localStorage.getItem('id_token'),
          },
          
          success: function (data) {
            //localStorage.setItem('token',data.token);
            window.open("https://etrat.cloud.papraco.com/gateway/payment?code="+data.token)
    
          },
          error: function (err) {

            if (err.status == 401) {
              alert('دسترسی شما معتبر نیست ')
            }
            else
           {
              alert('مشکلی پیش آمده مجدد تلاش کنید !')
            }
          }
    
        })
      }
//get admin data 
const getadminData = function () {
      
         
  $.ajax({

    type: 'GET',
     url: "https://etrat.cloud.papraco.com/api/account",
    headers :{
    accept: "*/*",
    Authorization: "Bearer"+" "+localStorage.getItem('id_token'),
    },
  // enter user name in dom   
    success: function (data) {
      $('#username').html(data.firstName +" " +data.lastName);
      $('#userdoc').html(data.email)

    },
    error: function (err) {
      window.location.replace('./login.html')
     
    }

  })
}

const listPrice = document.querySelectorAll(".price");

listPrice.forEach(function(item){
    
    item.addEventListener('click', function(){
		console.log(this)
        let priceValue = this.childNodes[1].innerHTML;
        $('#priceTotal').val(priceValue);
        $('#mainPrice').html(priceValue);
        

    })
}) 
$("#priceTotal").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       //display error message
       $("#errmsg").html("لطفا فقط عدد وارد کنید ").show().fadeOut(2000);
              return false;
   }
  });
  $("#priceTotal").change(function(e){
 
      var nStr=e.target.value;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    var f=x1 + x2;
    $('#priceTotal').val(f);
    $('#mainPrice').html(f);
  })
  //info of person login 
  if (localStorage.getItem("id_token")){
    getadminData();

  }

  //info show date 
  let today = new Date().toLocaleDateString('fa-IR');
  let dateToday = "تاریخ : " + today ;
  $("#persiandate").html(dateToday);

})


