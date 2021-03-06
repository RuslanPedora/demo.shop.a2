const ITEM_TABLE_PREFIX = '_IT';
const PROPERTY_TABLE_PREFIX = '_PT';

var path       = require( 'path' );
var fs         = require( 'fs' );
var express    = require( 'express' );
var cors       = require('cors');
var bodyParser = require('body-parser');
var appExpress = express();
var mysql      = require( 'mysql' );
var nodemailer = require('nodemailer');

var sourcePathName  = 'src';
var DEBUG_MODE = true;

var connetionData = {
                      host     : 'localhost',
                      database : 'trial_shop_db',
                      user     : 'root',
                      multipleStatements: true
                    };

if ( process.env.DATABASE_URL ) {
  connetionData.host     = process.env.DATABASE_URL;
  connetionData.database = process.env.DATABASE_DB_NAME;
  connetionData.user     = process.env.DATABASE_USER;
  connetionData.password = process.env.DATABASE_PASSWORD;
  console.log( 'Database connection parameters changed to : ' + JSON.stringify( connetionData ) );
}

appExpress.use( cors() );

appExpress.get( "/", initResponse );
appExpress.get( "/slider", initResponse );
appExpress.get( "/shopping-cart", initResponse );
appExpress.get( "/order-form", initResponse );
appExpress.get( "/item-list", initResponse );
appExpress.get( "/item", initResponse );

appExpress.get( "/items", itemsResponse );
appExpress.get( "/carriers", carriersResponse );
appExpress.get( "/discount_items", discountItemsResponse );
appExpress.get( "/item_images", itemImagesResponse );
appExpress.get( "/category_tree", categoryTreeResponse );
appExpress.get( "/item_properties", itemPropertiesResponse );
appExpress.get( "/available_properties", availablePropertiesResponse );

appExpress.post( "/order", orderResponse );

appExpress.use( '/images/', express.static( path.join( __dirname, 'src/images' ) ) );
appExpress.use( '/icons-logos/', express.static( path.join( __dirname, 'src/images' ) ) );
appExpress.use( '/node_modules/', express.static( path.join( __dirname, 'node_modules' ) ) );
appExpress.use( '/', express.static( path.join( __dirname, 'src' ) ) );
appExpress.use( '/src', express.static( path.join( __dirname, 'src' ) ) );
//appExpress.use( express.static( __dirname + '\\src' ) );

console.log( 'static folder images:' + __dirname + '\\src\\images' );
console.log( 'static folder icons-logos:' + __dirname + '\\src\\icons-logos' );
console.log( 'basic folder :' + __dirname );
console.log( 'heroku port: ' + process.env.PORT );

