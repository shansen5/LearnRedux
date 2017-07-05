var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var { Route, Router, IndexRoute, hashHistory } = require( 'react-router' );

// Load foundation
require( 'style!css!sass!foundation-sites/dist/foundation.min.css');
$(document).foundation();

require( 'style!css!sass!applicationStyles' );

ReactDOM.render( 
    <p>Boilerplate 3 Project</p>,
    document.getElementById( "app" )
);

require( './redux-example.jsx' );
// require( './redux-todo-example.jsx' );