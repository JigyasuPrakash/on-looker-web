var uploadForm = document.querySelector('#upload-form');
if (uploadForm != null) {
    uploadForm.addEventListener('submit', e => {
        e.preventDefault();

        if (uploadForm.myImage.files[0] != undefined) {
            started("upload");
            var upform = new FormData();
            upform.append("myImage", uploadForm.myImage.files[0]);

            var settings = {
                "url": "/upload",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "dataType": "json",
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": upform
            };

            $.ajax(settings).done(function (response) {
                completed("upload");
                alert(response.message);
                uploadForm.reset();
            });

        } else {
            alert("Please select a file first");
        }
    })
}

var searchForm = document.querySelector("#search-form")
var search = []
if (searchForm != null) {
    searchForm.addEventListener('submit', e => {
        e.preventDefault();

        if (searchForm.keyword.value != '') {
            started("search");
            var settings = {
                "url": "/search",
                "method": "GET",
                "dataType": "json",
                "data": { keyword: searchForm.keyword.value }
            };

            $.ajax(settings).done(function (response) {
                completed("search");
                searchForm.reset();
                console.log(response);
            });
        } else {
            alert('Enter Somthing to Search');
        }
    })
}

function started(task) {
    if (task == "upload") {
        $("#myImage").prop("disabled", true);
        document.getElementById("loader").style.display = "block";
        document.getElementById("myDiv").style.display = "none";
    } else {
        $("#keyword").prop("disabled", true);
        document.getElementById("loader").style.display = "block";
        document.getElementById("myDiv").style.display = "none";
    }
}

function completed(task) {
    if (task == "upload") {
        $("#myImage").prop("disabled", false);
        document.getElementById("loader").style.display = "none";
    } else {
        $("#keyword").prop("disabled", false);
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
    }
}

// function updateUI(url) {
//     $("#result-images").append(`
//         <img style="margin:5px ;padding: 10px; border: 1px solid black; height: 200px; width: auto;"
//             src="${url}" />
//     `);
// }