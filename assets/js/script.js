$(document).ready(function () {

  //recalls user inputed schedule from local storage and puts it in the correct hour
  for (var i = 1; i < 10; i++) {
    $("#textArea" + i).text(localStorage.getItem("hour" + i));
  }

  //gets date and time from moment.js and displays them in the header
  var date = moment().format('MMMM Do YYYY');
  var time = moment().format('h:mm: a');
  $("#date").text(date + "  /  " + time);


  //updates the time every second to keep it accurate
  setInterval(function () {
    var date = moment().format('MMMM Do YYYY');
    var time = moment().format('h:mm: a');
    $("#date").text(date + "  /  " + time);
    colorTextBoxes();
  }, 1000);


  //submit button click event and storing calendar in local storage
  $(".saveButton").on("click", function () {
    var userText = $(this).parent().siblings().children("textarea").val();
    var hourId = $(this).attr("id");
    localStorage.setItem(hourId, userText);
  });


  //Clear button clears the whole scheduler
  $("#clearButton").on("click", function () {
    localStorage.clear();
    for (var i = 1; i < 10; i++) {
      $("#textArea" + i).val("");
    }
  });

  //Changes color of text box depending on if that time is in the future, past, or present hour
  function colorTextBoxes() {
    var hour = parseFloat(moment().format('h'));
    var amOrPm = moment().format('a');
    //sets the hour to army time so we can compare to our scheduler
    if (amOrPm === "pm" && hour !== 12) {                 
      hour += 12;
    }
    else if (amOrPm === "am" && hour === 12) {
      hour = 0;
    }

    for (var i = 1; i < 10; i++) {
       //add 8 to i since hour1 is 9am (1 + 8 = 9)
      if (hour === i + 8) {                           
        $("#textArea" + i).addClass("present");
      }
      if (hour < i + 8) {
        $("#textArea" + i).addClass("future");
      }
    }
  }
  colorTextBoxes();
});