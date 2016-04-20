var React = require('react');
var Row = require('./row');
var Highlight = require('react-highlight');

var Code = React.createClass({
    render: function() {
        var language = this.props.language || 'javascript'
        return <Highlight className={ language }>
                { this.props.children }
            </Highlight>;
    }
});

module.exports = Code;

