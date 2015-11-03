var Preview = (function () {

    var el = null;
    var popEl = null;
    var close = null;
    var closeElement = null;

    //remove the div
    var rem = function () {
        closeElement = document.getElementsByClassName("previewOverlay")[0];
        document.body.removeChild(closeElement);
    };

    var displayImg = function (url) {

        //create the img element
        el = document.createElement("img");
        el.setAttribute("src", url);
        el.setAttribute("class", "previewOverlay");
        //create the close element
        close = document.createElement("span");
        close.setAttribute("class", "close");

        // Attach eventhandler to the close image x
        close.onclick = rem;

        el.style.width = 500 + "px";
        el.style.height = 400 + "px";

        //create the div element to hold it all
        popEl = document.createElement("div");
        popEl.setAttribute("class", "previewOverlay");
        popEl.appendChild(close);
        popEl.appendChild(el);


        document.body.appendChild(popEl);


    }

    return {
        //expose only the init function
        init: function () {

            //Get the listitems in the UL
            var listItems = document.getElementById("aTagList").getElementsByTagName("li");

            for (var i = 0; i < listItems.length; i++) {
                listItems[i].onclick = function (evt) {
                    // Don´t open a new window
                    evt.preventDefault();

                    //Get the data-preview attribute
                    var aTag = this.getElementsByTagName("a")[0].getAttribute("data-preview");

                    //If data-preview attribute exists call the displayImg function.
                    if (aTag) {
                        //get the href url of the clicked element.
                        var theUrl = this.getElementsByTagName("a")[0].getAttribute("href");
                        displayImg(theUrl);

                    }
                    else {
                        alert('This image is missing an attribute and will not show!!')
                    }


                };
            }

        }

    }


})();

