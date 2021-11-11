
import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

export class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      searchResults:[
        {name:'Dreamy Night',
        artist:'Lilypichu',
        album:'NightTime',
        id:'69'}],

      playlistName:'Name',

      playlistTracks:[{name:'Dreamy Night',
        artist:'Lilypichu',
        album:'NightTime',
        id:'69'}]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this)
  }

  addTrack(track){
    const hasID = (curr) => curr.id === track.id;

    if (this.state.playlistTracks.some(hasID)) {
      let temp = this.state.playlistTracks.concat([track]);
      this.setState({playlistTracks:temp});
    }
  }
  removeTrack(track){
    const temp = this.state.playlistTracks.filter(curr => curr.id === track.id);
    this.setState({playlistTracks:temp});
  }
  updatePlaylistName(name){
    this.setState({playlistName:name})
  }
  savePlaylist(){
    const uri = this.state.playlistTracks.map(track => track.uri);
  }
  search(term){
    console.log(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onAdd={this.addTrack} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}
