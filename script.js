const button = document.getElementById("searchButton").addEventListener('click', loadApi);
const iDbutton = document.getElementById("searchIdButton").addEventListener('click', loadIdApi);


/* function loadApi(task) {
    var input = document.getElementById("search-input");
    var url = 'http://www.omdbapi.com/?s='+input.value+'&apikey=27eab8c1';
    fetch(url)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let json = JSON.parse(data);
            document.getElementById('searchResponse').innerHTML = json;
            console.log(json);
            
        })
}
*/
function loadApi() {
    var input = document.getElementById("search-input");
    var imdbID = document.getElementById('imdbId');
    var url = 'https://www.omdbapi.com/?s='+input.value+'&apikey=27eab8c1';
    var xmlhttp = new XMLHttpRequest();
    if (input.value == "" && imdbID.value == "") {
        alert("Don't leave both search-fields empy.");

    } else {
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                jsonObj = JSON.parse(xmlhttp.responseText);
                console.log(jsonObj);
                printJson(jsonObj);
                input.value = '';
            }
        }
    }
}
function loadIdApi() {
    var input = document.getElementById("search-input");
    var imdbID = document.getElementById('imdbId');
    var idUrl ='https://www.omdbapi.com/?i='+imdbID.value+'&apikey=27eab8c1';
    var xmlhttp = new XMLHttpRequest();
    if (input.value == "" && imdbID.value == "") {
        alert("Don't leave both search-fields empy.");

    } else {
        xmlhttp.open("GET", idUrl, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                jsonObj = JSON.parse(xmlhttp.responseText);
                console.log(jsonObj);
                printIdJson(jsonObj);
                imdbID.value ='';

            }
        }
    }
}
function printJson(jsonObj) {
    var data = jsonObj;
    var i;
    var cells = 1,
    html ="<tr id='headtr'><td>Title</td><td>Year</td><td>Type</td><td>Poster</td></tr><tr>";
    /*while(i<data.Search.length){
        var out = `
        <table>
            <tr>
                <td>${data.Search[i].Title}</td>
                <td><img class="posteri" src=${data.Search[i].Poster}></td>
            </tr>
        </table>
        `;
        document.getElementById("searchResponse").innerHTML = out;
        i++;
    }*/
    
    for(i = 0; i<data.Search.length; i++){
        /*var out = `
        <table>
            <tr>
                <td>${data.Search[i].Title}</td>
                <td><img class="posteri" src=${data.Search[i].Poster}></td>
            </tr>
        </table>
        `;*/
        
        html += `<td>${data.Search[i].Title}</td>`;
        html += `<td>${data.Search[i].Year}</td>`;
        html += `<td>${data.Search[i].Type}</td>`;
        html += `<td><img class="posteri" src=${data.Search[i].Poster}></td>`
        
        var next = i+1;
        if(next%cells==0 && next!=data.Search.length){
            html+="</tr><tr>"
        }
    }
    html += "</tr>"
    document.getElementById("table").innerHTML = html;
    
}
function printIdJson(jsonObj) {
    var data = jsonObj;
    var i;
    var cells = 1,
    html ="<tr id='headtr'><td>Title</td><td>Released</td><td>Type</td><td>Poster</td></tr><tr>";
    
   //for(i = 0; i<data.Search.length; i++){
        
        html += `<td>${data.Title}</td>`;
        html += `<td>${data.Released}</td>`;
        html += `<td>${data.Type}</td>`;
        html += `<td><img class="posteri" src=${data.Poster}></td>`
        
        var next = i+1;
        if(next%cells==0 && next!=data.Search.length){
            html+="</tr><tr>"
        }
    //}
    html += "</tr>"
    document.getElementById("table").innerHTML = html;
}