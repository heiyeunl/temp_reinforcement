import React from 'react';
import ReactDOM from 'react-dom';


class Title extends React.Component {
	constructor() {
		super()
	}
	render() {
		return (
			<div className = "TitleMainContainer">
				<div className = "TitleMainTextContainer">
				 	MIXORCISM
				</div>
			</div>

			)
	}
}

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    	<div className ="SearchMainContainer">
    		<div className = "SearchContainer"> 
					<div>Search Here</div>
					<input type="text" value={this.props.inputbox_text} onChange={this.props.handleInputChange}/>
					<div className="submitIngredient"onClick={this.props.addIngredient}>add ingredient</div>
				</div>
    	</div>
   )
  }
}

class DrinksCard extends React.Component {
	constructor(props){
		super(props)
	}
	render() {
		return (
			 <div className = "drinkIconPictureContainer">
			 <div className="flip-cards">
			 	<div className="frontCard">
				 	<img src="https://s3.us-east-2.amazonaws.com/db-cocktail/images/negroni.jpg" />
				</div>
				 <div className="backCard">
				 	<div className="horizontalContainer">
						 <div className="verticalContainer">
								<div>Ingredients</div>
								<div>Apple</div>
								<div>Bananna</div>
								<div className="button" onClick={this.props.handleShowModal}>Find out more</div>
						 </div>
					 </div>
				 </div>
				 </div>
			 </div>

		)
	}
}



const modalRoot = document.getElementById('modalRoot');

class Modal extends React.Component {
    constructor(props) {
      super(props);
      // Create a div that we'll render the modal into. Because each
      // Modal component has its own element, we can render multiple
      // modal components into the modal container.
      this.el = document.createElement('div');
    }
  
    componentDidMount() {
      // Append the element into the DOM on mount. We'll render
      // into the modal container element (see the HTML tab).
      modalRoot.appendChild(this.el);
    }
  
    componentWillUnmount() {
      // Remove the element from the DOM when we unmount
      modalRoot.removeChild(this.el);
    }
    
    render() {
      // Use a portal to render the children into the element
      return ReactDOM.createPortal(
        // Any valid React child: JSX, strings, arrays, etc.
        this.props.children,
        // A DOM element
        this.el,
      );
    }
	}
	







class App extends React.Component {
  constructor() {
    super()
    this.state = {
			showModal: false,
			inputbox_text:"",
			userSelectedIngredients_arrString: [],
			ingredient_arrString: ["sweet vermouth", "orange juice", "simple syrup", "lime juice", "lemon juice", "london dry gin", "vodka", "rum", "dry vermouth", "bourbon whiskey", "rye whiskey", "irish whiskey", "scotch whisky", "japanese whiskey", "whiskey", "whisky", "gin", "campari", "brandy", "cognac", "tequila", "sherry", "7-up", "tonic water", "soda water", "ginger beer", "pisco", "coke", "sake", "ginger ale", "irish cream", "chartreuse", "milk", "eggs", "cranberry jiuce", "triple sec", "beer", "mezcal", "champagne", "white wine", "red wine", "port wine", "sprite", "prosecco", "campari", "bitters", "lime wedge", "ice cube", "olive"],
			recipes_arrObject:[],
			modalImgInfo: {},
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.addIngredient = this.addIngredient.bind(this)
		this.ExitModal = this.ExitModal.bind(this);
	}
	
	componentDidMount() {
    fetch('http://cocktail-gurus.com:3000/recipes', { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(data => data.json())
      .then((data) => {
        const recipies = data.map(drink => drink);
        const newState = {...this.state};
        newState.recipes_arrObject = recipies;
        this.setState(newState);
      });
  }

	handleInputChange(event) {
		this.setState({inputbox_text: event.target.value})
	}

	ExitModal(){
		this.setState({
				showModal: false,
		});
	}

	handleShowModal() {
		console.log('hi')

		this.setState({
				showModal: true,

		});
	}
	// handleShowModal(event) {
	// 	let key = event.target.id;
	// 	console.log(this.state.recipes_arrObject[key])
	// 	this.setState({
	// 			showModal: true,
	// 			modalImgInfo: this.state.recipes_arrObject[key],
	// 	});
	// }

	addIngredient() {
		let temp = [...this.state.userSelectedIngredients_arrString];
		if (this.state.ingredient_arrString.indexOf(this.state.inputbox_text) >= 0) {
		console.log()
		temp.push(this.state.inputbox_text);
		this.setState({userSelectedIngredients_arrString: temp});
		this.setState({inputbox_text: ""})
		} else {
			console.log('no drinks has this ingredient')
		}
	}

  render() {
		const modal = this.state.showModal ? (
			<Modal>
				<div className="modalbackground" onClick={()=> this.ExitModal()}>
					<div className="modal-container">
					<div className="model-content-container">
					<div>Step1: Negroni Oh Ya baby</div>
					<div>Step2: Negroni Oh Ya baby</div>
					<div>Step3: Negroni Oh Ya baby</div>
					</div>
				</div>
				</div>
			</Modal>
		) : null;


    return (
	  <div>
	  	<Title />
			<SearchContainer 
				inputbox_text={this.state.inputbox_text} 
				handleInputChange={this.handleInputChange}
				addIngredient = {this.addIngredient}
				/>
				<div className = "drinksMainContainer">
				<div className = "drinksIconPicturesFlexContainer">
					{!this.state.showModal && <DrinksCard handleShowModal={()=>this.handleShowModal()}/>}
					{!this.state.showModal && <DrinksCard handleShowModal={()=>this.handleShowModal()}/>}


				</div>
				</div>
				{modal}
	  </div>
    )
  }
}

export default App;