var fs = require( 'fs' );
var http = require( 'http' );
var sql = require( 'sqlite3' ).verbose();

function getFormValuesFromURL( url )
{
    var kvs = {};
    var parts = url.split( "?" );
    var key_value_pairs = parts[1].split( "&" );
    for( var i = 0; i < key_value_pairs.length; i++ )
    {
        var key_value = key_value_pairs[i].split( "=" );
        kvs[ key_value[0] ] = key_value[1];
    }
    // console.log( kvs );
    return kvs
}

var db = new sql.Database( 'weathersql.sqlite' );
function server_fun( req, res )
{
    console.log( req.url );
    // ...
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
    }
    catch( exp ) {
        // console.log( "huh?", req.url.indexOf( "second_form?" ) );
        if( req.url.indexOf( "first_form" ) >= 0 )
        {
            var kvs = getFormValuesFromURL( req.url );
            var values = "('";
            values += kvs['timemdt'] + "','";
            values += kvs['tempf'] + "','";
            values += kvs['dewpoint'] + "','";
            values += kvs['humidity'] + "','";
            values += kvs['pressure'] + "','";
            values += kvs['visibility'] + "','";
            values += kvs['windir'] + "','";
            values += kvs['windspeed'] + "','";
            values += kvs['gustspeed'] + "','";
            values += kvs['precipitation'] + "','";
            values += kvs['events'] + "','";
            values += kvs['conditions'] + "','";
            values += kvs['winddegrees'] + "','";
            values += kvs['dateutc'] + "')";
            //console.log( values );
            db.run( "INSERT INTO WeatherData" +
            "(TimeMDT, " +
            "TemperatureF, " +
            "Dew_PointF, " +
            "Humidity, " + 
            "Sea_Level_PressureIn, " +
            "VisibilityMPH, " +
            "Wind_Direction, " +
            "Wind_SpeedMPH, " +
            "Gust_SpeedMPH, " +
            "PrecipitationIn, " +
            "Events, " +
            "Conditions, " +
            "WindDirDegrees, " +
            "DateUTC) VALUES " +values,
                    function() {
                        res.writeHead( 200 );
                        res.end( "you added an entry (check database)" );
                    } );
        } 

        
        else if (req.url.indexOf("second_form") >= 0) 
        {
            var kvs = getFormValuesFromURL(req.url);
            var mint = kvs['min_time'];
            var maxt = kvs['max_time'];
            var minI = parseInt(mint);
            var maxI = parseInt(maxt);
            //BUG : as we have a database of strings, 12 is smaller than 2

            db.all( "SELECT * FROM WeatherData WHERE TimeMDT BETWEEN " + mint +  " AND " + maxt,
                    function(err, rows) {
                        res.writeHead( 200 );
                        var response = "";
                        if(minI > maxI)
                        {
                        console.log("min must be less than max");
                        response += "nothing, as min was more than max";
                        }
                        for( var i = 0; i < rows.length; i++ )
                        {
                        if( rows[i].TimeMDT >= mint && rows[i].TimeMDT <= maxt )
                        {
                        response += rows[i].TimeMDT + " ";
                        }
                        }
                        console.log(response);
                        res.end( "You searched for a time between " + mint + " and " + maxt + " hours" + " and we found " + response );
                    } ); 
            
        }
        
        else
        {
            // console.log( exp );
            res.writeHead( 404 );
            res.end( "did not add a new entry" );
        }
    }
}

var server = http.createServer( server_fun );

server.listen( 8080 );