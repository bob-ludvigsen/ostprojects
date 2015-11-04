/**
 * Created by Bob on 03-11-2015.
 */

var Bubbles = (function () {

    var gameDiv = null;
    var bubbleDiv = null;


    //create the pen elements and position on the canvas
    var makeBubble = function () {

        var classNumber = Math.floor(Math.random() * (4 - 1) + 1);
        var bub = "circle-"+ classNumber;
        console.log(typeof bub);

        // get the div with the class contained in id and assign it to playerDiv,
        gameDiv = document.getElementById("gamepad");
        //create an empty div and assign it to theDiv
        bubbleDiv = document.createElement("div");
        //add the css class to the div
        bubbleDiv.setAttribute("class", bub);

        //set an eventhandler on each bubble
        bubbleDiv.onclick = (function() {
            return function() {
                
                this.parentElement.removeChild(this);
                console.log('her er this '+this);
            };
        })()

        // position the div randomly in the parent div
        bubbleDiv.style.left = Math.floor(Math.random() * (gameDiv.offsetWidth - 175)) + "px";
        bubbleDiv.style.top = Math.floor(Math.random() * (gameDiv.offsetHeight + 300)) + "px";

        //append theDiv to either container1 or container2
        gameDiv.appendChild(bubbleDiv);


    };
var changeColor = function(){

    var curColor = document.getElementById('colorpad').className;


}

    //count needs an initial value
    var count = 60;

    var timer = function () {

        //When count is 0 stop calling timer()
        if (count <= 0) {
            return

        }
        return setTimeout(function () {
            makeBubble();
            //Increment count with one
            count -= 1

            //call timer again
            timer();
            //delay 1 second
        }, 1000);

    }


    // Setup the three eventhandlers
    var setUpEvents = function () {

// start the timer
        timer();




    };

    return {
        init: setUpEvents
    };

})();
