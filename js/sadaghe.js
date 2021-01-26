$(document).ready(function(){
debugger;

var ss="Bearer"+" "+localStorage.getItem('id_token');
    const getData = function (amount , typeid) {
      
         
        $.ajax({

          type: 'GET',
           url: "http://payment.etrat-fatemi.com:8080/api/transactions/code?amount=1000&type-id=09",
          accept: "*/*",
          Authorization: "Bearer"+" "+localStorage.getItem('id_token'),
          
          success: function (data) {
    
          },
          error: function (err) {
            debugger;
            if (err.status != 200) {
              alert('پسورد یا نام کاربری شما درست نیست ')
            }
          }
    
        })
      }


//get token
debugger;
const payment= $('#payment') ;


payment.click(function(){
let price = $('#priceTotal').val();
price=parseInt(price);
getData("10000", 14);
})





const listPrice = document.querySelectorAll(".price");



listPrice.forEach(function(item){
    
    item.addEventListener('click', function(){
     
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


})