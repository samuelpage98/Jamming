import React from 'react';

function ShowDetail(props) {
  return (
      <div className='loadingContainer' style={props.isLoading}>
          <div className='center'>
              <i className="fa fa-cog fa-spin" />
          </div>
            <p className='loaderText'>Playlist is being saved.</p>
      </div>
   
  );
}

export default ShowDetail;
