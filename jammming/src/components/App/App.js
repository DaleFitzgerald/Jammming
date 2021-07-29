import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  
  addTrack(track) {
    let trackPlayList = false;
    this.state.playlistTracks.forEach(playlistTrack => {
      if (playlistTrack.id === track.id) {
        trackPlayList = true;
        }
      }
    );
    if (!trackPlayList) {
        let updatePlaylist = this.state.playlistTracks;
        updatePlaylist.push(track);
        this.setState({playlistTracks: updatePlaylist});
      }
    }
    
    
    removeTrack(track) {
      let updatePlaylist = this.state.playlistTracks.filter(playlistTrack => {
        return playlistTrack.id !== track.id;
      });
      this.setState({playlistTracks: updatePlaylist});
    }
    
    
    updatePlaylistName(name) {
      this.setState({ playlistName: name });
    }
    
    savePlaylist() {
      let trackURIs = [];
      this.state.playlistTracks.forEach(playlistTrack => {
        trackURIs.push(playlistTrack.uri);
      });
      Spotify.savePlaylist(this.state.playlistName, trackURIs);
      this.setState({playlistTracks:[], playlistName: '', searchResults:[]});
    }
    
    search(term) {
      Spotify.search(term).then(searchResults => {
        this.setState({searchResults: searchResults});
      });
    }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        
        <div className="App">

          <SearchBar onSearch={this.search} />
          
          <div className="App-playlist">

            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>

        </div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <h4>Spotify Playlist Maker created by <a href="https://www.linkedin.com/in/dale-fitzgerald" rel="noreferrer">Dale Fitzgerald</a>.</h4>
      </div>
    );
  }

  componentDidMount() {
   window.addEventListener('load', () => {Spotify.getAccessToken()});
 }
}

export default App;
