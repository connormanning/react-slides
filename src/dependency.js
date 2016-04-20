var React = require('react');
var Row = require('./row');

var Dependency = React.createClass({
    getInitialState: function() {
        return {
            enabled: true,
            newOption: '',
            options: ['default'],
            selected: 'default'
        }
    },
    render: function() {
        var options = this.state.options.map((v, i) => {
            return <option value={ v } key={ i }>{ v }</option>;
        });

        return <div className='form-group'>
            <p>New option</p>
            <div className='input-group'>
                <input
                    className='form-control'
                    type='text'
                    value={ this.state.newOption }
                    onChange={ this.setNewOption }
                />
                <span className='input-group-btn'>
                    <button
                        className='btn btn-default center-block'
                        onClick={ this.pushNewOption }
                    >
                        Add option
                    </button>
                </span>
            </div>
            <p>Enable dropdown?</p>
            <input
                className='form-control'
                type='checkbox'
                checked={ this.state.enabled }
                onChange={ this.toggleEnable }
            />
            <select
                className='form-control'
                disabled={ !this.state.enabled }
                value={ this.state.selected }
                onChange={ (e) => this.setState({ selected: e.target.value }) }
            >
                { options }
            </select>
        </div>;
    },
    setNewOption: function(e) {
        this.setState({ newOption: e.target.value });
    },
    pushNewOption: function() {
        var toAdd = this.state.newOption;
        var newOptions = this.state.options.concat(toAdd);

        this.setState({
            options: newOptions,
            newOption: '',
            selected: toAdd
        });
    },
    toggleEnable: function() {
        this.setState({ enabled: !this.state.enabled });
    }
});

module.exports = Dependency;

