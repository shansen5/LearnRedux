var redux = require( 'redux' );

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

var reducer = redux.combineReducers( {
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer
});

var store = redux.createStore( reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f 
) );

// Subscribe to changes.
var unsubscribe = store.subscribe( () => {
    var state = store.getState();
    console.log( 'Name is', state.name );
    document.getElementById( 'app' ).innerHTML = state.name;
})

var currentState = store.getState();
console.log( 'currentState', currentState );

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