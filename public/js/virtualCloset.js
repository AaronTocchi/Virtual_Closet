$(document).ready(function () {
    $('select').formSelect();
    var addClotheForm = $("form.addClothe");
    var nameInput = $("#name-input");
    var typeChoice = $("#type-input");
    var colorChoice = $("#color-input");
    var tempChoice = $("#temp-input");
    var waterProofCheck = $("#waterProof-input");
    var typeSort = $("#type-sort");
    var colorSort = $("#color-sort");
    var weatherSort = $("#weather-sort");
    let weatherSorted = document.getElementById("sort-weather");
    let typeSorted = document.getElementById("sort-type");
    let colorSorted = document.getElementById("sort-color");
        
     weatherSort.on("click", function (event){
        event.preventDefault();
        sortBYWeather();
    });
   

    colorSort.on("change", function (){
        console.log($(this).val())
        let color = $(this).val();
        sortByColor(color);
    });

    typeSort.on("change", function (){
        console.log($(this).val())
        let type = $(this).val();
        sortByType(type);
    });


    
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

    function sortByColor(color){
        colorSorted.innerHTML = '';
       if (colorSorted.classList.contains("display-none")) {
        colorSorted.classList.remove("display-none");
        typeSorted.classList.add("display-none");
        weatherSorted.classList.add("display-none");
    } else {

    }
    //  else {
    //     colorSorted.classList.add("display-none");
    //     typeSorted.classList.remove("display-none");
    // }
    $.get('/api/color/' + color, function (data) {
        console.log(data)
              $bars.render('colorSort', 'sort-color', { allClothes: data });
            });

        
    }
    
    function sortByType(type){
        typeSorted.innerHTML = '';
        if (typeSorted.classList.contains("display-none")) {
            typeSorted.classList.remove("display-none");
            colorSorted.classList.add("display-none");
            weatherSorted.classList.add("display-none")
        }
        //  else {
        //     typeSorted.classList.add("display-none");
        //     colorSorted.classList.remove("display-none");
        // }
        $.get("/api/type/"+ type, function(data){
            $bars.render('typeSort', 'sort-type', { allClothes: data });
        });
        
    }

    function sortBYWeather(){
       weatherSorted.innerHTML = '';
       if (weatherSorted.classList.contains("display-none")) {
        weatherSorted.classList.remove("display-none");
        colorSorted.classList.add("display-none");
        typeSorted.classList.add("display-none")
    }
        $.get("/api/weather/", function(data){
            $bars.render('weatherSort', 'sort-weather', { allClothes: data });
        });
    }



    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

});