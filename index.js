$(document).ready(() => {
    $("#title").prop("disabled", true)
    $("#year").prop("disabled", true)
    $("#imdbId").prop("disabled", true)
    $("#f-search").prop("disabled", true)
    var myurl = ""
    $(document).on('change', '#opt', function () {
        if ($('#opt').val() == "1") {
            $("#title").prop("disabled", false)
            $("#year").prop("disabled", false)
            $("#imdbId").prop("disabled", true)
            $("#f-search").prop("disabled", false)
            $("#f-search").click(function () {
                var s = $("#title").val()
                var y = $("#year").val()
                if (s.length==0|| y.length==0) {
                    alert(`Enter both values`)
                   /*  return false; */
                   location.reload()
                } else {
                    myurl = myurl + "&s=" + s + "&y=" + y
                    console.log(myurl)
                    getdata(myurl);
                }
            })
        } else if ($('#opt').val() == "2") {
            $("#title").prop("disabled", true)
            $("#year").prop("disabled", true)
            $("#imdbId").prop("disabled", false)
            $("#f-search").prop("disabled", false)
            $("#f-search").click(function () {
                var i = $("#imdbId").val()
                if (i.length ==0) {
                    alert(`Enter id value`)
                    /* return false; */
                    location.reload()
                } else {
                    myurl = myurl + "&i=" + i
                    console.log(myurl)
                    getdata(myurl);
                }
            })
        } else {
            $("#title").prop("disabled", true)
            $("#year").prop("disabled", true)
            $("#imdbId").prop("disabled", true)
            $("#f-search").prop("disabled", true)
        }
        return false;
    })
});
let getdata = (myurl) => {
    console.log("start request")
    console.log(myurl)
    var Poster;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://www.omdbapi.com/?apikey=41404d4b&' + myurl,
        success: (current) => {
            /* alert(Response); */
            console.log(current);
            if (current.Response == "False") {
                /* alert(`Movie not found`) */
                $("#main").hide();
                let code = `<h3>Movie not found<h3><br> <a href="index.htm" class="btn btn-primary">Try another</a>`;
                $("#body").css("background-image", "url('404.jpeg')");
                $("#result").append(code);
                $("#result").show();
                return false;
            }
            console.log(current)

            if (current.Search) {
                console.log(current.Search.length)
                var start = ` <h3>Search Results</h3>`
                $("#heading").append(start);
                for (var l = 0; l < current.Search.length; l++) {


                    if (current.Search[l].Poster == "N/A") {
                        Poster = "Poster_not_available.jpg";
                    } else {
                        Poster = `${current.Search[l].Poster}`;
                        /* console.log(current.Poster) */
                    }

                    let tempcode = `
                <div class="card col-md-3"  style="margin:5px;">
           <img class="card-img-top" src="${Poster}" alt="Card image" style="width:100%;height: 350px;;">
           <div class="card-body">
             <h4 class="card-title" style="font-size:16px;"><b>Title:</b> ${current.Search[l].Title}</h4>
             <div class="card-text"><p><b>Year:</b> ${current.Search[l].Year}</p>                                 
                                                                      
                                    
                                    <p><b>Type:</b> ${current.Search[l].Type}</p>
                                   
                                    
                                   
             
                                    </div></div>`;
                    var codebutton = `<a href="index.htm" class="btn btn-primary">Try another</a>`;

                    $("#result").append(tempcode);

                    $("#main").hide();
                    $("#result").show();
                }
                $("#code-button").append(codebutton);
            } else {
                var start = ` <h3>Search Results</h3>`
                $("#heading").append(start);
                if (current.Poster == "N/A") {
                    Poster = "Poster_not_available.jpg";
                } else {
                    Poster = `${current.Poster}`;
                    /* console.log(current.Poster) */
                }
                let tempcode = ` 
                <div class="card col-md-3" >
           <img class="card-img-top" src="${Poster}" alt="Card image" style="width:100%;height: 350px;;">
           <div class="card-body">
             <h4 class="card-title" style="font-size:16px;"><b>Title:</b> ${current.Title}</h4>
             <div class="card-text"><p><b>Year:</b> ${current.Year}</p>
                                    
                                    <p><b>ImdbId:</b> ${current.imdbID}</p>
                                    <p><b>Type:</b> ${current.Type}</p>
                                   <a href="index.htm" class="btn btn-primary">Try another</a>
             
                                    </div></div>`;
                $("#result").append(tempcode);
                $("#main").hide();
                $("#result").show();
            }
        },

        error: (Error) => {
            /*  console.log("movie not found") */
            $("#main").hide();
            let code = `<h3>Movie not found<h3><br> <a href="index.htm" class="btn btn-primary">Try another</a>`;
            $("#body").css("background-image", "url('404.jpeg')");
            $("#result").append(code);
            $("#result").show();
        },
        beforeSend: () => {
            console.log(`sending request`)
        },
        complete: () => {
            console.log(`Fetching complete`)
        },
        timeout: 3000
    });
};