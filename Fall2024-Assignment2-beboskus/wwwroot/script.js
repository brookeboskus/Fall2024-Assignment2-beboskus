const backgroundImg = [
    '/Images/image1.jpg',
    '/Images/image2.jpg',
    '/Images/image3.jpg',
    '/Images/image4.jpg',
    '/Images/image5.jpg'
];

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
            });
        })
        .fail(function () {
            alert('error');
        });
}

$(document).ready(function () {

    $('#search-button').on('click', function () {
        apiSearch();


    });
});


//let index = Math.floor(Math.random() * backgroundImg.length);
let index = 0;

function setBackground () {
    const img = new Image();
    img.src = backgroundImg[index];

    img.onload = function () {
        console.log(`loaded: ${backgroundImg[index]}`);
        document.body.style.backgroundImage = `url("${backgroundImg[index]}")`;
    };

    img.onerror = function () {
        console.error(`Fialed to load Image: ${backgroundImg[index]}`);
    };

}

function changeBackgroundImage() {
    index = (index + 1) % backgroundImg.length;
    document.body.style.backgroundImage = `url("${backgroundImg[index]}")`;
    //setInterval(() => {
    //    index = (index + 1) % backgroundImg.length;
    //    setBackground();

    //}, 15000);
}

setBackground();
//changeBackgroundImage();
document.getElementById('searchEngineTitle').addEventListener('click', changeBackgroundImage());

//$('#searchEngineTitle').on('click', function () {
//    changeBackgroundImage();
//});

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

$('#searchResults').show(); // or .fadeIn() for a smoother appearance
$('#time').show();