class Count extends React.Component{
    constractor(){
        this.state ={count:0}
    }
    update(){
        this.setState({
            count: ++ this.state.count
        });

    }
    render(){
        return (
            <div>
                <h1>Count</h1>
                <h3>XXX</h3>
            </div>
        );
    }
}


var count = React.render(<Count name="你好"/>,document.getElementById('content'));