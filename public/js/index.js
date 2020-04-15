var uploadForm = document.querySelector('#upload-form');
if (uploadForm != null) {
    uploadForm.addEventListener('submit', e => {
        e.preventDefault();

        var form = new FormData();
        form.append("myImage", uploadForm.myImage.files[0]);

        var settings = {
            "url": "/upload",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "dataType": "json",
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            alert(response.message);
        });

        uploadForm.reset();
    })
}

var searchForm = document.querySelector("#search-form")
var search = []
if (searchForm != null) {
    searchForm.addEventListener('submit', e => {
        e.preventDefault();

        if (searchForm.keyword.value != '') {
            var settings = {
                "url": "/search",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": { keyword: searchForm.keyword.value }
            };

            // $.ajax(settings).done(function (response) {
            //     console.log(response);
            // });
        } else {
            alert('Enter Somthing to Search');
        }
    })
}

function started() {
    $("keyword").prop("disabled", true);
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
}

function completed() {
    $("keyword").prop("disabled", false);
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

function updateUI(url) {
    $("#result-images").append(`
        <img style="margin:5px ;padding: 10px; border: 1px solid black; height: 200px; width: auto;"
            src="${url}" />
    `);
}