var React = require('react');
var Row = require('./row');

var slides = require('./slides');

var Header = React.createClass({
    render: function() {
        return <Row>
            <div className='col-xs-12'>
                <h1 style={ { paddingTop: 20, paddingBottom: 40 } }>
                    React.js
                </h1>
            </div>
        </Row>
    }
});

var Slide = React.createClass({
    render: function() {
        return <Row>
            <Header/>
            { this.props.children }
        </Row>;
    }
});

var App = React.createClass({
    getInitialState: function() {
        return { i: 0 };
    },
    render: function() {
        return <div className='container'>
            <Slide>
                { slides[this.state.i] }
            </Slide>
        </div>;
    },
    componentDidMount: function() {
        $(document).keydown((e) => {
            var c = e.keyCode;
            var i = this.state.i;

            if (c == 37 && i > 0) {
                this.setState({ i: i - 1 });
            }
            else if (c == 39 && i < slides.length - 1) {
                this.setState({ i: i + 1 });
            }
        });
    }
});

module.exports = App;

