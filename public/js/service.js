$(document).ready(function () {
  debugger;

  const service = localStorage.getItem('service');
  const objservice = {
    serv1 :"14",//sadaghe
    serv2:"09",//nazer
    serv3:"15", //sharee
    serv4:"16" //farzand
  }
//reload base on click menu 
const change= document.querySelectorAll('.change');
for(var i=0 ; i<=change.length-1 ; i++){

    change[i].addEventListener('click', function(){
      debugger;
        servSelect=this.getAttribute('id');
        if (servSelect !=localStorage.getItem('service') )
        {
        localStorage.setItem('service',servSelect)
        window.location.replace('./services.html')
        }
    })
    
}
//change UI base service selected 
document.getElementById(service).classList.remove("p");
document.getElementById(service).classList.add('h6')
const urlHtml = "./assets/Background/"+service+".png";
document.getElementById('service').style.backgroundImage='url('+urlHtml+')';
 //do service base on localstorage 
 const payment = $('#payment');
 payment.click(function () {
   debugger;

   let price = $('#priceTotal').val();
   price = price.replace(",", '')
   getData(price, objservice[service]);
 })



  const ss = "Bearer" + " " + localStorage.getItem('id_token');
  //payment get data ===============================
  const getData = function (amount, typeid) {
    $.ajax({

      type: 'GET',
      url: "https://etrat.cloud.papraco.com/api/transactions/code?amount=" + amount + "&type-id=" + typeid,
      headers: {
        accept: "*/*",
        Authorization: "Bearer" + " " + localStorage.getItem('id_token'),
      },

      success: function (data) {
        //localStorage.setItem('token',data.token);
        window.open("https://etrat.cloud.papraco.com/gateway/payment?code=" + data.token)

      },
      error: function (err) {

        if (err.status == 401) {
          alert('دسترسی شما معتبر نیست ');
          window.location.replace('./login.html')
        }
        else {
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
      headers: {
        accept: "*/*",
        Authorization: "Bearer" + " " + localStorage.getItem('id_token'),
      },
      // enter user name in dom   
      success: function (data) {
       
        if (data.firstName != null) {
          $('#username').html(data.firstName + " " + data.lastName);
          $('#userdoc').html(data.email)
        }


      },
      error: function (err) {
        window.location.replace('./login.html')

      }

    })
  }

  const listPrice = document.querySelectorAll(".price");

  listPrice.forEach(function (item) {

    item.addEventListener('click', function () {
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
  $("#priceTotal").change(function (e) {

    var nStr = e.target.value;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    var f = x1 + x2;
    $('#priceTotal').val(f);
    $('#mainPrice').html(f);
  })
  //info of person login 
  if (localStorage.getItem("id_token")) {
    debugger;
    getadminData();

  }

  //info show date 
  let today = new Date().toLocaleDateString('fa-IR');
  let dateToday = "تاریخ : " + today;
  $("#persiandate").html(dateToday);
 

})







