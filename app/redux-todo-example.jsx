var redux = require( 'redux' );

console.log( 'Starting redux todo example' );

var reducer = ( state = { 
    searchText: '',
    showCompleted: false,
    todos: [] 
    }, action ) => {
    // state = state || { name: 'Anonymous' };  ES5 way
    return state;
};

var store = redux.createStore( reducer );

var currentState = store.getState();
console.log( 'currentState', currentState );