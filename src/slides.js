var React = require('react');
var Code = require('./code');
var Row = require('./row');

var Timer = require('./timer');
var Dependency = require('./dependency');
var KeyVal = require('./keyval');

var slides = [
    <h2>An introduction</h2>,

    <div>
        <h2>What is it?</h2>
        <p>A <strong>view</strong> layer - nothing else</p>
    </div>,

    <div>
        <h2>Why?</h2>
        <ul>
            <li>HTML as actual code</li>
            <li>DRY - reusable/tweakable components</li>
        </ul>
    </div>,

    <div>
        <h2>Why?</h2>
        <ul>
            <li>Dependency management across DOM elements</li>
            <ul>
                <li>No need to remember to update HTML elements in response to change elsewhere</li>
                <li>E.g. a table which can have rows added - elsewhere a count displayed of # of rows in the table</li>
                <ul><li>User adds table row, must remember to update the count -> tedious and error-prone</li></ul>
            </ul>
            <li>Locally managed scope/state for dynamic pages</li>
            <ul>
                <li>Because fuck global jQuery selectors</li>
                <li><Code>{
                    "$('#SomePseudoNamespace-MyNestedArea-MySpecificTable tr:last')" +
                    ".after('<tr>...</tr><tr>...</tr>');"
                }</Code></li>
                <li>
                    <a href='https://stackoverflow.com/questions/171027/add-table-row-in-jquery'>
                        Really?
                    </a>
                </li>
            </ul>
        </ul>
    </div>,

    <div>
        <h2>Differences vs. competitors</h2>
        <ul>
            <li>One-way data flow (in general)</li>
            <ul>
                <li>I.e. no two-way data binding</li>
            </ul>
            <li>A focus on immutability</li>
            <li>Lightweight - not an MVC</li>
        </ul>
    </div>,

    <h2>What does it look like?</h2>,

    <div>
        <h2>The HTML portion is pretty simple...</h2>
        <Code language='html'>{
            '<!doctype html>\n' +
            '<html>\n' +
            '  <head>\n' +
            '    <title>React.js slides</title>\n' +
            '  </head>\n' +
            '  <body>\n' +
            '    <div id="app"></div>\n' +
            '    <script src="my-stuff-in-react.js"></script>\n' +
            '  </body>\n' +
            '</html>'
        }</Code>
    </div>,

    <div>
        <h2>The base javascript:</h2>
        <Code language='jsx'>{
            'var React = require("react");\n' +
            'var ReactDom = require("react-dom");\n' +
            '\n' +
            '// Here\'s an HTML component.  It\'s a pretty simple one.\n' +
            'var App = React.createClass({\n' +
            '    render: function() {\n' +
            '        return <h1>Aha!  I\'m rendering!</h1>;\n' +
            '    }\n' +
            '});\n' +
            '\n' +
            '// Render this component into our application div from before.\n' +
            'ReactDom.render(<App/>, document.getElementById("app"));'
        }</Code>
        <p className='text-muted'>- CSS-specific classes/components are excluded throughout this presentation</p>
    </div>,

    <div>
        <h2>Components</h2>
    </div>,

    <div>
        <h2>Something more dynamic</h2>
        <h3>The component:</h3>
        <Timer/>
        <h3>The code:</h3>
        <Code language='jsx'>{
            'var Timer = React.createClass({\n' +
            '    getInitialState: function() {\n' +
            '        return { t: 0 };\n' +
            '    },\n' +
            '    render: function() {\n' +
            '        return <div>\n' +
            '            <h3>I time things!</h3>\n' +
            '            <p>{ this.state.t }</p>\n' +
            '        </div>;\n' +
            '    },\n' +
            '    componentDidMount: function() {\n' +
            '        var queue = () => {\n' +
            '            setTimeout(() => {\n' +
            '                var t = this.state.t;\n' +
            '                this.setState({ t: t + 1 });\n' +
            '                queue();\n' +
            '            }, 1000);\n' +
            '        };\n' +
            '\n' +
            '        queue();\n' +
            '    }\n' +
            '});'
        }</Code>
    </div>,

    <div>
        <h2>Using a custom component</h2>
        <h3>The code:</h3>
        <Code language='jsx'>{
            '<h1>I\'m an example!</h1>\n' +
            '<Timer/>   // The component from the previous slide.\n' +
            '<p>I\'m sample text!</p>'
        }</Code>
        <h3>The result:</h3>
        <div>
            <h1>I'm an example!</h1>
            <Timer/>
            <p>I'm sample text!</p>
        </div>
    </div>,

    <div>
        <h2>How about some dependencies</h2>
        <Dependency/>
    </div>,

    <div>
        <Code language='jsx'>{
            'var Dependency = React.createClass({\n' +
            '    getInitialState: function() {\n' +
            '        return { ' +
                         'enabled: true, ' +
                         'textData: "", ' +
                         'options: ["default"], ' +
                         'selected: "default" ' +
                     '};\n' +
            '    },\n' +
            '    render: function() {\n' +
            '        var options = this.state.options.map((v) => {\n' +
            '            return <option value={ v }>{ v }</option>;\n' +
            '        });\n' +
            '\n' +
            '        return <div>\n' +
            '            <p>New option</p>\n' +
            '            <input ' +
                             'type="text" ' +
                             'value={ this.state.textData } ' +
                             'onChange={ this.setNewOption }' +
                         '/>\n' +
            '            <button onClick={ this.pushNewOption }>' +
                             'Add option' +
                         '</button>\n' +
            '\n' +
            '            <p>Enable dropdown?</p>\n' +
            '            <input ' +
                             'type="checkbox" ' +
                             'checked={ this.state.enabled } ' +
                             'onChange={ this.toggleEnable }' +
                         '/>\n' +
            '            <select ' +
                             'disabled={ !this.state.enabled } ' +
                             'value={ this.state.selected }' +
                         '/>\n' +
            '                { options }\n' +
            '            </select>\n' +
            '        </div>;\n' +
            '    },\n' +
            '    setNewOption: function(e) {\n' +
            '        this.setState({ textData: e.target.value });\n' +
            '    },\n' +
            '    pushNewOption: function() {\n' +
            '        var toAdd = this.state.textData;\n' +
            '        var textDatas = this.state.options.concat(toAdd);\n' +
            '\n' +
            '        this.setState({\n' +
            '            options: textDatas,\n' +
            '            textData: "",\n' +
            '            selected: toAdd\n' +
            '        });\n' +
            '    },\n' +
            '    toggleEnable: function() {\n' +
            '        this.setState({ enabled: !this.state.enabled });\n' +
            '    }\n' +
            '});'
        }</Code>
    </div>,

    <h2>Reusable components</h2>,

    <div>
        <h2>A table:</h2>
        <KeyVal header={ ['One', 'Two'] } body={ [['a', 'b'], [1, 2]] }/>
    </div>,

    <div>
        <h2>A table: HTML</h2>
        <KeyVal header={ ['One', 'Two'] } body={ [['a', 'b'], [1, 2]] }/>
        <Code language='html'>{
            '<table class="table keyval">\n' +
            '    <thead>\n' +
            '        <tr>\n' +
            '            <th>One</th>\n' +
            '            <th>Two</th>\n' +
            '        </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '        <tr>\n' +
            '            <td>a</td>\n' +
            '            <td>b</td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td>1</td>\n' +
            '            <td>2</td>\n' +
            '        </tr>\n' +
            '    </tbody>\n' +
            '</table>'
        }</Code>
    </div>,

    <div>
        <h2>A table: React</h2>
        <KeyVal header={ ['One', 'Two'] } body={ [['a', 'b'], [1, 2]] }/>
        <Code language='jsx'>{
            '<KeyVal header={ ["One", "Two"] } body={ [["a", "b"], [1, 2]] }/>'
        }</Code>
    </div>,

    <div>
        <h2>The component - a contrived key-value display</h2>
        <Code language='jsx'>{
            'var Header = React.createClass({\n' +
            '    render: function() {\n' +
            '        return <thead>\n' +
            '            <tr>\n' +
            '                <th>{ this.props.data[0] }</th>\n' +
            '                <th>{ this.props.data[1] }</th>\n' +
            '            </tr>\n' +
            '        </thead>;\n' +
            '    }\n' +
            '});\n' +
            '\n' +
            'var Body = React.createClass({\n' +
            '    render: function() {\n' +
            '        var rows = this.props.data.map((row, i) => {\n' +
            '            return <tr key={ i }>\n' +
            '                <td>{ row[0] }</td><td>{ row[1] }</td>\n' +
            '            </tr>;\n' +
            '        });\n' +
            '\n' +
            '        return <tbody>{ rows }</tbody>;\n' +
            '    }\n' +
            '});\n' +
            '\n' +
            'var KeyVal = React.createClass({\n' +
            '    render: function() {\n' +
            '        var header = this.props.header;\n' +
            '        var body = this.props.body;\n' +
            '\n' +
            '        return <table>\n' +
            '            { header ? <Header data={ header }/> : null }\n' +
            '            <Body data={ body }/>\n' +
            '        </table>;\n' +
            '    }\n' +
            '});'
        }</Code>
    </div>,

    <div>
        <h2>Other cool stuff</h2>
        <ul>
            <li><strong>Hto rleoadgni</strong> in real time</li>
            <ul>
                <li className='text-muted'>TODO: Fix typo in real time!</li>
                <li>Injection of altered elements - state is not lost</li>
                <li>Not an auto-page-reload</li>
            </ul>
            <li>Wide support</li>
            <ul>
                <li>
                    <a href='http://www.material-ui.com/#/components/time-picker'>
                        Google Material UI
                    </a>
                </li>
                <li>
                    <a href='https://jedwatson.github.io/react-select/'>
                        Random components
                    </a>
                </li>
                <li>
                    <a href='https://react.parts/web'>
                        Various registries
                    </a>
                </li>
            </ul>
            <li>Can dynamically render to static HTML on the server (like templates).</li>
            <li>Client-side routing (previous stuff was all SPA-style)</li>
            <ul>
                <li>Server can be 100% RESTful - presenting an API only</li>
                <li>'Dynamic' HTML is fully static on the server side</li>
                <li>The dynamic portion occurs on the client</li>
            </ul>
        </ul>
    </div>,

    <div>
        <h2>Client-side routing pseudo-example</h2>
        <Code language='jsx'>{
        'var Router = require("react-router");\n' +
        '\n' +
        'var Switcher = React.createClass({\n' +
        '    getInitialState: function() {\n' +
        '        return { user: undefined };\n' +
        '    },\n' +
        '    render: function() {\n' +
        '        if (this.state.user === undefined) return <LoadingWidget/>;\n' +
        '        else if (this.state.user === null) this.props.history.push("/login");\n' +
        '        else this.props.history.push("/profile");\n' +
        '    },\n' +
        '    componentDidMount: function() {\n' +
        '        ajax("get", "http://my-server.com/whoami")\n' +
        '        .then((res) => {\n' +
        '            this.setState({ user: res.user || null });\n' +
        '        });\n' +
        '    }\n' +
        '});\n' +
        '\n' +
        'var Routes = React.createClass({\n' +
        '    render: function() {\n' +
        '        return <Router>\n' +
        '            <Route path="/">\n' +
        '                <IndexRoute component={ Switcher }/>\n' +
        '                <Route path="about" component={ About }/>\n' +
        '                <Route path="login" component={ Login }/>\n' +
        '                <Route path="signup" component={ Signup }/>\n' +
        '                <Route path="profile" component={ Profile }/>\n' +
        '                <Route path="data/:user/:resource" component={ Viewer }/>\n' +
        '                <Route path="*" component={ Switcher }/>\n' +
        '            </Route>\n' +
        '        </Router>;\n' +
        '    }\n' +
        '});'
        }</Code>
    </div>,

    <h2>Fin.</h2>
];

module.exports = slides;

