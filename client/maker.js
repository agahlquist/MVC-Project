"use strict";

$(document).ready(function() {

  function handleError(message) {
    alert(message);
  }
  
  function resetFields() {
    $("#charName").val("");
    $("#charStr").val("");
    $("#charDex").val("");
    $("#charCon").val("");
    $("#charInt").val("");
    $("#charWis").val("");
    $("#charCha").val("");
  }

  function sendAjax(action, data) {
    $.ajax({
      cache: false,
      type: "POST",
      url: action,
      data: data,
      dataType: "json",
      success: function(result, status, xhr) {
        window.location = result.redirect;
      },
      error: function(xhr, status, error) {
        var messageObj = JSON.parse(xhr.responseText);
        handleError(messageObj.error);
      }
    });        
  }

  $("#makeCharSubmit").on("click", function(e) {
    e.preventDefault();

    if($("#charName").val() == '' ||
       $("#charStr").val() == '' || $("#charDex").val() == '' || $("#charCon").val() == '' ||
       $("#charInt").val() == '' || $("#charWis").val() == '' || $("#charCha").val() == '') {
      handleError("All fields are required!");
      return false;
    }
    console.log($("#charForm").serialize());

    sendAjax($("#charForm").attr("action"), $("#charForm").serialize());

    return false;
  });
  
  $("#addChar").on("click", function(e) {
    e.preventDefault();
    
    $("#makeChar").animate({
      left: $(window).width()/2-200
    });
  });
  
  $("#cancelCharSubmit").on("click", function(e) {
    e.preventDefault();
    
    $("#makeChar").animate({
      left: '-400'
    }, 400, resetFields);
  });
});