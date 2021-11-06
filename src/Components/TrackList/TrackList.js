import React from 'react';
import './TrackList.css'
import { Track } from '../Track/Track'

export class TrackList extends React.Component {
    render() {
        if (this.props.tracks && typeof this.props.tracks !== 'number'){
          return (
            <div className="TrackList">
                {this.props.tracks.map(track => {
                    return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
                })}
            </div>
        )
        } else{
            return null
        }
        
    }
}