var http = require( 'http' );
var fs   = require( 'fs' );

function server ( req, res)
{
	//console.log(req.url);
	res.writeHead(200);
	var withoutslash = req.url.substring(1, req.url.length); //removes slash (at position 1 of req.url) from the beggining of each line
    //var withoutslash = "./" + req.url; ./ means read contents of req.url as a file name
	 try {
        var f = fs.readFileSync( withoutslash );
        var contents = f.toString();
        res.writeHead(200);
        res.end(contents);
    }catch( exp ) {
        res.writeHead(404);
        res.end("did not read file " + withoutslash);
    }
}

console.log ("Server will start...");
var localserver = http.createServer(server);

localserver.listen(8080);

