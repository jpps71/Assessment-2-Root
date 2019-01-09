var windowWidth =  window.width;
var windowHeight = window.Height;
var currentButtonState;
var setName;
var watchItemNum;
var useNum = 0;
var theList;
var checked;
var tempNum;
var tempList;
var countMovie = 0;
var countNew = 0;
var countSearch = 0;
var intialIndex;
var globalIndexList;
var searched = false;

window.onload = function () {//Executes on window load
    console.log("Ready MainScript");//Logs script is running in console
    if ($('#theIndexContainer').length) {//Checks if the id exists on the current web page
        globalIndexList = document.getElementById("theIndexContainer");//Grabs the element with the specified id
        intialIndex = globalIndexList.cloneNode(true);//Clones the list nodes to a variable

        document.getElementById("searchTab").style.visibility = "hidden";//Changes specific element to hidden
    }
    if ($('#listName').length) {//Checks if the id exists on the current web page
        setName = document.getElementById("listName").innerText;//Grabs the inner text of the element with the specified id to get item name
        for (i = 0; i <= localStorage.length; i++) {//For loop
            if (setName == localStorage.getItem("AnimeName" + ((localStorage.length - i).toString()))) {//gets each item in turn from localStorage
                checked = true;//Boolean
                document.getElementById("watchlistButton").innerText = "Remove From Watchlist";//Changes Button Text
                break;
            }
            else {
                checked = false;//Boolean
            }
        }
    }
    else if ($('#theWatchListContainer').length) {//Checks if the id exists on the current web page
        theList = document.getElementById("theWatchListContainer");//Grabs the element with the specified id
        console.log("Ready3");//General log for checking
        watchlistCreator();//Starts new function specified
    }
}
function watchButton() {
    console.log(localStorage.length);//States the length of localStorage
    if (checked == false) {
        alert("Added");//Testing Notification
        if (localStorage.getItem("AnimeName" + ((localStorage.length).toString())) != null) {//gets each item in turn from localStorage
            for (i = 0; i <= localStorage.length; ++i) {//Rusn through localStorage
                if (localStorage.getItem("AnimeName" + ((localStorage.length-i).toString())) == null) {//Checks for null spaces
                    localStorage.setItem("AnimeName" + ((localStorage.length - i).toString()), setName);//Stops Null error in local Storage
                    document.getElementById("watchlistButton").innerText = "Remove From Watchlist";//Changes button text
                    checked = true;
                }
                else {
                    continue;
                }
            }
        } else {
            localStorage.setItem("AnimeName" + ((localStorage.length).toString()), setName);//Sets and appends name to local storage
            document.getElementById("watchlistButton").innerText = "Remove From Watchlist";//Changes button text
            checked = true;
        }
    }
    else {
        alert("Removed");
        for (i = 0; i <= localStorage.length; i++) {//Runs through local storage
            if (setName == localStorage.getItem("AnimeName" + ((localStorage.length - i).toString()))) {//Finds where names match
                localStorage.removeItem("AnimeName" + ((localStorage.length - i).toString()));//Removes matching name item
                checked = false;
            }
            else {
                continue;
            }
        }
        document.getElementById("watchlistButton").innerText = "Add To Watchlist";//Changes button text
        
    }
}
function watchlistCreator() {
    watchItemNum = localStorage.length;
    alert(watchItemNum);
    for (i = 0; i <= localStorage.length; i++) {
        var currentItem = localStorage.getItem("AnimeName" + ((localStorage.length - i).toString()));
        if (currentItem == null) {
            continue;
        }
        else {
            console.log(currentItem);
            var li = document.createElement("li");
            var newImg = new Image(120, 120);
            var currentText = document.createTextNode(currentItem);
            var pNode = document.createElement("p");
            var aNode = document.createElement("a");
            aNode.href = ("Item Pages/"+ currentItem + ' - Item Page.html');
            pNode.appendChild(currentText);
            newImg.src = ('../assets/Images/' + currentItem + '.jpg');
            li.appendChild(aNode);
            aNode.appendChild(newImg);
            aNode.appendChild(pNode);
            theList.appendChild(li);
        }
    }
}
function indexPopularFilter() {
    const sortList = (a, b) => a.dataset.popVal - b.dataset.popVal;
    let indexSort = Array.from(document.querySelectorAll('#theIndexContainer li')).sort(sortList);
    let indexPopList = document.querySelector('#theIndexContainer');
    indexPopList.innerHTML = '';

    indexSort.forEach(i => { indexPopList.appendChild(i); })
}
function newSort() {
    var newButtonText = document.getElementById("newFilterButton");
    if (countNew % 2 == 0) {
        newButtonText.innerHTML = "Oldest First";
    }
    else {
        newButtonText.innerHTML = "Newly Added First";
    }
    $("#theIndexContainer li").sort(sortBasedDate).appendTo('#theIndexContainer');
    countNew++;
}
function sortBasedDate(x,y){
    return (y) < (x) ? 1 : -1;
}
function movieFilter() {
    console.log("Fired");
    var children;
    var parent;
    var isMovieVal;
    if (countMovie % 2 == 0) {
        for (i = 0; i < document.getElementById("theIndexContainer").childElementCount; i++) {
            console.log(i);
            console.log(isMovieVal);
            parent = document.getElementById("theIndexContainer").children[i];
            isMovieVal = parent.getAttribute("isMovie");
            console.log(parent);
            children = parent.children;
            if (isMovieVal == 0) {
                console.log("Fired 2");
                children[0].style.visibility = "hidden";
                parent.style.visibility = "hidden";
            }
            else if (isMovieVal == 1) {
                console.log("Fired 2");
                children[0].style.visibility = "visible";
                parent.style.visibility = "visible";
            }
            else {
                break;
            }
        }
    }
    else {
        for (i = 0; i < document.getElementById("theIndexContainer").childElementCount; i++) {
            console.log(i);
            console.log(isMovieVal);
            parent = document.getElementById("theIndexContainer").children[i];
            isMovieVal = parent.getAttribute("isMovie");
            console.log(parent);
            children = parent.children;
            console.log("Fired 2");
            children[0].style.visibility = "visible";
            parent.style.visibility = "visible";
        }
    }
    countMovie++;
    console.log(count);
}
function searchAppear() {
    var searchPopup = document.getElementById("searchTab");
    if (countSearch % 2 == 0) {
        searchPopup.style.visibility = "visible";
    }
    else {
        searchPopup.style.visibility = "hidden";
    }
    countSearch++;
}
function searchEngine(x) {
    console.log(x);
    if (x == '0' && searched == false) {
        var searchValue = document.getElementById("searchInput").value;
        var indexList = document.getElementById("theIndexContainer");
        var liIndexElements;
        var aChild;
        var itemName;
        var newListItem = document.createElement("li");
        console.log("Working 1");
        for (i = 0; i < indexList.childElementCount; i++) {

            liIndexElements = indexList.children[i];
            aChild = liIndexElements.lastChild;
            itemName = aChild.lastChild.innerText;
            console.log(searchValue);
            console.log(indexList);
            console.log(liIndexElements);
            console.log(aChild);
            console.log(itemName);
            console.log("Working 2");
            if (itemName == searchValue) {
                newListItem.appendChild(aChild);
                console.log("Working 3");
            }
            else {
                continue;
            }
        }
        $(indexList).empty();
        indexList.appendChild(newListItem);
        searched = true;
    }
    else if (x == '1' && searched == true) {
        $(indexList).empty();
        console.log(intialIndex);
        while (intialIndex.childElementCount != 0) {
            for (i = 0; i < intialIndex.childElementCount; i++) {
                console.log(intialIndex.children[i]);
                document.getElementById("theIndexContainer").appendChild(intialIndex.children[i]);
            }
        }
        tempList = document.getElementById("theIndexContainer");
        tempList.removeChild(tempList.childNodes[0]);
        intialIndex = tempList.cloneNode(true);
        searched = false;
    
    }
}
function comingSoonFilter() {
    var soonList = document.getElementById("theIndexContainer");
    var cSNodes;
    var comingSoonVal;
    var currentChild;
    for (i = 0; i <= soonList.childElementCount; i++) {
        console.log(comingSoonVal);
        comingSoonVal = soonList.children[i].getAttribute('isComingSoon');

        if (comingSoonVal == 1) {
            currentChild = soonList.children[i];
            cSNodes = currentChild.cloneNode(true);
        }
        else {
            continue;
        }
    }
    $(soonList).empty();
    while (cSNodes.length != 0) {
        for (i = 0; i <= cSNodes.length; i++) {
            tempList.appendChild(cSNodes.children[i]);
        }
    }
}
