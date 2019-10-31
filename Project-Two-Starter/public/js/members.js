$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    let userID = data.id;
    localStorage.setItem("userID",JSON.stringify(userID));
    $(".member-name").text(data.email);
  });
});
