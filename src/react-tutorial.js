/**
 * Created by Administrator on 2016-12-04.
 */

var CommentList = React.createClass({
    render:function(){
        var data = this.props.data || [];
        var commentNode = data.map((comment)=>{
            return (
                <Comment key={comment.key} author ={comment.author}  >
                    {comment.body}
                </Comment>
            );
        })
        return (
            <div className="comment-list">
                {commentNode}
            </div>
        );
    }
});

var CommentForm = React.createClass({

    getInitialState(){
        return {author:'',body:''};
    },
    handleAuthorChange:function(e){
        console.log('xxx');
        this.setState({author:e.target.value})
    },
    handleCommentChange:function(e){
        console.log('yyy');
        this.setState({body:e.target.value})
    },
    handleSubmit:function(){
        console.log('handleSubmit');
        var author = this.state.author.trim();
        var body = this.state.body.trim();

        if (!body || !author) {
            return;
        }
        var inputdata = {
            author:author,
            body:body
        }
        this.props.onCommentSubmit(inputdata);
        // TODO: send request to the server
        this.setState({author: '', body: ''});
    },
    render:function(){
        return(
            <form className="comment-form" ref="form" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="input your name" value={this.state.author}  onChange={this.handleAuthorChange} ref="author"/>
                <input type="text" placeholder="input your comment" value={this.state.body} onChange={this.handleCommentChange} ref="body"/>
                <input type="submit" value="commitx" ref="commitx"/>
            </form>
        );
    }
});

var Comment = React.createClass({

    rawMarkup: function() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },

    render:function(){
        var md = new Remarkable();
        return(
            <div className="comment">
                <h2 className="comment-author">
                    {this.props.author}:
                </h2>
                <span className="comment-body" dangerouslySetInnerHTML ={this.rawMarkup()}>
                </span>
            </div>
        );
    }
});

var commentsList = [
    {id: 1, author: "Pete Hunt", body: "This is one comment"},
    {id: 2, author: "Jordan Walke", body: "This is *another* comment"},
];

var CommentBox = React.createClass({

    getInitialState(){
        return {data:[]};
    },
    loadDataFormServer(){
        $.ajax({
            url:this.props.url,
            dataType:"json",
            success:(comments) =>{
                console.log(comments)
                this.setState({data:comments});
            },
            error:(xhr,stater,err)=>{
                console.err(err.toString());
            }
        });
    },
    componentDidMount(){
        this.loadDataFormServer();
    },
    handleCommentSubmit:function(comment){
        console.log(',,,,,,',comment);
        comment.id= Date.now();
        var data = this.state.data ;
        var newData = data.concat([comment]);
        console.log(newData);
        this.setState({data:newData});
    },


    render:function(){
        return(
            <div className="comment-box">
                <h1>This is My CommentBox</h1>
                <h3>Comments</h3>
                <CommentList data ={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

var commentBox = ReactDOM.render(<CommentBox  url="../src/comment.json"/>,document.getElementById('content'));
