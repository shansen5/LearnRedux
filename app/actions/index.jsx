var axios = require( 'axios' );

export var changeName = ( name ) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
}

export var addHobby = ( hobby ) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    }
}

export var removeHobby = ( id ) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    }
}

export var addMovie = ( movie, genre ) => {
    return {
        type: 'ADD_MOVIE',
        movie,
        genre
    }
}

export var removeMovie = ( id ) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
}

export var startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
}

export var completeLocationFetch = ( url ) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
}

// This requires thunk library, because function returned instead of object
export var fetchLocation = () => {
    return( dispatch, getState ) => {
        dispatch( startLocationFetch() );
        axios.get( 'http://ipinfo.io' ).then( function ( response ) {
            var location = response.data.loc;
            var baseUrl = 'http://maps.google.com?q=';

            dispatch( completeLocationFetch( baseUrl + location ));
        })
    }
}