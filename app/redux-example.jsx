var redux = require( 'redux' );
var axios = require( 'axios' );

console.log( 'Starting redux example' );

var nextHobbyId = 1;
var nextMovieId = 1;

// Name reducer and action generators
// --------------------------
var nameReducer = ( state = 'Anonymous', action ) => {
    switch( action.type ) {
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }
}

var changeName = ( name ) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
}

// Hobby reducer and action generators
// --------------------------
var hobbiesReducer = ( state = [], action ) => {
    switch( action.type ) {
        case 'ADD_HOBBY':
            return [
                ...state,
                {
                    id: nextHobbyId++,
                    hobby: action.hobby
                }
            ]
        case 'REMOVE_HOBBY':
            return  state.filter( (hobby) => hobby.id !== action.id )
        default:
            return state;
    }
}

var addHobby = ( hobby ) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    }
}

var removeHobby = ( id ) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    }
}

// Movie reducer and action generators
// --------------------------
var moviesReducer = ( state = [], action ) => {
    switch( action.type ) {
        case 'ADD_MOVIE':
            return [
                ...state,
                {
                    id: nextMovieId++,
                    movie: action.movie
                }
            ]
        case 'REMOVE_MOVIE':
            return  state.filter( (movie) => movie.id !== action.id )
        default:
            return state;
    }
}

var addMovie = ( movie, genre ) => {
    return {
        type: 'ADD_MOVIE',
        movie,
        genre
    }
}

var removeMovie = ( id ) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
}

// Map reducer and action generators
// --------------------------
var mapReducer = ( state = { isFetching: false, url: undefined }, action ) => {
    switch( action.type ) {
        case 'START_LOCATION_FETCH':
            return {
                isFetching: true,
                url: undefined
            }
        case 'COMPLETE_LOCATION_FETCH':
            return {
                isFetching: false,
                url: action.url
            }
        default:
            return state;
    }
};

var startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
}

var completeLocationFetch = ( url ) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
}

var fetchLocation = () => {
    store.dispatch( startLocationFetch() );
    axios.get( 'http://ipinfo.io' ).then( function ( response ) {
        var location = response.data.loc;
        var baseUrl = 'http://maps.google.com?q=';

        store.dispatch( completeLocationFetch( baseUrl + location ));
    })
}

var reducer = redux.combineReducers( {
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
});

var store = redux.createStore( reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f 
) );

// Subscribe to changes.
var unsubscribe = store.subscribe( () => {
    var state = store.getState();
    if ( state.map.isFetching ) {
        document.getElementById( 'app' ).innerHTML = 'Loading...';
    } else if ( state.map.url ) {
        document.getElementById( 'app' ).innerHTML = 
                '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
    }
})

var currentState = store.getState();
console.log( 'currentState', currentState );

fetchLocation();

store.dispatch( changeName( 'Steve' ));

// unsubscribe();

store.dispatch( addHobby( 'Running' ));

store.dispatch( addMovie( 'Marathon Man', 'Drama' ));

store.dispatch( addMovie( 'Star Wars', 'Science Fiction' ));

store.dispatch( addHobby( 'Woodworking' ));

store.dispatch( addMovie( 'Maltese Falcon', 'Detective' ));

store.dispatch( removeHobby( 2 ));

store.dispatch( changeName( 'Karen' ));

store.dispatch( removeMovie( 1 ));