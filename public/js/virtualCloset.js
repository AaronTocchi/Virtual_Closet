$(document).ready(function () {
    $('select').formSelect();
    var addClotheForm = $("form.addClothe");
    var nameInput = $("#name-input");
    var typeChoice = $("#type-input");
    var colorChoice = $("#color-input");
    var tempChoice = $("#temp-input");
    var waterProofCheck = $("#waterProof-input");
    var typeSort = $("");
    var colorSort = $("");
    var weatherSort = $("");
    
    addClotheForm.on("submit", function (event) {
        event.preventDefault();
        var userID = JSON.parse(localStorage.getItem("userID"));
        console.log("Page loaded with userID: ", userID);
        console.log("boop");
        
        
        var clothes = {
            //add in userID
            name: nameInput.val(),
            type: typeChoice.val(),
            color: colorChoice.val(),
            temp: tempChoice.val(),
            waterProof: waterProofCheck.val(),
            userId: userID
        };
        console.log(clothes)
        if (!clothes.name || !clothes.type || !clothes.color || !clothes.temp || !clothes.waterProof) {
            return;
        }
        console.log("made it past")
        
        // // If we have all the clothing info run the createClothing function
        createClothing(clothes.name,clothes.type,clothes.color,clothes.temp,clothes.waterProof, clothes.userId);
        nameInput.val("");
        typeChoice.val("");
        colorChoice.val("");
        tempChoice.val("");
        waterProofCheck.val("");
        userID.val("");
        console.log("Cleared userID: ", userID);
        
    });
    
    function createClothing(name, type, color, temp, waterProof, userId) {
        console.log("Inside post request")
        $.post("/api/closet", {
           name,
           type,
           color,
           temp,
           waterProof,
           userId
        })
            .then(function (data) {
                console.log(data);
                location.reload();
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

});