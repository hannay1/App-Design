var http = require( 'http' );
var fs   = require( 'fs' );

function server ( req, res)
{
	//console.log(req.url);
	res.writeHead(200);
	var withoutslash = req.url.substring(1, req.url.length); //removes slash (at position 1 of req.url) from the beggining of each line
	 try {
        var f = fs.readFileSync( withoutslash );
        var contents = f.toString();
        res.end(contents);
    }catch( exp ) {
        res.end("did not read file " + withoutslash);
    }
}

console.log ("Server will start...");
var localserver = http.createServer(server);

localserver.listen(8080);

