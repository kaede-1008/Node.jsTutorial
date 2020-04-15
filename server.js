// コードのモジュール化
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = ""
        var pathname = url.parse(request.url).pathname; //ルーティング取得
        console.log("Request " + pathname + " received");

        request.setEncoding("utf8");
        
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
            postDataChunk + "'.");
        });
        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
    }
    //     response.writeHead(200, {"Content-Type": "text/plain"});
    //     var content = route(handle, pathname);
    //     response.write(content);
    //     response.end();
    // }
    http.createServer(onRequest).listen(8888);
    console.log("server has started");
}
exports.start = start;  //exportでモジュールの機能を提供することが可能
