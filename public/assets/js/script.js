$(function () {
    //Devour Burger
    $("#devour-button").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log(id);
        //Change condition to devoured
        var devoured = {
            devoured: 1
        };
        // Send the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devoured
        }).then(() => {
            console.log("Burger devoured!");
            location.reload();
        });
    });

    //Delete burger
    $("#delete-button").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log(id);
        // Send the DELETE request
        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(() => {
            console.log("Burger deleted!");
            location.reload();
        });
    });

    //Add new burger
    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#enter-burger").val().trim(),
            devoured: 0
        };
        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(() => {
            console.log("Burger added!");
            location.reload();
        });
    });
});