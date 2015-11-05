/**
 * Created by Bob on 03-11-2015.
 */

var Bubbles = (function () {

    var gameDiv = null;
    var bubbleDiv = null;

    //count needs an initial value, the game counts down from 60 seconds
    var count = 10;

    //The gametimer
    var timer = function () {

        //When count is 0 stop calling timer()
        if (count <= 0) {

            // When the time is up, prevent the user from clicking on the bubbles
            var gameDiv = document.getElementById("gamepad");
            gameDiv.classList.add("avoid-clicks");
            count = 10;
            var r = confirm("Press ok to start a new game");
            if (r == true) {
                countScore.reset();
                var scoreDiv = document.getElementById("score");
                scoreDiv.innerHTML = 0;
                //var bubbleDiv = document.getElementById("bubble");
                gameDiv.innerHTML = "";

                gameDiv.classList.remove("avoid-clicks");
                Bubbles.init();
            } else {
                x = "You pressed Cancel!";
            }
            return

        }
        return setTimeout(function () {
            var timerDiv = document.getElementById("time");
            // Create a new bubble every second
            makeBubble();
            //Increment count with one
            count -= 1;

            timerDiv.innerHTML = count;
            //call timer again
            timer();
            //delay 1 second
        }, 1000);

    }

    //create the pen elements and position on the canvas
    var makeBubble = function () {

        var classNumber = Math.floor(Math.random() * (4 - 1) + 1);
        var bub = "circle-" + classNumber;
        var scoreDiv = document.getElementById("score");

        // get the div with the class contained in id and assign it to playerDiv,
        gameDiv = document.getElementById("gamepad");

        //create an empty div and assign it to theDiv
        bubbleDiv = document.createElement("div");
        //add the css class to the div
        bubbleDiv.setAttribute("id", "bubble")
        bubbleDiv.setAttribute("class", bub);

        //set an eventhandler on each bubble
        bubbleDiv.onclick = (function () {
            return function () {

                var colorClassName = document.getElementById('colorpad').className;
                var circleClassName = this.className;

                var res1 = colorClassName.slice(6);
                var res2 = circleClassName.slice(7);

                //If the class numbers are a match increment score else decrement
                if (res1 === res2) {

                    countScore.increment();

                }
                else {
                    countScore.decrement();
                }

                //Change the color of the topbar
                changeColor();

                // remove the bubble
                this.parentElement.removeChild(this);

                //display the score
                var curscore = countScore.getValue()

                scoreDiv.innerHTML = curscore;

            };
        })()

        // position the div randomly in the parent div
        bubbleDiv.style.left = Math.floor(Math.random() * (gameDiv.offsetWidth - 175)) + "px";
        bubbleDiv.style.top = Math.floor(Math.random() * (gameDiv.offsetHeight + 200)) + "px";

        //append theDiv to either container1 or container2
        gameDiv.appendChild(bubbleDiv);


    };

    //Change the color of the topbar
    var changeColor = function () {
        var el = document.getElementById('colorpad');
        var curColor = document.getElementById('colorpad').className;
        el.classList.remove(curColor);
        var classNumber = Math.floor(Math.random() * (4 - 1) + 1);
        var newColor = "color-" + classNumber;
        el.classList.add(newColor);

    }

    //Set the score
    var countScore = (function (initialValue) {
        var counter = initialValue;

        return {
            increment: function () {
                counter++;
            },
            decrement: function () {
                counter--;
            },
            reset: function () {
                counter = 0;
            },
            getValue: function () {
                return counter;
            }
        };
    })(0);


    // Setup the three eventhandlers
    var setUpEvents = function () {

// start the timer
        timer();

    };

    return {
        init: setUpEvents
    };

})();
