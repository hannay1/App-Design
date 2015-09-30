var http = require( 'http' );
var fs   = require( 'fs' );

// Did the user type a filename?
if( process.argv.length < 3 )
{
    console.log( "Usage: Need a filename, dummy" );
    process.exit( 1 );
}

var filename = process.argv[ 2 ];

console.log( "You want me to read file: ", filename );

// Use try to avoid crashing
function download( url, dest, callback )
{
    console.log( "Start downlddddoading!!" );
    var file = fs.createWriteStream( dest );

    var request = http.get( url, function( response ) {
        //console.log( "response??? ", response );
        console.log( "response??? " );
        file.on( 'finish', function() {
            console.log( "Finished writing!" );
        } );
        response.pipe( file );
    } );

    // Not temporally after the "get" is done!!!!!!!!

    request.on( 'error', function( err ) {
        console.log( "Error!!!", err );
    } );
//////////////////////////////////////////// errors
console.log( "Sent request" );
}

try
{

    var fileBuffer = fs.readFileSync( filename ); //reads file
    var contents = fileBuffer.toString(); //changes the contents of the file to string
    var contents_lines = contents.split("\n"); //splits the file using new line as a boundary to get lines containing both names and urls
    var names = []; //empty names array, will hold name portion of each split
    var urls = []; //empty url array, will hold url portion of each split

for( var i = 0; i < contents_lines.length; i++ )
{
    var line = contents_lines[i]; //line holds each iteration of contents_lines (references each line of file)
    var linesplit = line.split(" "); // splits each line of file using space as a boundary to get seperate name and url

    //console.log( i, contents_lines[i] );
    names.push(linesplit[0]); //adds the first half (names) of each line to name array
    urls.push(linesplit[1]); //adds second half (urls) of each line to url array
    download(urls[i], names[i], null);
}
    console.log(names, urls);
}

catch( exp )
{
    console.log("generic error if try could not sort out the given file & url parameters that aren't supposed to work");

    

}


