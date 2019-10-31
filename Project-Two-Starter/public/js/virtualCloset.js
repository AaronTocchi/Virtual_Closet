$(document).ready(function () {
    var addClotheForm = $("form.addClothe");
    var nameInput = $("input#name-input");
    var typeChoice = $("input#type-input");
    var colorChoice = $("input#color-input");
    var tempChoice = $("input#temp-input");
    var waterProofCheck = $("input#waterProof-input");
    var userID = JSON.parse(localStorage.getItem("userID"));
    console.log(userID);

    addClotheForm.on("submit", function (event) {
    console.log("boop");
        event.preventDefault();
        var clothes = {
            //add in userID
            name: nameInput.val().trim(),
            type: typeChoice.val(),
            color: colorChoice.val(),
            temp: tempChoice.val(),
            waterProof: waterProofCheck.val(),
            UserId: userID
        };

        if (!clothes.name || !clothes.type || !clothes.color || !clothes.temp || !clothes.waterProof) {
            return;
        }
        // If we have all the clothing info run the createClothing function
        createClothing(clothes.name,clothes.type,clothes.color,clothes.temp,clothes.waterProof, clothes.UserId);
        nameInput.val("");
        typeChoice.val("");
        colorChoice.val("");
        tempChoice.val("");
        waterProofCheck.val("");
        userID.val("")
    });
    function createClothing(name, type, color, temp, waterProof, UserId) {
        $.post("/api/closet", {
           name,
           type,
           color,
           temp,
           waterProof,
           UserId: userID
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