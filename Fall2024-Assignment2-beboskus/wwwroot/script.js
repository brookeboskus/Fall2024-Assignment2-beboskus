//array of background images available in this project
//this array can easily be added to if you upload a new image into the /wwwroot/Images directory and add it to this list
const backgroundImg = [
    '/Images/image1.jpg',
    '/Images/image2.jpg',
    '/Images/image3.jpg',
    '/Images/image4.jpg',
    '/Images/image5.jpg'
];

//globally set the first URL (this is used for the feeling lucky button)
let firstResultURL = '';

//most of this was given to us
//I changed the Key and the URL being used to match what I used in postman to run this API
function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '4445a593eb8146748cd4214a5e37bc91'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';

            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog({
                width: 900,
                resizeable: false,
                draggable: false,
                height: 900,
                position: relative,
                top: 200
            });
        })

        .fail(function () {
            alert('error');
        });
}

//This is very similar to the apiSearch function
//The idea is that the feeling lucky button can be clicked even before the search button is clicked
//Therefore we have to call the API to query the first website that would display if we were to press the search button
function feelingLucky() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '4445a593eb8146748cd4214a5e37bc91'
        }
    })
        .done(function (data) {

            if (data.webPages && data.webPages.value && data.webPages.value.length > 0) {
                firstResultURL = data.webPages.value[0].url;
                console.log('website URL:' + firstResultURL);
                window.location.href = firstResultURL; // Redirect to the first result URL

            } else {
                alert("No results found.");
            }
        })
        .catch(error => {
            console.error("Error fetching serach results:", error);
            alert("An error occured while fetching search results");
        });
}

//basically an eventListener for buttons being clicked
$(document).ready(function () {

    $('#search-button').on('click', function () {
        console.log('search button was clicked');
        apiSearch();
    });

    $('#lucky-button').on('click', function () {
        console.log('luck button was clicked');
        feelingLucky();
    });
});

//index of which picture we are iterating through
let index = 0;

//iterating through the background pictures (called when searchEngineTitle is clicked)
function changeBackgroundImage() {
    index = (index + 1) % backgroundImg.length;
    document.body.style.backgroundImage = `url("${backgroundImg[index]}")`;
}

//set background image when page is loaded
document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundImage = `url("${backgroundImg[index]}")`;
});

//event listener for when earchEngineTitle is clicked
$('#searchEngineTitle').on('click', function () {
    changeBackgroundImage();
});

//function that gets the current time (called when time button is clicked)
function getCurrentTime() {
    var currentDate = new Date();
    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var formattedTime = hours + ':' + minutes;

    $('#time').html(formattedTime); // Insert time into the #time div
    $('#time').dialog(); // Display the time as a dialog
}

// Add event listener for your time button
$('#time-button').on('click', function () {
    getCurrentTime();
});

$('#searchResults').show(); 
$('#time').show();