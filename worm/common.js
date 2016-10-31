function getStyle(obj,attr) {
    var value;
    if(obj.currentStyle){
        value = obj.currentStyle[atrr];
    }else{
        value=window.getComputedStyle(obj,false)[attr];
    }
    if (attr=="opacity"){
        value=Math.floor(value*100);
    }else{
        value=parseInt(value);
    }
    if(isNaN(value)){
        value=0;
    }
    return value;
}

function move(obj,attr,target,span) {
    clearInterval(obj.timer);
        if(!span){
            span=500;
        }
        obj.timer=setInterval(function () {
            var icur=getStyle(obj,attr);
            var step=(target-icur)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            //console.log(step+" "+icur);
 

            if(icur!=target){
                if(attr=="opacity"){
                    obj.style[attr]=(icur+ step)/100;

                }else{
                    obj.style[attr]=icur+step+"px";
                }
            }else{
                clearInterval(obj.timer);
            }
        },span);
    }

function move1(obj,attr,target,fn,span) {
    clearInterval(obj.timer);
    if(!span){
        span=500;
    }
    obj.timer=setInterval(function () {
        var icur=getStyle(obj,attr);
        var step=(target-icur)/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        //console.log(step+" "+icur);


        if(icur!=target){
            if(attr=="opacity"){
                obj.style[attr]=(icur+ step)/100;

            }else{
                obj.style[attr]=icur+step+"px";
            }
        }else{
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },span);
}

//使用JSON对象同时改变多个属性
function move2(obj,json,fn,span) {
    clearInterval(obj.timer);
    if(!span){
        span=10;
    }
    var flag=false;
    obj.timer=setInterval(function () {
        for(var attr in json){
            flag=true;
            var target=json[attr];
            var icur=getStyle(obj,attr);
            var step=(target-icur)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            //console.log(step+" "+icur);

            if(icur!=target){
                flag=false;
                if(attr=="opacity"){
                    obj.style[attr]=Math.ceil((icur+ step)/100);

                }else{
                    obj.style[attr]=icur+step+"px";
                }
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },span);
}