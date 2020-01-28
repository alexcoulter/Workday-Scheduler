//document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function(){

    
    
    //recalls user inputed schedule from local storage and puts it in the correct hour
    for(var i = 1; i < 10; i++) {
      $("#textArea" + i).text(localStorage.getItem("hour" + i));
    }


//gets date and time from moment.js and displays them in the header
var date = moment().format('MMMM Do YYYY');
$("#date").text(date);
$("#time").text(moment().format('h:mm: a'));


//updates the time every 10 seconds to keep it accurate
setInterval(function() {
  var time = moment().format('h:mm: a');
  $("#time").text(time);
  colorTextBoxes();

}, 10000);



//submit button click event and storing calendar in local storage
   $("button").on("click", function() {
      var userText =  $(this).parent().siblings().children("textarea").val();
      var hourId = $(this).attr("id");
      localStorage.setItem(hourId, userText);

   });

   
    //Clear button clears the whole scheduler
   $("#clearButton").on("click", function(){
     console.log("hey");
    localStorage.clear();
    for(var i = 1; i < 10; i++) {
      $("#textArea" + i).val("");
    }

   });
 //Changes color of text box depending on if that time is in the future, past, or present hour
 function colorTextBoxes() {
 var hour = parseFloat(moment().format('h'));  
 var amOrPm = moment().format('a');
 console.log(hour, amOrPm);
 if (amOrPm === "pm" && hour !== 12) {                 //sets the hour to army time so we can compare to our scheduler
   hour += 12;                                    
 }
 else if (amOrPm === "am" && hour === 12) {
   hour = 0; 
 }
 
 for(var i = 1; i < 10; i++) {
    if(hour === i + 8) {                            //add 8 to i since hour1 is 9am (1 + 8 = 9)
      $("#textArea" + i).addClass("present");
    }
    if(hour < i + 8 ) {
      $("#textArea" + i).addClass("future");
    }
   
 }
 }
colorTextBoxes();

});