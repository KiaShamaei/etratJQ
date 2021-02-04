$(document).ready(function(){
    
     const services= document.querySelectorAll('.service');
     for(var i=0 ; i<=services.length-1 ; i++){
         services[i].addEventListener('click', function(){
             localStorage.setItem('service',this.getAttribute('id'))
             window.location.replace('./services.html')
         })
         
     }
     




})