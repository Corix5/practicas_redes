'use strict'
const fs = require('fs');

var http = require('http').createServer(webServer),
form = require('fs').readFileSync('./index.html'),
querystring = require('querystring'),
util = require('util'),
dataString = '',
dataStringPut = '',
dataStringDelete = '';



function webServer(req,res){
    if(req.method == 'GET'){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(form);
        console.log(req.headers);
    }

    if(req.method == 'POST'){
        req
            .on('data', function(data){
                dataString += data;
        })
        .on('end', function(){
            var templateString = `Los datos que se enviaron por POST son: ${dataString}`;
            console.log(templateString);
            res.end(templateString);
            console.log(req.headers);
        })
    }

    if(req.method == "PUT"){
        req
            .on('data', function(data){
                dataStringPut += data;
        })
        .on('end', function(){
            var templateStringPut = `${dataStringPut}`;
            console.log("Ejecutando método PUT...");
            console.log(req.headers);
            res.end(function(){ 
                fs.writeFileSync("archivo.txt", templateStringPut);
            });
        } )
    }

    if(req.method == "DELETE"){
        req
            .on('data', function(data){
                dataStringDelete += data;
        })
        .on('end', function(){
            var templateStringDelete = `${dataStringDelete}`;
            console.log("Ejecutando método DELETE...");
            console.log(req.headers);
            res.end(function(){ 
                fs.unlinkSync(`./${templateStringDelete}`);
            });
        } )

    }
}

http.listen(3000);

console.log('Servidor corriento en localhost:3000');