var React = require('react');

var Header = React.createClass({
    render: function() {
        return <thead>
            <tr>
                <th>{ this.props.data[0] }</th>
                <th>{ this.props.data[1] }</th>
            </tr>
        </thead>;
    }
});

var Body = React.createClass({
    render: function() {
        var rows = this.props.data.map((row, i) => {
            return <tr key={ i }>
                <td>{ row[0] }</td>
                <td>{ row[1] }</td>
            </tr>;
        });

        return <tbody>
            { rows }
        </tbody>;
    }
});

var KeyVal = React.createClass({
    render: function() {
        var header = this.props.header;
        var body = this.props.body;

        if (header) {
            if (!Array.isArray(header)) throw 'Bad header type';
            if (header.length != 2) throw 'Bad header length';
        }

        if (body) {
            if (!body.every((v) => v.length == 2)) {
                throw 'Bad data row length';
            }
        }

        return <table className='table'>
            { header ? <Header data={ header }/> : null }
            <Body data={ body }/>
        </table>;
    }
});

module.exports = KeyVal;

