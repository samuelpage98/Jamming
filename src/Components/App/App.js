import React from 'react';
import './App.css';
import SearchBar  from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import Loader from '../Loader/Loader';


class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.isLoading = this.isLoading.bind(this);

    this.state = {searchResults: [],
    playlistName: 'Enter Playlist Name',
    playlistTracks: [],
    loadingStyle: {visibility: 'hidden'}
  }
  }

  componentWillMount() {
    Spotify.getAccessToken()
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
    this.state.playlistTracks.push(track)
    this.setState({playlistTracks: this.state.playlistTracks})
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      let index = this.state.playlistTracks.indexOf(track);
      this.state.playlistTracks.splice(index, 1);
      this.setState({playlistTracks: this.state.playlistTracks})
    } 
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    const TrackURIs = this.state.playlistTracks.map(trackURI => {
      return trackURI.uri;
    })
    // Spotify.getAccessToken()
    Spotify.savePlaylist(this.state.playlistName, TrackURIs)
  }

  search(searchTerm) {
    // Spotify.getAccessToken()
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  isLoading() {
    this.setState({loadingStyle: {visibility: 'visible'}})
    setTimeout(() => {
      this.setState({loadingStyle: {visibility: 'hidden'}})}, 1500
    )
  }
  
  render() {
    
      
      /*if (this.state.loading)*/ return(
         
         <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
              <SearchBar onSearch={this.search}/>
              <Loader isLoading={this.state.loadingStyle}/>
              <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} /> 
                <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} isLoading={this.isLoading}/>
              </div>
            </div>
          </div>
      )
  }
}

export default App;
