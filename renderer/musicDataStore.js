const Store = require('electron-store');
const { v4: uuidv4 } = require('uuid')
const path = require('path');

class DataStore extends Store {
    constructor(settings){
        super(settings)
        this.tracks = this.get('tracks') || [];
    }
    saveTracks(){
        this.set('tracks',this.tracks);
        return this;
    }
    getTracks(){
        return this.get('tracks') || []
    }
    addTracks(tracks){
        const trackWithPros = tracks.map(track => {
            return {
                id: uuidv4(),
                path: track,
                fileName: path.basename(track)
            }
        }).filter(track => {
            const currentTrackPath = this.getTracks().map(track => track.path);
            return currentTrackPath.indexOf(track) < 0;
        });
        this.tracks = [...this.tracks,...trackWithPros];
        return this.saveTracks();
    }
    deleteTrack(id){
        this.tracks = this.tracks.filter(track => track.id !== id);
        return this.saveTracks();
    }
}

module.exports = DataStore;