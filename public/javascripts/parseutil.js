/**
 * Created by vigneshm on 01/02/15.
 */
function getbasic(row){
    for(var i=0;i<row.length;i++){
        var handle=row[i].party.members[0].handle;
        var rank=row[i].rank;
        var points=row[i].points;

        console.log(handle+" "+rank+" "+points);
    }
}
module.exports ={
    basic:getbasic
}