var fs = require( 'fs' );
var sql = require( 'sqlite3' ).verbose();


if( process.argv.length < 3 )
{
    console.log( "wrong file name" );
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
    var rawtext = f.toString();
    var lines = rawtext.split( '\n' );  
    return lines;

}

var lines = readFileLines( filename );
var headers = lines[0];
var data = lines.slice(1);
var x = headers.split(","); 
var arr = [];


for (var i=0; i<data.length; i++)
{
    data[i] = data[i].split(",");
    
}

for ( var i = 0; i<data.length; i++)
{
    var obj = {};

    for (var n = 0; n<data[i].length; n++)
    {
        obj[x[n]] = data[i][n];

      
    }
    
    arr.push(obj);

}


console.log(arr);


function writeToDb ()

{
    var db = new sql.Database("weathersql.sqlite");
    for (var i = 0; i<arr.length -1; i++)
    {
       var objarr = arr[i];
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
    "DateUTC) VALUES (" + "'" 
    + objarr.TimeMDT + 
    "', '" + objarr.TemperatureF + 
    "', '" + objarr.Dew_PointF + 
    "', '" + objarr.Humidity + 
    "', '" + objarr.Sea_Level_PressureIn + 
    "', '" + objarr.VisibilityMPH + 
    "', '" + objarr.Wind_Direction + 
    "', '" + objarr.Wind_SpeedMPH + 
    "', '" + objarr.Gust_SpeedMPH + 
    "', '" + objarr.PrecipitationIn + 
    "', '" + objarr.Events +
     "', '" + objarr.Conditions +
      "', '" + objarr.WindDirDegrees +
       "', '" + objarr.DateUTC +
        "'" + ")" );
}

}
writeToDb();

