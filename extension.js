$(document).ready(function() {
    getDetailFromScript = function(script, name) {
        var data = script.replace(/\s*=\s*/g, "=");
        var escapeSequence = ["\\", ".", "(", ")", "[", "]", "{", "}", "^", "$", "|", "*", "+", "?"];
        for(var key in escapeSequence) {
            name = name.replace(escapeSequence[key], "\\" + escapeSequence[key]);
        }
        var results = new RegExp(name + "=([^;]*)").exec(data);
        if(results === null) {
            return null;
        } else {
            return results[1];
        }
    }; //end getDetailFromScript

    getDownloadLink = function(data) {
        var $parse = $("<div>").append($(data));
        var stuff = $parse.find("#downloadB").parent();
        var $ajaxGetData = $("<div>", {
            id : "ajaxGetData",
            display : "none"
        }).append(stuff);
        $("body").append($ajaxGetData);
        var link = $("#downloadB").attr("href");
        $ajaxGetData.remove();
        
        return link;

    }; //end downloadLink
    
    var downloadLink = $("a").filter(function(index) {
        return $(this).attr("href").search("zippyshare.com/v/") > -1;
    }).css({
        position : "relative"
    }).append($("<img>", {
        class : "downloadButton overlay icon",
        src : chrome.extension.getURL("image/Downloads.png")
    }));

    $(".downloadButton").click(function() {
        var $this = $(this);
        var url = $this.parent().attr("href");
        $.get(url, function(data) {
            var link = getDownloadLink(data);
            link = url.match(/(http|https):\/\/[^\/?:#]*/)[0] + link;
            window.open(link);
        });
        return false;
    });
});
