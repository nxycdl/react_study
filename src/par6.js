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
                <h3>0</h3>
            </div>
        );
    }
}


React.render(<Count />,document.getElementById('content'));