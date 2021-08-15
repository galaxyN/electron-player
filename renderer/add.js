const { ipcRenderer } = require('electron');
const path = require('path');
const { $ } = require('./helper');

$('select-music').addEventListener('click',() => {
    ipcRenderer.send('open-music-file');
});

let musicFilesPath = [];
$('add-music').addEventListener('click',() => {
    ipcRenderer.send('add-tracks',musicFilesPath);
})

const renderListHtml = (paths) => {
    const musicList = $('musicList');
    const musicItemsHTML = paths.reduce((html,music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html;
    },'');
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`;
}

ipcRenderer.on('selected-file',(event,path) =>{
    if(Array.isArray(path)){
        musicFilesPath = path;
        renderListHtml(path);
    }
})