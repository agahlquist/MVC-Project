"use strict";

$(document).ready(function() {

  function handleError(message) {
    alert(message);
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

  $("#makeDomoSubmit").on("click", function(e) {
    e.preventDefault();

    if($("#domoName").val() == '' || $("#domoAge").val() == '') {
      handleError("All fields are required!");
      return false;
    }

    sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());

    return false;
  });

});