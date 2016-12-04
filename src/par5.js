/**
 * Created by dl on 2016-12-01.
 */
var Hellworld = React.createClass({
    render:function() {
        return <h1>Hello world {this.props.tel}</h1>
    }
});

ReactDOM.render(
    <Hellworld tel="12895652926"/>,
    document.getElementById('content')
)