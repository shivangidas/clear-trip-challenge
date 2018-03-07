$(document).ready(function(e) {
  "use strict";
  //getting the data from API
  $.ajax({
    url: 'http://starlord.hackerearth.com/cleartrip/hackernews',
    success: function(data) {
      data.shift(); //first data is api_rate_limit -ignored
      var html = "";
      sessionStorage.setItem("posts", JSON.stringify(data)); //storing data in session for sorting
      data.forEach(function(post) {
        //html stores the list of news in html format
        html += "<li><div id='news'><a class='link-url' target='_blank' href='";
        html += post.url + "'>" + post.title;
        html += "</a>";
        html += "<span class='author'>&nbsp;&nbsp;author: " + post.author + "</span>";
        html += "<div class='clear'></div>";
        html += "<span>" + post.num_points + "&nbsp;Points</span>";
        html += "<span>&nbsp;" + post.num_comments + " Comments</span>";
        html += "<span>&nbsp;" + post.created_at + "</span>";
        html += "</div></li>";

      });
      $('#container ol').html(html); //populating the list
    },
    cache: false
  });

  //on clicking points sort the list based on points
  $('#points').on('click', function() {
    if (sessionStorage.getItem("posts")) {
      var data = [];
      data = sessionStorage.getItem("posts");
      var storedData = $.parseJSON(data);
      console.log((sortJsonArray(data, 'num_points')));
      //var sortedData=$.parseJSON(sortJsonArrayByProperty(storedData, 'num_points'));
      //$('#container ol').html("");
    }
  });
  //sort the list based on a given property
  function sortJsonArray(objArray, prop, direction) {
    var direct = arguments.length > 2 ? arguments[2] : 1; //Default to ascending

    if (objArray && objArray.constructor === Array) {
      var propPath = (prop.constructor === Array) ? prop : prop.split(".");
      objArray.sort(function(a, b) {
        for (var p in propPath) {
          if (a[propPath[p]] && b[propPath[p]]) {
            a = a[propPath[p]];
            b = b[propPath[p]];
          }
        }
        return ((a < b) ? -1 * direct : ((a > b) ? 1 * direct : 0));
      });
    }
  }
});
