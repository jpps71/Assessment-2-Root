var currentButtonState;//Button inner text holder
var setName;//Used to find name which is appended to local storage
var watchItemNum;//Length of local Storage array
var theList;//Watchlist variable
var checked;//Boolean validation variable
var tempNum;//Temporary number storage
var tempList;//Temporary clone list Storage
var countMovie = 0;//control integer boolean
var countNew = 0;//control integer boolean
var countSearch = 0;//control integer boolean
var countSoon = 0;//control integer boolean
var countPop = 0;//control integer boolean
var intialIndex;//Used to store index copy
var globalIndexList;//Global index copy
var searched = false;//Boolean validation variable

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
                break;//Breaks loop
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
    if (checked == false) {//Validation loop
        console.log("Added");//Testing Notification
        if (localStorage.getItem("AnimeName" + ((localStorage.length).toString())) != null) {//gets each item in turn from localStorage
            for (i = 0; i <= localStorage.length; ++i) {//Runs through localStorage
                if (localStorage.getItem("AnimeName" + ((localStorage.length-i).toString())) == null) {//Checks for null spaces
                    localStorage.setItem("AnimeName" + ((localStorage.length - i).toString()), setName);//Stops Null error in local Storage
                    document.getElementById("watchlistButton").innerText = "Remove From Watchlist";//Changes button text
                    checked = true;//Changes boolean value
                }
                else {
                    continue;//Continues through loop
                }
            }
        } else {
            localStorage.setItem("AnimeName" + ((localStorage.length).toString()), setName);//Sets and appends name to local storage
            document.getElementById("watchlistButton").innerText = "Remove From Watchlist";//Changes button text
            checked = true;
        }
    }
    else {
        console.log("Removed");
        for (i = 0; i <= localStorage.length; i++) {//Runs through local storage
            if (setName == localStorage.getItem("AnimeName" + ((localStorage.length - i).toString()))) {//Finds where names match
                localStorage.removeItem("AnimeName" + ((localStorage.length - i).toString()));//Removes matching name item
                checked = false;
            }
            else {
                continue;//Changes boolean value
            }
        }
        document.getElementById("watchlistButton").innerText = "Add To Watchlist";//Changes button text
        
    }
}
function watchlistCreator() {//Watchlist Function
    watchItemNum = localStorage.length;//Find localstorage array length
    console.log(watchItemNum);//Logs for testing purposes
    for (i = 0; i <= localStorage.length; i++) {//for loop
        var currentItem = localStorage.getItem("AnimeName" + ((localStorage.length - i).toString()));//Get items in turn from local storage array
        if (currentItem == null) {
            continue;//continues through loop
        }
        else {
            console.log(currentItem);//Logs for testing purposes
            var li = document.createElement("li");//Create new li element
            var newImg = new Image(120, 120);//Creates new img element
            var currentText = document.createTextNode(currentItem);//create new text node
            var pNode = document.createElement("p");//Creates a p element
            var aNode = document.createElement("a");//creates an a element
            aNode.href = ("Item Pages/"+ currentItem + ' - Item Page.html');//Finds correct link based upon current item
            pNode.appendChild(currentText);//Append text node to p element
            newImg.src = ('../assets/Images/' + currentItem + '.jpg');//Finds the right image based upon current item
            li.appendChild(aNode);//appends link to li
            aNode.appendChild(newImg);//appends image to link
            aNode.appendChild(pNode);//appends p element to link
            theList.appendChild(li);//appends li element to list
        }
    }
}
function indexPopularFilter() {//Popular filter
    console.log("PopSort Fired");//For testing purposes
    var popButtonText = document.getElementById("popFilterButton");//Grabs button
    if (countPop % 2 == 0) {//control boolean
        popButtonText.innerHTML = "Least Popular";//Changes button text
        $("#theIndexContainer li").sort(sortFunc).appendTo('#theIndexContainer');//takes li elements for object with specifed id, then calls the sort function, and appends the returned items to the list
        function sortFunc(x, y) {//sort function
            return y.getAttribute('popVal') < x.getAttribute('popVal') ? -1 : 1;//grabs the attribute popVal from the 2 items which are given by the previous line in sequential order, compares them and then swaps where the condition is met.
        }
    }
    else {
        popButtonText.innerHTML = "Most Popular";//Changes button text
        $("#theIndexContainer li").sort(sortFunc).appendTo('#theIndexContainer');//Same principle as before except swapping is inverted
        function sortFunc(x, y) {
            return y.getAttribute('popVal') < x.getAttribute('popVal') ? 1 : -1;
        }
    }
    countPop++; countNew++;//Increments value
}
function newSort() {
    console.log("Sort Fired");//For testing purposes
    var newButtonText = document.getElementById("newFilterButton");//Grabs different button
    if (countNew % 2 == 0) {//control boolean
        newButtonText.innerHTML = "Oldest First";//Changes button text
        $("#theIndexContainer li").sort(sortFunc).appendTo('#theIndexContainer');//Same as before but based on different value in this case date added
        function sortFunc(x, y) {
            return y.getAttribute('orderAdded') < x.getAttribute('orderAdded') ? -1 : 1;
        }
    }
    else {
        newButtonText.innerHTML = "Newly Added First";//Changes button text
        $("#theIndexContainer li").sort(sortFunc).appendTo('#theIndexContainer');//Same as before but based on different value
        function sortFunc(x, y) {
            return y.getAttribute('orderAdded') < x.getAttribute('orderAdded') ? 1 : -1;
        }
    }
    countNew++;//Increments value
}
function movieFilter() {
    console.log("Fired");//for testing purposes
    var children;//Children holder
    var parent;//Parent holder
    var isMovieVal;//Value which says if 
    if (countMovie % 2 == 0) {//Control boolean
        for (i = 0; i < document.getElementById("theIndexContainer").childElementCount; i++) {//for loop
            console.log(i);//testing purposes
            console.log(isMovieVal);//testing purposes
            parent = document.getElementById("theIndexContainer").children[i];//takes each child
            isMovieVal = parent.getAttribute("isMovie");//finds attribute of each child in turn
            console.log(parent);//testing purposes
            children = parent.children;//Grabs all children
            if (isMovieVal == 0) {//control boolean
                console.log("Fired 2");//testing purposes
                children[0].style.visibility = "hidden";//Sets visibility to hiiden
                parent.style.visibility = "hidden";//Sets visibility to hiiden
            }
            else if (isMovieVal == 1) {
                console.log("Fired 2");
                children[0].style.visibility = "visible";//Sets visibility to visible
                parent.style.visibility = "visible";//Sets visibility to visible
                parent.style.visibility = "visible";//Sets visibility to visible
            }
            else {
                break;//loop break
            }
        }
    }
    else {
        for (i = 0; i < document.getElementById("theIndexContainer").childElementCount; i++) {//for loop
            console.log(i);//testing purposes
            console.log(isMovieVal);//testing purposes
            parent = document.getElementById("theIndexContainer").children[i];//takes each child
            isMovieVal = parent.getAttribute("isMovie");//finds attribute of each child in turn
            console.log(parent);//testing purposes
            children = parent.children;//Grabs all children
            console.log("Fired 2");//testing purposes
            children[0].style.visibility = "visible";//Sets visibility to visible
            parent.style.visibility = "visible";//Sets visibility to visible
        }
    }
    countMovie++;//control boolean increments
    console.log(countMovie);//testing purposes
}
function searchAppear() {//Search tab appearing function
    var searchPopup = document.getElementById("searchTab");//Grabs search tab
    if (countSearch % 2 == 0) {//control boolean
        searchPopup.style.visibility = "visible";//Sets visibility to visible
    }
    else {
        searchPopup.style.visibility = "hidden";//Sets visibility to hidden
    }
    countSearch++;//control boolean increments
}
function searchEngine(x) {//search engine, takes in control value as x
    console.log(x);//testing purposes
    if (x == '0' && searched == false) {//control value and control boolean used as conditions
        var searchValue = document.getElementById("searchInput").value;//grabs the value in the search bar
        var indexList = document.getElementById("theIndexContainer");//grabs the index list
        var liIndexElements;//variable used to store children
        var aChild;//stores link children
        var itemName;//stores the current item name
        var newListItem = document.createElement("li");//creates new li element
        console.log("Working 1");//testing purposes
        for (i = 0; i < indexList.childElementCount; i++) {//for loop

            liIndexElements = indexList.children[i];//sets var to children of index list
            aChild = liIndexElements.lastChild;//grabs the last child which is the link from each list item
            itemName = aChild.lastChild.innerText;//grabs the item name 
            console.log(searchValue);//testing purposes
            console.log(indexList);//testing purposes
            console.log(liIndexElements);//testing purposes
            console.log(aChild);//testing purposes
            console.log(itemName);//testing purposes
            console.log("Working 2");//testing purposes
            if (itemName == searchValue) {//checks if search value and item name ever match
                newListItem.appendChild(aChild);//append to the list the item which matches
                console.log("Working 3");//testing purposes
            }
            else {
                continue;//continue loop
            }
        }
        $(indexList).empty();//Empties list
        indexList.appendChild(newListItem);//Append single searched item to list
        searched = true;//control boolean
    }
    else if (x == '1' && searched == true) {//control value and control boolean used as conditions
        $(indexList).empty();//Empties list
        console.log(intialIndex);//testing purposes
        while (intialIndex.childElementCount != 0) {//for loop runs the number times as there are child elements
            for (i = 0; i < intialIndex.childElementCount; i++) {//for loop
                console.log(intialIndex.children[i]);//testing purposes
                document.getElementById("theIndexContainer").appendChild(intialIndex.children[i]);//appends all the items back to the list upon clearing
            }
        }
        tempList = document.getElementById("theIndexContainer");//grabs current list state
        tempList.removeChild(tempList.childNodes[0]);//removes null first child
        intialIndex = tempList.cloneNode(true);//clones list for use again, upon a new search as a reference for copying again
        searched = false;//control boolean
    
    }
}
function comingSoonFilter() { //Exact same principles and code apart from id names as function movieFilter() but for coming soon value
    console.log("Fired");//testing purposes
    var children;
    var parent;
    var isComingSoon;
    if (countSoon % 2 == 0) {
        for (i = 0; i < document.getElementById("theIndexContainer").childElementCount; i++) {
            console.log(i);
            console.log(isComingSoon);
            parent = document.getElementById("theIndexContainer").children[i];
            isComingSoon = parent.getAttribute("isComingSoon");
            console.log(parent);
            children = parent.children;
            if (isComingSoon == 0) {
                console.log("Fired 2");
                children[0].style.visibility = "hidden";
                parent.style.visibility = "hidden";
            }
            else if (isComingSoon == 1) {
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
            console.log(isComingSoon);
            parent = document.getElementById("theIndexContainer").children[i];
            isComingSoon = parent.getAttribute("isComingSoon");
            console.log(parent);
            children = parent.children;
            console.log("Fired 2");
            children[0].style.visibility = "visible";
            parent.style.visibility = "visible";
        }
    }
    countSoon++;
    console.log(countSoon);
}
