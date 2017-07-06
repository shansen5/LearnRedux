var redux = require( 'redux' );

console.log( 'Starting redux example' );

var actions = require ( './actions/index' );
var store = require( './store/configureStore' ).configure();

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

store.dispatch( actions.fetchLocation() );

store.dispatch( actions.changeName( 'Steve' ));

// unsubscribe();

store.dispatch( actions.addHobby( 'Running' ));

store.dispatch( actions.addMovie( 'Marathon Man', 'Drama' ));

store.dispatch( actions.addMovie( 'Star Wars', 'Science Fiction' ));

store.dispatch( actions.addHobby( 'Woodworking' ));

store.dispatch( actions.addMovie( 'Maltese Falcon', 'Detective' ));

store.dispatch( actions.removeHobby( 2 ));

store.dispatch( actions.changeName( 'Karen' ));

store.dispatch( actions.removeMovie( 1 ));