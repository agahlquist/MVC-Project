"use strict";

$(document).ready(function() {
  function handleError(message) {
    $("#errorMessage").text(message);
  }
  
  function sendAjax(action, data) {
    $.ajax({
      cache: false,
      type: "POST",
      url: action,
      data: data,
      dataType: "json",
      success: function(result, status, xhr) {
        //animate
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
    
    //aniamte
    
    if($("#charName").val() == '' ||
       $("#charStrength").val() == '' || $("#charDexterity").val() == '' || $("#charConstitution").val() == '' || 
       $("#charIntelligence").val() == '' || $("#charWisdom").val() == '' || $("#charCharisma").val() == '') {
      handleError("All fields are required!");
      return false;
    }
    
    sendAjax($("#charForm").attr("action"), $("#charForm").serialize());
    return false;
  });
  
  //char on click
});