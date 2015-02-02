/**
 * Created by vigneshm on 01/02/15.
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var util = require('../public/javascripts/parseutil.js');
router.get('/', function(req, res, next) {
    var rows={};
    getrows({
        contestid:374,
        from:1,
        count:5,
        showUnofficial:false
    },function(row){
        rows=row;
        util.basic(rows);
        res.send(rows);
    });


});
router.post('/', function (req,res) {
    console.log(req.body);
    if(req.body.url){
        console.log(getdata(req.body.url,function(val){
            res.send(val);
        }))
    }
    else
        res.end('no');
});
function getrows(options,callback){
    var contestid = typeof options.contestid !== 'undefined' ? options.contestid : 374;
    var from = typeof options.from !== 'undefined' ? options.from : 1;
    var count = typeof options.count !== 'undefined' ? options.count : 5;
    var showUnofficial = typeof options.showUnofficial !== 'undefined' ? options.showUnofficial : true;
    var url="http://codeforces.com/api/contest.standings?contestId="+contestid+"&from="+from+"&count="+count+"&showUnofficial="+showUnofficial;
    var obj={};
    getdata(url,function(val){
        obj=JSON.parse(val);
        callback(obj.result.rows);
    });
}
function getdata(url,callback){
    var value="";
    http.get(url, function(resp){
        resp.setEncoding('utf-8');

        resp.on('data', function(chunk){
            value=value+chunk;
        });
        resp.on('end',function(){
            return callback(value);
        })

    }).on("error", function(e){
        console.log("Got error: " + e.message);
    });
}
function getuser(handle){

}
module.exports = router;