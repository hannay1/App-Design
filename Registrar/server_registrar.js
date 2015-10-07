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
    return kvs
}

function addS( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var name = kvs[ 'Sname' ];
    var sandwich = kvs[ 'Sandwich' ];
    db.run( "INSERT INTO Students(Name, SandwichPreference) VALUES ( ?, ? )", name, sandwich,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added student" );
                }
                else
                {
                    //console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addT( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var name = kvs[ 'Tname' ];
    db.run( "INSERT INTO Teachers(Name) VALUES (?)", name,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added teacher" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addC( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var name = kvs[ 'Cname' ];
    db.run( "INSERT INTO Courses(Name) VALUES (?)", name,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added a course" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addE( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var student1 = kvs[ 'Estudents' ];
    var class1 = kvs[ 'Eclass' ];
    db.run( "INSERT INTO Enrollments(student, class) VALUES ( ?, ? )", student1, class1,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added an enrollment form" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addZ( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var teacher2 = kvs[ 'TAteacher' ];
    var class2 = kvs[ 'TAclass' ];
    db.run( "INSERT INTO TeachingAssignments(teacher, class) VALUES ( ?, ? )", teacher2, class2,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added an Teacher Assignment" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function showS (req, res)
{
    
    var db = new sql.Database( 'registrar.sqlite' );
            db.all( 'SELECT * FROM Students;',
            function(err, rows) {
            if(err !== null)
            {
            console.log(err);
            return;
            }
            else
            {
            res.writeHead( 200 );
            var response_text = "<html><body><table><tbody>";
            for( var i = 0; i < rows.length; i++ )
            {
            response_text += "<tr><td>" + rows[i].Name +
            "</td><td>"+rows[i].SandwichPreference+"</td></tr>";
            }
            response_text += "</tbody></table></body></html>";
            res.end( response_text );
            }
        });
}

function showT (req, res)
{
    
    var db = new sql.Database( 'registrar.sqlite' );
            db.all( 'SELECT * FROM Teachers;',
            function(err, rows) {
            if(err !== null)
            {
            console.log(err);
            return;
            }
            else
            {
            res.writeHead( 200 );
            var response_text = "<html><body><table><tbody>";
            for( var i = 0; i < rows.length; i++ )
            {
            response_text += "<tr><td>" + rows[i].Name +
            "</td></tr>";
            }
            response_text += "</tbody></table></body></html>";
            res.end( response_text );
            }
        });
}

function showC (req, res)
{
    
    var db = new sql.Database( 'registrar.sqlite' );
            db.all( 'SELECT * FROM Courses;',
            function(err, rows) {
            if(err !== null)
            {
            console.log(err);
            return;
            }
            else
            {
            res.writeHead( 200 );
            var response_text = "<html><body><table><tbody>";
            for( var i = 0; i < rows.length; i++ )
            {
            response_text += "<tr><td>" + rows[i].Name +
            "</td></tr>";
            }
            response_text += "</tbody></table></body></html>";
            res.end( response_text );
            }
        });
}

function showE (req, res)
{
    
    var db = new sql.Database( 'registrar.sqlite' );
            db.all( 'SELECT Enrollments.*, Students.sid, Students.Name AS SName, Courses.* FROM EnrollmentS JOIN Students ON Enrollments.student=Students.sid JOIN Courses ON Enrollments.class=Courses.cid',
            function(err, rows) {
            if(err !== null)
            {
            console.log(err);
            return;
            }
            else
            {
            res.writeHead( 200 );
            var response_text = "<html><body><table><tbody>";
            for( var i = 0; i < rows.length; i++ )
            {

                console.log("is this working?");
            response_text += "<tr><td>" + rows[i].Name +
            "</td><td>"+rows[i].SName +"</td></tr>";
            }
            response_text += "</tbody></table></body></html>";
            res.end( response_text );
            }
        });
}

function showZ (req, res)
{
    
    var db = new sql.Database( 'registrar.sqlite' );
            db.all( 'SELECT * FROM TeachingAssignments;',
            function(err, rows) {
            if(err !== null)
            {
            console.log(err);
            return;
            }
            else
            {
            res.writeHead( 200 );
            var response_text = "<html><body><table><tbody>";
            for( var i = 0; i < rows.length; i++ )
            {
            response_text += "<tr><td>" + rows[i].teacher +
            "</td><td>"+rows[i].class+"</td></tr>";
            }
            response_text += "</tbody></table></body></html>";
            res.end( response_text );
            }
        });
}

function server_fun( req, res )
{
    //console.log( "The URL: '", req.url, "'" );
    // ...
    if( req.url === "/" || req.url === "/indexf.htm" )
    {
        req.url = "/indexf.html";
    }
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
    }
    catch( exp ) {
        if( req.url.indexOf( "addS" ) >= 0 )
        {
            addS( req, res );
        }
        else if( req.url.indexOf("addT") >= 0) 
        {
            addT( req, res);
        }
        else if( req.url.indexOf("addC") >= 0) 
        {
            addC( req, res);
        }
        else if( req.url.indexOf("addE") >= 0) 
        {
            addE( req, res);
        }
        else if( req.url.indexOf("addZ") >= 0) 
        {
            addZ( req, res);
        }
        else if(req.url.indexOf("showS") >=0)
        {

            showS( req, res);
        }
        else if(req.url.indexOf("showT") >=0)
        {

            showT( req, res);
        }
        else if(req.url.indexOf("showC") >=0)
        {

            showC( req, res);
        }
         else if(req.url.indexOf("showE") >=0)
        {

            showE( req, res);
            console.log("does this even");
        }
         else if(req.url.indexOf("showZ") >=0)
        {

            showZ( req, res);
        }
        else
        {
            // console.log( exp );
            res.writeHead( 404 );
            res.end( "Cannot find file: "+filename );
        }
    }
}

var server = http.createServer( server_fun );

server.listen( 8080 );
