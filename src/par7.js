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
        console.log(commentNode) ;
        return(
            <div className="comment-list">
                {commentNode}
            </div>
        );
    }
}



class CommentForm extends React.Component{
    render(){
        return(
            <div className="comment-form">
                CommentForm
            </div>
        );
    }
}

var comments =[
    {author:"L1",body :"This is my Comments"},
    {author:"L12",body :"This is my Comments2"},
    {author:"L13",body :"This is my Comments3"},
    {author:"L14",body :"This is my Comments4"}
];

class CommentBox extends React.Component{

    constructor(props){
        super();
        this.state ={
            comments :props.commentspro
        }
    }

    loadDataFormServer(){
        $.ajax({
            url:"../src/comment.json",
            dataType:"json",
            success:function(comments){
                console.log('ajax');
                console.log(comments);
            },
            error:function(){}
        });
    }
    componentDidMount(){
        console.log('ComponentDisMount');
        this.loadDataFormServer();
    }
    render(){
        return(
            <div className="comment-box">
                <h1>Comments</h1>
                <CommentList comments={this.state.comments}/>
                <CommentForm/>
            </div>
        );
    }
}

var box = ReactDOM.render(<CommentBox commentspro={comments}/>,document.getElementById('content'));
