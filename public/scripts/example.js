// tutorial1.js
//import {CalendarDoc} from 'primereact';

//array di oggetti 
var data = [
    {author: "Mariolino", text: "Questo è un commento"},
    {author: "Conte Ugolino", text: "Poscia più che il dolor poté il digiuno"}
];

//secondo passaggio  = creo classe che mi restituisce il metodo render 
class CommentBox extends React.Component {

//cosi ho agginto lo stato al comment box
constructor(props) {
	super(props)
	this.state = {
	data: [] //leghiamo la lista allo stato stesso
	}
}
componentDidMount(){
	$.ajax({
	url: this.props.url,
	dataType: 'json',
	type: 'GET',
	success: function(data) {
	  this.setState({data: data});
	}.bind(this),
	error: function(xhr, status, err) {
	  console.error(this.props.url, status, err.toString());
	}.bind(this)
  });
}

 render() {
	 return(
		 <div className="commentBox">
			 <h1> Ciao, ecco la lista dei commenti:</h1>
			 <CommentList data={this.state.data}/> 
			 <CommentForm />
		 </div>
	 );
 }
}; // CommentList data={this.props.data} = cosi richiama la var data che contiene i dati 

class CommentList extends React.Component {

	render() {

		var risultatoMappaCommenti = this.props.data.map(
			(msg, indice) => {return (
				<Comment key={indice} className="comment" author={msg.author}> 
				{msg.text}
				</Comment>
			); 
		});

			return (
				<div className="commentList">
				{risultatoMappaCommenti}
				</div> //risultato della mappatura fatta li sopra 
		); 
	  }
	};

class CommentForm extends React.Component {
	render() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Il tuo nome" ref="author" />
				<input type="text" placeholder="Di' qualcosa..." ref="text" />
				<input type="submit" value="Invia" />				
			</form>
		);
	}
};

class Comment extends React.Component {

		rawMarkup(myMarkupString){ 
		var md = new Remarkable();
		var rawMarkup = md.render(myMarkupString);
		return { __html: rawMarkup};
	}

		render(){

		var md = new Remarkable();

		return(
			<div className="content">
				<h2 className="contentAuthor"> 
					{this.props.author}
					</h2> 
					<span dangerouslySetInnerHTML={this.rawMarkup(this.props.children)}></span>
			</div>
		)
	}
};

//è il primo passaggio che devo fare
ReactDOM.render(
	//montare la comment box poi la virgola e poi l'elemento su sui monto il div!!
	<CommentBox url= "api/comments"/>,
	document.getElementById('content')
);