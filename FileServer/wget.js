var http = require( 'http' );
var fs   = require( 'fs' );

if( process.argv.length < 3 )
{
    console.log( "Need a file name" );
    process.exit( 1 );
}

var filename = process.argv[2];



function readFileLines( name )
{
    try {
        var f = fs.readFileSync( name );
    }
    catch( exp ) {

        throw exp;
    }
    var contents = f.toString();
    return contents.split( '\n' );
}

var lines = readFileLines( filename );
console.log( "Lines: ", lines );

var num_files = lines.length;
var files_complete = 0;

for( var i = 0; i < lines.length; i++ )
{
    var line = lines[i];
    var parts = line.split( ' ' );
    var name = parts[0];
    var url = parts[1];
    download( url, name, function() { console.log( "All Done!!!" ); } );
}

function download( url, dest, callback )
{
    try {
        var f = fs.openSync( dest, 'w' );
        fs.closeSync( f );
    }
    catch( exp )
    {
        console.log( 'unable to open', dest, 'for writing' );
        files_complete++;
        return;
    }

    console.log( "Start downloading!!", dest, url );
    var file = fs.createWriteStream( dest );

    try {
        var request = http.get( url, function( response ) {
            console.log( "response??? " );
            file.on( 'finish', function() {
                console.log( "Finished writing!", files_complete, num_files );
                files_complete++;
                if( files_complete >= num_files )
                {
                    callback();
                }
            } );
            response.pipe( file );
        } );

        request.on( 'error', function( err ) {
            files_complete++;
            console.log( "Error!!!", err );
        } );
    }
    catch( exp ) {
        console.log( "Bad URL:", url );
        files_complete++;
        return;
    }

    console.log( "Sent request" );
}


console.log( "Done?" );
