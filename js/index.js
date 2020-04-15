var form = document.querySelector('#search-form');
var search = []
if (form != null) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        let keyword = form.keyword.value;
        $("#element").text(keyword);
        started();
        $.getJSON('js/metadata.json', (result) => {
            result.files.forEach(url => {
                search.push(url);
            })
            searchImage(keyword, 0);
        });
        form.reset();
    })
}

function searchImage(keyword, index) {
    console.log(search.length)
    if (index < search.length) {
        Tesseract.recognize(search[index], 'eng', { logger: m => console.log(m) })
            .then(({ data: { text } }) => {
                if (text.toLowerCase().match(keyword.toLowerCase())) {
                    updateUI(search[index]);
                    searchImage(keyword, index + 1)
                }
            }).catch(err => {
                console.log(err);
            })
    } else {
        completed();
    }
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