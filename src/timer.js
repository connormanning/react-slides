var React = require('react');
var Row = require('./row');

var Timer = React.createClass({
    getInitialState: function() {
        return { t: 0, timeout: null };
    },
    render: function() {
        return <div className='panel panel-default' key={ Math.random() }>
            <Row>
                <h3 className='col-xs-12 text-center'>I time things!</h3>
                <p className='col-xs-12 text-center'>{ this.state.t }</p>
            </Row>
        </div>;
    },
    componentDidMount: function() {
        var queue = () => {
            var timeout = setTimeout(() => {
                var t = this.state.t;
                this.setState({ t: t + 1 });
                queue();
            }, 1000);

            this.setState({ timeout: timeout });
        };

        queue();
    },
    componentWillUnmount: function() {
        if (this.state.timeout) clearTimeout(this.state.timeout);
    }
});

module.exports = Timer;

