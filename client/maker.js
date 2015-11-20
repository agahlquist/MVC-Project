"use strict";

$(document).ready(function() {

  function handleError(message) {
    alert(message);
  }
  
  function resetFields() {
    $("#makeChar").css('box-shadow', 'none');
    
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
    
    sendAjax($("#charForm").attr("action"), $("#charForm").serialize());
    
    //May be unecessary if ajax ever works.
    $("#makeChar").animate({
      left: '-400'
    }, 400, resetFields);

    return false;
  });
  
  $("#addChar").on("click", function(e) {
    e.preventDefault();
    
    $("#makeChar").animate({
      left: $(window).width()/2-200
    }, 400, function() {
      $("#makeChar").css('box-shadow', '0 0 100000px #000');
    });
  });
  
  $("#cancelCharSubmit").on("click", function(e) {
    e.preventDefault();
    
    $("#makeChar").animate({
      left: '-400'
    }, 400, resetFields);
  });
});