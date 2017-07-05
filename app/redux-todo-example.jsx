var redux = require( 'redux' );

console.log( 'Starting redux todo example' );

var reducer = ( state = { 
        searchText: '',
        showCompleted: false,
        todos: [] 
    }, action ) => {
        switch( action.type ) {
            case 'CHANGE_SEARCH_TEXT':
                return {
                    ...state,
                    searchText: action.searchText
                }
            default:
                return state;
        }
};

var store = redux.createStore( reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f 
));

// Subscribe to changes.
var unsubscribe = store.subscribe( () => {
    var state = store.getState();
    document.getElementById( 'app' ).innerHTML = state.searchText;
})

var currentState = store.getState();
console.log( 'currentState', currentState );

store.dispatch( {
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'boo'
});