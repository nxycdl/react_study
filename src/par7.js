/**
 * Created by Administrator on 2016-12-04.
 */
class Comment extends  React.Component{
    render(){
        return(
            <div>
                <div className="comment-body">
                    {this.props.children}
                </div>
                <div className="comment-author">
                    -{this.props.author}
                </div>
            </div>
        );
    }
}
class CommentList extends React.Component{
    render(){
        var commentNode = this.props.comments.map(function (comment,index){
            return <Comment key={'coment-' +index} author={comment.author}>{comment.body}</Comment>
        });
        return(
            <div className="comment-list">
                {commentNode}
            </div>
        );
    }
}



class CommentForm extends React.Component{

    handleSubmit(e){

        e.preventDefault();
        const author = this.refs.author.getDOMNode().value.trim();
        const body = this.refs.body.getDOMNode().value.trim();
        const form = this.refs.form.getDOMNode() ;
        var comment ={
            author:author,
            body:body
        }
        this.props.onSubmit(comment);
        form.reset();

    }
    render(){
        return(
            <form className="comment-form" ref="form" onSubmit={(e)=>{this.handleSubmit(e)} }>
                <input type="text" placeholder="input name" ref="author"/>
                <input type="text" placeholder="input comments" ref="body"/>
                <input type="submit" value="add Comment"></input>
            </form>
        );
    }
}



class CommentBox extends React.Component{

    constructor(props){
        super();
        this.state ={
            comments :props.commentspro||[]
        }
    }

    loadDataFormServer(){
        $.ajax({
            url:this.props.url,
            dataType:"json",
            success:(comments) =>{
                this.setState({comments:comments});
            },
            error:(xhr,stater,err)=>{
                console.err(err.toString());
            }
        });
    }
    componentDidMount(){
        this.loadDataFormServer();
    }

    handleComment(comment){
        const comments = this.state.comments ;
        comments.unshift(comment) ;
        this.setState({commments:comments});
    }
    render(){
        return(
            <div className="comment-box">
                <h1>Comments</h1>
                <CommentList comments={this.state.comments}/>
                <CommentForm onSubmit={(comment)=> this.handleComment(comment)}/>
            </div>
        );
    }
}

var box = ReactDOM.render(<CommentBox url="../src/comment.json"/>,document.getElementById('content'));
