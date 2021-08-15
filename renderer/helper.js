exports.$ = (id)=>{
    return document.querySelector(`#${id}`);
};

exports.convertDuration = (time) =>{
    // 计算分钟
    let minutes = Math.floor(time / 60);
    minutes = minutes<10 ? '0'+minutes : minutes; //小于10，前面补0
    let second = Math.round(time) % 60;
    second = second<10 ? '0'+second : second;
    
    return minutes + ':' + second;
}