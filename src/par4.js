var HelloMessage = React.createClass({
    render: function() {
        return <h1>Hello {this.props.name}</h1>;
    }
});

ReactDOM.render(
    <HelloMessage name="John" />,
    document.getElementById('example')
);

ReactDOM.render(
    <h1>ReactDom.render第一个参数是一个html标签,或是通过React创建的一个Class类</h1>,
    document.getElementById('example2')
);

ReactDOM.render(
    <h1>第二个是插入的dom节点</h1>,
    document.getElementById('example3')
);