server = appExpress.listen( process.env.PORT || 8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log( "Server has been started: " + host + " - " + port );
});
//-----------------------------------------------------------------------------
function initResponse( request, response ) {

    fs.readFile( __dirname + '/src/index.html', function ( err, html ) {
        if (err) {
            logRequest( err ); 
        }       
        
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    });

    //response.sendFile( path.join( __dirname + '/index.html' ) );
    logRequest( request.url, 'index.html loaded' );
}
//-----------------------------------------------------------------------------
function orderResponse( request, response ) {

    var passedObjectAsString = ''

    request.setEncoding('utf8')

    request.on( 'data', function( chunk ) {
        
        passedObjectAsString += chunk;
    });

    request.on( 'end', function() {
        var passedObject = {};
        try {
          passedObject = JSON.parse( passedObjectAsString );
        }
        catch ( error )  {
          logRequest( error );
          //serverSideError( request, response )
        }

        querySQL = '\
          INSERT INTO orders (orderDate,user) VALUES ( now(), \'' + passedObject.email + '\' ); ';  

        for( var i in passedObject.orderRows )  {
          querySQL += ' INSERT INTO orderItems\
                         ( orderId, itemId, sum) VALUES\
                         ( ( SELECT MAX(id) FROM orders ), ' + passedObject.orderRows[ i ].item.id +', ' + passedObject.orderRows[ i ].total + ' );'
        }

        querySQL += 'SELECT MAX(id) AS orderNumber FROM orders;';

        connection = mysql.createConnection( connetionData );
        connection.connect();
        connection.query( querySQL, function ( error, results, fields ) {
                            if (error) { 
                              logRequest( 'db connetion failed: ' + querySQL );
                              return;
                            }
                            response.writeHead( 200, {'Content-Type': 'text/plain' } );
                            sendOrderEmail( results[ results.length - 1 ][ 0 ].orderNumber, passedObject );
                            responseStr = JSON.stringify( results[ results.length - 1 ][ 0 ] );                                                     
                            response.end( responseStr );
                            logRequest( request.url, 'itmes request processed' );
                        });
        connection.end( function( err ) {
          console.log( 'connection ended with error: ' + err );
        });
    })
}
//-----------------------------------------------------------------------------
function sendOrderEmail( orderNumber, orderData ) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'demo.shop.a2@gmail.com',
            pass: 'ltvjijg2017'
        }
    });
    let mailOptions = {
        from: 'demo.shop.a2@gmail.com',
        to: '' + orderData.email,
        subject: 'Order ' + orderNumber + ' from demo.shop.a2 (this is demo purpose mail)',
        text: 'zzz',
        html: '+++'
    };

    messageText = 'Hello ' + orderData.firstName + ' ' + orderData.secondName +
                  '<br><br>You have placed an order # ' + orderNumber + ' on our site demo-shop-a2.herokuapp.com, but this is not true e-shop,' +
                  ' our shop assistant will not contact you.<br>' + 
                  'This is demo purpose mail only<br><br>';
    messageHtml = '<p>' + messageText;
    messageHtml += '</p>';
    messageHtml +='<table style="border-collapse:collapse">'

    messageHtml +='<tr>'
    messageHtml +='<th style="text-align:center;border:1px solid black;padding:5px;">Item'
    messageHtml +='</th>'    
    messageHtml +='<th style="text-align:center;border:1px solid black;padding:5px;">qty.'
    messageHtml +='</th>'    
    messageHtml +='<th style="text-align:center;border:1px solid black;padding:5px;">price'
    messageHtml +='</th>'    
    messageHtml +='<th style="text-align:center;border:1px solid black;padding:5px;">total'
    messageHtml +='</th>'    
    messageHtml +='</tr>'

    for( let i in orderData.orderRows ) {
      if( i%2 > 0 ) 
        colorStyle = "background-color:#A3E4D7;";
      else  
        colorStyle = "";
      messageHtml +='<tr>'
      messageHtml +='<td style="border:1px solid black;padding:5px;' + colorStyle + '">' + orderData.orderRows[ i ].item.name;
      messageHtml +='</td>'    
      messageHtml +='<td style="text-align:right;border:1px solid black;padding:5px;' + colorStyle + '">' + orderData.orderRows[ i ].quantity;
      messageHtml +='</td>'    
      messageHtml +='<td style="text-align:right;border:1px solid black;padding:5px;' + colorStyle + '">' + orderData.orderRows[ i ].item.discountPrice.toFixed( 2 ) + '$';
      messageHtml +='</td>'    
      messageHtml +='<td style="text-align:right;border:1px solid black;padding:5px;' + colorStyle + '">' + orderData.orderRows[ i ].total.toFixed( 2 ) + '$';
      messageHtml +='</td>'    
      messageHtml +='</tr>'      
    }


    messageHtml +='<tr>'
    messageHtml +='<td style="border:1px solid black;padding:5px;" colspan=3>Total'
    messageHtml +='</td>'    
    messageHtml +='<td style="text-align:right;border:1px solid black;padding:5px;font-weight:bold;">' + orderData.total.toFixed( 2 ) + '$';
    messageHtml +='</td>'    
    messageHtml +='</tr>'


    messageHtml +='<tr>'
    messageHtml +='<td style="border:1px solid black;padding:5px;" colspan=3>Total, shipment included'
    messageHtml +='</td>'    
    messageHtml +='<td style="text-align:right;border:1px solid black;padding:5px;font-weight:bold;">' + orderData.totalPlusShipment.toFixed( 2 ) + '$';
    messageHtml +='</td>'    
    messageHtml +='</tr>'


    messageHtml +='</table>'

    messageHtml += '<br>Payment method: ' + orderData.paymnetType; 
    messageHtml += '<br>'

    messageHtml += '<br>Additional information: ' + orderData.comment; 
    messageHtml += '<br>'


    messageHtml += '<br><br><p>Kind regards.<br><br>demo-shop-a2.herokuapp.com team.</p>';

    mailOptions.text = messageText;
    mailOptions.html = messageHtml;

    transporter.sendMail( mailOptions, ( error, info ) => {
        if ( error ) {
            return console.log(error);
        }
        logRequest('Message %s sent: %s', info.messageId, info.response);
    });


}
//-----------------------------------------------------------------------------
function availablePropertiesResponse( request, response ) {
    var querySQL;
    var queryInputString;
    var indexOfQueryString;
    var queryObject = {};
    var propertyNumber = 0;

    indexOfQueryString = request.url.indexOf( '/?' );
    if ( indexOfQueryString > 0 )
      queryInputString = request.url.slice( indexOfQueryString + 2 , request.url.length );
    else 
      queryInputString = '';

    if ( DEBUG_MODE )
      logRequest( request.url, 'query string: ' + queryInputString );

    querySQL = '\
        SELECT DISTINCT propertyId AS propertyId,\
               properties.name AS propertyName,\
               value AS value\
        FROM itemProperties AS itemProperties\
        INNER JOIN properties AS properties\
        ON itemProperties.propertyId = properties.id\
        LEFT JOIN ( SELECT propertyId AS propertyIdTemp, value AS valueTemp \
                    FROM itemProperties selectedCondition ) AS selectedProperties\
        ON itemProperties.propertyId = selectedProperties.propertyIdTemp AND\
           itemProperties.value = selectedProperties.valueTemp\
        LEFT JOIN ( SELECT propertyId AS propertyIdOther, value AS valueOther \
                    FROM itemProperties selectedNotCondition ) AS selectedOtherValues\
        ON itemProperties.propertyId = selectedOtherValues.propertyIdOther AND\
           itemProperties.value = selectedOtherValues.valueOther\
        WHERE \
          ( ( itemProperties.itemId IN \
              ( SELECT itemId\
                FROM itemProperties\
                propertyConditionInjection\
                GROUP BY itemId\
                HAVING COUNT( propertyId ) = propertyNumber )\
            )\
            OR\
            propertyNumber = 0\
          )\
        AND value <> \'\'\
        AND\
          itemProperties.itemId IN\
          (SELECT id\
            FROM items as items\
            LEFT JOIN\
              ( SELECT prices.itemId as itemId, prices.value as price\
                FROM prices as prices\
                INNER JOIN\
                ( SELECT itemId, MAX( startDate ) as maxStartDate\
                  FROM prices where startDate <= now()\
                  GROUP BY itemId\
                ) AS lastDates\
                ON prices.itemId = lastDates.itemId AND prices.startDate = lastDates.maxStartDate\
              ) AS priceTable\
              ON id = priceTable.itemId\
            categoryConditionInjection\
          )\
        AND selectedProperties.propertyIdTemp IS NULL\
        OR NOT ( selectedOtherValues.propertyIdOther IS NULL )\
        ORDER BY properties.name, value';
    
    conditionString = '';
    try {
      querySQL = querySQL.replace( new RegExp( 'conditionInjection', 'g' ), '' );
      categoryConditionInjection = constructSQLCondition( decodeQuotes( queryInputString ), ITEM_TABLE_PREFIX );

      propertyConditionInjection = '';
      currentConditionInjection = ''

      queryObject = JSON.parse( decodeQuotes( queryInputString ) );
      for( let propertryObject in queryObject ) {
        if(  propertryObject.indexOf( 'Container' ) >= 0 ) {
          propertyNumber++;
          currentConditionInjection = constructSQLCondition( JSON.stringify( queryObject[ propertryObject ] ) );
          if( propertyConditionInjection != '' )
            currentConditionInjection = currentConditionInjection.replace( 'WHERE', 'OR' );
          else
            currentConditionInjection = currentConditionInjection.replace( 'WHERE', '' );
          propertyConditionInjection += currentConditionInjection;
        }
      }

      selectedCondition = ' WHERE false ';
      if( propertyConditionInjection != '' ) {
        propertyConditionInjection = ' WHERE ( ' + propertyConditionInjection + ' ) ';
        selectedCondition = propertyConditionInjection;
      }

      selectedNotCondition = selectedCondition.replace( new RegExp( 'value =', 'g' ), 'value <>' );
      selectedNotCondition = selectedNotCondition.replace( new RegExp( 'OR', 'g' ), 'AND' );

      selectedNotCondition += ' AND itemId IN ( SELECT id FROM items WHERE categoryId = ' + queryObject._ITcategoryId + ' ) ';
        
    }    
    catch ( error )  {
      logRequest( error );
      //serverSideError( request, response )
    }

    querySQL = querySQL.replace( new RegExp( 'propertyConditionInjection', 'g' ), propertyConditionInjection );
    querySQL = querySQL.replace( new RegExp( 'propertyNumber', 'g' ), '' + propertyNumber );
    querySQL = querySQL.replace( new RegExp( 'selectedCondition', 'g' ), selectedCondition );
    querySQL = querySQL.replace( new RegExp( 'selectedNotCondition', 'g' ), selectedNotCondition );
    querySQL = querySQL.replace( new RegExp( 'categoryConditionInjection', 'g' ), categoryConditionInjection );
  
    makeResponseOnDBData( querySQL, request, response );
}
//-----------------------------------------------------------------------------
function makeResponseOnDBData( querySQL, request, response ) {
    connection = mysql.createConnection( connetionData );
    connection.connect();
    connection.query( querySQL, function ( error, results, fields ) {
                        if (error) { 
                          logRequest( 'db connetion failed: ' + querySQL );
                          logRequest( 'Error: ' + error );
                          //serverSideError( request, response )
                          return;
                        }
                        response.writeHead( 200, {'Content-Type': 'text/plain' } );
                        responseStr = JSON.stringify( results );                                                     
                        response.end( responseStr );
                        logRequest( request.url, 'itmes request processed' );
                    });
    connection.end( function( err ) {
      console.log( 'connection ended with error: ' + err );
    });
    logRequest( request.url, 'connection is closed' );
}
//-----------------------------------------------------------------------------
function serverSideError( request, response ) {
  response.writeHead( 404, {'Content-Type': 'text/plain' } );
  response.sendFile( path.join( __dirname + '/404.html' ) );
}
//-----------------------------------------------------------------------------
function discountItemsResponse ( request, response ) {

    querySQL = '\
        SELECT items.id as id, items.name as name, items.mainImage as mainImage,\
               price AS price, discount as discount,\
               ( price * ( 1 - discount / 100) ) AS discountPrice\
        FROM items as items\
        INNER JOIN\
        (SELECT prices.itemId as itemId, prices.value as price\
          FROM prices as prices\
          INNER JOIN\
          ( SELECT itemId, MAX( startDate ) as maxStartDate\
            FROM prices WHERE startDate <= now()\
            GROUP BY itemId\
          ) AS lastDates\
          ON prices.itemId = lastDates.itemId AND prices.startDate = lastDates.maxStartDate) AS priceTable\
        ON id = priceTable.itemId\
        INNER JOIN\
        (SELECT discountItems.itemId as itemIdDisc, discountItems.discount as discount\
          FROM discountItems as discountItems\
          INNER JOIN\
          ( SELECT itemId, MAX( startDate ) as maxStartDate\
            FROM discountItems WHERE startDate <= now()\
            GROUP BY itemId\
          ) AS lastDiscountDates\
          ON discountItems.itemId = lastDiscountDates.itemId AND discountItems.startDate = lastDiscountDates.maxStartDate) AS discountTable\
        ON id = discountTable.itemIdDisc\
        ORDER BY discount DESC\
        LIMIT 10';

      makeResponseOnDBData( querySQL, request, response );  
}
//-----------------------------------------------------------------------------
function carriersResponse( request, response ) {

    querySQL = '\
      SELECT *\
      FROM carriers\
      ORDER BY name';

    makeResponseOnDBData( querySQL, request, response );
} 
//-----------------------------------------------------------------------------
function categoryTreeResponse( request, response ) {

    querySQL = '\
      SELECT hierarchy.categoryId as id, categories.name, hierarchy.parentId, parents.name AS parentName\
      FROM categoryHierarchy AS hierarchy\
      INNER JOIN categories AS categories \
      ON hierarchy.categoryId = categories.id\
      LEFT JOIN categories AS parents \
      ON hierarchy.parentId = parents.id\
      ORDER BY parents.name, categories.name';

    makeResponseOnDBData( querySQL, request, response );
}
//-----------------------------------------------------------------------------
function itemPropertiesResponse( request, response ) {
    var querySQL;
    var queryInputString;
    var indexOfQueryString;

    indexOfQueryString = request.url.indexOf( '/?' );
    if ( indexOfQueryString > 0 )
      queryInputString = request.url.slice( indexOfQueryString + 2 , request.url.length );
    else 
      queryInputString = '';

    if ( DEBUG_MODE )
      logRequest( request.url, 'query string: ' + queryInputString );

    querySQL = '\
        SELECT items.id as itemId, \
               items.name AS itemName, \
               properties.id AS propertryId,\
               properties.name AS propertyName,\
               itemProperties.value AS propertyValue\
        FROM items\
        INNER JOIN itemProperties AS itemProperties\
        ON items.id = itemProperties.itemId\
        INNER JOIN properties AS properties\
        ON itemProperties.propertyId = properties.id\
        WHERE items.id = conditionInjection\
        ORDER BY properties.viewPriority DESC, properties.name';
    try {
      conditionString = JSON.parse( decodeQuotes( queryInputString ) ).id;
    }
    catch ( error )  {
      logRequest( error );
      //serverSideError( request, response )
    }    
    logRequest( request.url, 'condition string: ' + conditionString);    
    querySQL = querySQL.replace( new RegExp( 'conditionInjection', 'g' ), conditionString );

    makeResponseOnDBData( querySQL, request, response );
}  
//-----------------------------------------------------------------------------
function itemImagesResponse( request, response ) {
    var querySQL;
    var queryInputString;
    var indexOfQueryString;

    indexOfQueryString = request.url.indexOf( '/?' );
    if ( indexOfQueryString > 0 )
      queryInputString = request.url.slice( indexOfQueryString + 2 , request.url.length );
    else 
      queryInputString = '';

    if ( DEBUG_MODE )
      logRequest( request.url, 'query string: ' + queryInputString );

    querySQL = '\
      SELECT mainImage imageSrc FROM items WHERE id = conditionInjection\
      UNION ALL\
      SELECT imageSrc FROM images WHERE itemId = conditionInjection';
    try {
      conditionString = JSON.parse( decodeQuotes( queryInputString ) ).id;
    }
    catch ( error )  {
      logRequest( error );
      //serverSideError( request, response )
    }

    logRequest( request.url, 'condition string: ' + conditionString);    
    querySQL = querySQL.replace( new RegExp( 'conditionInjection', 'g' ), conditionString );

    makeResponseOnDBData( querySQL, request, response );
}
//-----------------------------------------------------------------------------
function itemsResponse( request, response ) {
    var querySQL;
    var queryInputString;
    var indexOfQueryString;
    var queryObject = {};
    var propertyCount = 0;

    indexOfQueryString = request.url.indexOf( '/?' );
    if ( indexOfQueryString > 0 )
      queryInputString = request.url.slice( indexOfQueryString + 2 , request.url.length );
    else 
      queryInputString = '';

    if ( DEBUG_MODE )
      logRequest( request.url, 'query string: ' + queryInputString );

    querySQL = '\
      SELECT * FROM\
        ( SELECT items.id as id, items.name as name, items.mainImage as mainImage,\
                 IFNULL( price, 0 ) AS price, discount AS discount,\
                 CAST( IFNULL( price, 0 ) * ( 1 - IFNULL( discountTable.discount, 0 ) / 100 ) AS DECIMAL(20,2) ) AS discountPrice,\
                 items.categoryId, categories.name as category\
        FROM items as items\
        \
        LEFT JOIN\
        ( SELECT prices.itemId as itemId, prices.value as price\
          FROM prices as prices\
          INNER JOIN\
          ( SELECT itemId, MAX( startDate ) as maxStartDate \
            FROM prices where startDate <= now() \
            GROUP BY itemId \
          ) AS lastDates\
          ON prices.itemId = lastDates.itemId AND prices.startDate = lastDates.maxStartDate\
        ) AS priceTable\
        ON id = priceTable.itemId\
        \
        LEFT JOIN\
        (SELECT discountItems.itemId as itemIdDisc, discountItems.discount as discount\
          FROM discountItems as discountItems\
          INNER JOIN\
          ( SELECT itemId, MAX( startDate ) as maxStartDate\
            FROM discountItems WHERE startDate <= now()\
            GROUP BY itemId\
          ) AS lastDiscountDates\
          ON discountItems.itemId = lastDiscountDates.itemId AND discountItems.startDate = lastDiscountDates.maxStartDate\
        ) AS discountTable\
        ON id = discountTable.itemIdDisc\
        \
        LEFT JOIN categories\
        ON items.categoryId = categories.id) as itemSelection\
      conditionInjection';

    try {

      conditionInjection = constructSQLCondition( decodeQuotes( queryInputString ), ITEM_TABLE_PREFIX );
      logRequest( request.url, 'condition string: ' + conditionInjection );    

      if( queryInputString != '' )
        queryObject = JSON.parse( decodeQuotes( queryInputString ) );
      propertyCondition = '';
      currentCondition = '';
      numberOrder = '';
      for( var property in queryObject ) {
        if( property.indexOf( "propertyId_" ) >= 0 ) {
            numberOrder = property.slice( property.lastIndexOf( '_' ) );
            currentCondition = constructSQLCondition( JSON.stringify( { propertyId: queryObject[ property ], 
                                                                        value: queryObject[ 'value' + numberOrder ] } ) );
            if( propertyCondition != '' ) {
              currentCondition = currentCondition.replace( 'WHERE', 'OR' );
            }
            propertyCondition += currentCondition;
            propertyCount++;
        }
      }
      if( propertyCondition != '' ) {
          if( conditionInjection == '' ) 
              conditionInjection = " WHERE ( ";
          else  
              conditionInjection += " AND ( ";
          conditionInjection += 'id IN \
                ( SELECT itemId\
                  FROM itemProperties\
                  ' + propertyCondition + '\
                  GROUP BY itemId\
                  HAVING COUNT( propertyId ) = ' + propertyCount + ' ) ';
          conditionInjection += ' ) ';        
      }

    }
    catch ( error )  {
      logRequest( error );
      //serverSideError( request, response )
    }

    querySQL = querySQL.replace( 'conditionInjection', conditionInjection );

    makeResponseOnDBData( querySQL, request, response );
}
//-----------------------------------------------------------------------------
function decodeQuotes( inputString ) {
  return inputString.replace( /%22/g, '"' );
}
//-----------------------------------------------------------------------------
function constructSQLCondition( queryString, mask ) {
  var conditionString = '';
  var filterObject = {};
  var propertyValue;
  var valueIndex;
  var firstValue;
  var firstCondition = true;

  if( queryString == '' )
    return conditionString;
  try {
    filterObject = JSON.parse( queryString );  
  }
  catch ( error ) {
    logRequest( "Unable to parse query string: " + queryString );
    return conditionString;
  }
  if( Object.keys( filterObject ).length > 0 ) {
    conditionString  = ' WHERE ( ';
    for( var property in filterObject ) {
      if( mask != undefined && property.indexOf( mask ) < 0)
        continue;
      propertyValue = filterObject[ property ];
      if( !firstCondition )
          conditionString += ' AND ';
      if( propertyValue instanceof Array ) {
          firstValue = true;
          conditionString += '(';
          for( valueIndex in propertyValue ) {
            if( !firstValue )
              conditionString += ' OR ';   
            conditionString += cleanPrefix( property ) + 
                               propertyCompareSign( property ) + 
                               convertToSQLValue( propertyValue[ valueIndex ], property );
            firstValue = false;
          }
          conditionString += ')';
      }
      else {        
        conditionString += '(' + cleanPrefix( property ) + 
                                 propertyCompareSign( property ) + 
                                 convertToSQLValue( propertyValue, property ) + ')';
      }
      firstCondition = false;
    }
    conditionString += ' ) ';
  }
  if( conditionString == ' WHERE (  ) ' ) {
    conditionString = '';
  }
  return conditionString;
}
//-----------------------------------------------------------------------------
function convertToSQLValue( propertyValue, propertryName ) {
  if( typeof propertyValue == 'number' ) 
      return propertyValue;
  if( typeof propertyValue == 'string' ) {
    propertyValue = propertyValue.replace( /%20/g, ' ' );     
    if( propertryName.indexOf( 'name' ) >= 0 ) 
      return '\'%' + propertyValue + '%\'';     
    else  
      return '\'' + propertyValue + '\''; 
  }  
  else  
      return '\'' + propertyValue + '\''; 
}
//-----------------------------------------------------------------------------
function cleanPrefix( propertryName ) {
  propertryName = propertryName.replace( 'low', '' );
  propertryName = propertryName.replace( 'high', '' );
  propertryName = propertryName.replace( PROPERTY_TABLE_PREFIX, '' );
  propertryName = propertryName.replace( ITEM_TABLE_PREFIX, '' );
  return propertryName;
}
//-----------------------------------------------------------------------------
function propertyCompareSign( propertryName ) {
  if( propertryName.indexOf( 'name' ) >= 0 )
    return ' LIKE ';
  else if( propertryName.indexOf( 'low' ) >= 0 )
    return ' >= ';
  else if( propertryName.indexOf( 'high' ) >= 0 )
    return ' <= ';
  else
    return ' = ';  
}
//-----------------------------------------------------------------------------
function logRequest( url,message ) {
  if( DEBUG_MODE )
	 console.log( '' + ( new Date() ).toLocaleString() + ' url: ' + url + ' processed ' + message );
}
//-----------------------------------------------------------------------------