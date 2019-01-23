import React from 'react';
import ReactDOM from 'react-dom';
import suggestions from './suggestion';

class Title extends React.Component {
	constructor() {
		super()
	}
	render() {
		return (

			<div className="bodydiv">
			{!this.props.showModal &&
				<div className="text-wrap">
					<svg viewBox="0 0 500 80">
						<pattern
							id="p-img"
							viewBox="0 0 300 100"
							patternUnits="userSpaceOnUse"
							width="200%" height="200%"
							x="-60%" y="-10%">
							<image href="https://68.media.tumblr.com/f6d55c4c3981fd7409a41f9e9cfa71bf/tumblr_oqy2keV1LD1uha1xeo1_400.gif" width="300" height="200" />
						</pattern>
						<text textAnchor="middle"
							x="50%"
							y="50%"
							dy=".35em"
							className="img-layer">
							MIXORCISM
    				</text>
						<linearGradient id="gr-overlay" x1="0" y1="0" x2="100%" y2="100%">
							<stop stopColor="hsla(50, 100%, 70%, 0.5)" offset="10%" />
							<stop stopColor="hsla(200, 100%, 60%, 0.5)" offset="50%" />
							<stop stopColor="hsla(320, 100%, 50%, 0.5)" offset="90%" />
						</linearGradient>
						<text textAnchor="middle"
							x="50%"
							y="50%"
							dy=".35em"
							className="gradient-layer">
							MIXORCISM
    </text>
					</svg>
				</div>
			}
			</div>
		)
	}
}

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const ingredients = this.props.userIngredient.join(', ');
    const predictions = this.props.predictions.map(el => <div className="suggestItemDiv" onClick={this.props.pickSuggestion}>{el}</div>);
    const slicedPredict = predictions.slice(0, 3);
    return (
    	<div className ="SearchMainContainer">
    		<div className = "SearchContainer"> 
					<div>Search Here</div>
					<div className="horizontalContainerSearchAdded">
					{ ingredients }</div>        
					<input type="text" value={this.props.inputbox_text} onChange={this.props.handleInputChange}/>
					<div className="horizontalContainerSearch">
					<div className="submitIngredient"onClick={this.props.addIngredient}>add ingredient</div>
					<div className="clearIngredient" onClick={this.props.clearIngredients}>clear ingredients</div>
					</div>
          <div className="autosuggestFixedHeight">
						{this.props.inputbox_text !== "" ? 
						        <div className="autosuggestContainer">
										{slicedPredict}
										</div> : null}
          </div>
				</div>



        
    	</div>
   )
  }
}

class DrinksCard extends React.Component {
	constructor(props){
		super(props)
		this.handleText=this.handleText.bind(this)
	}

	handleText(event) {
		console.log(event.target)
		this.props.getCurrentItem(event.target.id)
		this.props.handleShowModal();
	}
	render() {
    const ingredientList = this.props.ingredients.map(el => <li>{el}</li>);
		return (
			 <div className = "drinkIconPictureContainer">
			 <div className="flip-cards">
			 	<div className="frontCard">
				 	<img src={this.props.img} />
          <div className="drinkNameTextContainer">{this.props.title}</div>
				</div>
				 <div className="backCard">
				 	<div className="horizontalContainer">
						 <div className="verticalContainer">
								<div>Ingredients</div>
								<ul>{ingredientList}</ul>
								<div id={this.props.id} className="button" onClick={this.handleText}>Find out more</div>
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
      autocomplete: [],
      modalImgInfo: {
        amounts: [],
        description: '',
        id: 1,
        ingredients: [],
        name: '',
        pic: '',
        steps: [],
			},
			steps:[],
		}
		this.handleInputChange = this.handleInputChange.bind(this)
    this.addIngredient = this.addIngredient.bind(this)
    this.clearIngredients = this.clearIngredients.bind(this);
    this.pickSuggestion = this.pickSuggestion.bind(this);
		this.ExitModal = this.ExitModal.bind(this);
		this.getCurrentItem = this.getCurrentItem.bind(this);
	}

	handleInputChange(event) {
    this.setState({inputbox_text: event.target.value})
    this.setState({autocomplete: suggestions.predictWord(event.target.value)})
  }

  ExitModal() {
		this.setState({
			showModal: false,
		});
  }
  
  getCurrentItem(id) {
		console.log(id)
		console.log(this.state.recipes_arrObject)
		let selected;
		this.state.recipes_arrObject.forEach((el) => {
			console.log(el.id)
			if (el.id == id) {
				selected = el
			}
		})
		
		 this.setState({
       modalImgInfo: selected})
    //   })
    // })
	}
  
  handleShowModal() {
    // 	let key = event.target.id;
       console.log()
       this.setState({
           showModal: true,
           // modalImgInfo: this.state.recipes_arrObject[key],
       });
     }

	addIngredient() {
		let temp = [...this.state.userSelectedIngredients_arrString];
		if (this.state.ingredient_arrString.indexOf(this.state.inputbox_text) >= 0) {
      if (this.state.userSelectedIngredients_arrString.indexOf(this.state.inputbox_text) < 0) {
        temp.push(this.state.inputbox_text);
        this.setState({userSelectedIngredients_arrString: temp});
        this.setState({inputbox_text: ""})
      } else {
        alert('drink already added')
      }
		} else {
			alert('no drinks has this ingredient')
		}
  }

  clearIngredients() {
    this.setState({userSelectedIngredients_arrString: []});
  }

  pickSuggestion(event) {
    console.log(event);
    this.setState({inputbox_text: event.currentTarget.textContent});
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

  render() {
    // const drinks = this.state.recipes_arrObject.map((el) => {
    //   const { id, picture, name, descriptions, ingredients, steps } = el;
    //   return <DrinksCard key={id} img={picture} title={name} description={descriptions} ingredients={ingredients} steps={steps}/>
    // });
    // const filtered = this.state.recipes_arrObject.filter(el => arrayContainsArray(el.ingredients, this.state.userSelectedIngredients_arrString)).map((elem) => {
    //   const { id, picture, name, descriptions, ingredients, steps } = elem;
    //   return <DrinksCard key={id} img={picture} title={name} description={descriptions} ingredients={ingredients} steps={steps}/>
    // });
    // const allDrinks = this.state.recipes_arrObject.filter((el) => {
    //   if (this.state.userSelectedIngredients_arrString.length === 0) {
    //     return el;
    //   } else {
    //     return arrayContainsArray(el.ingredients, this.state.userSelectedIngredients_arrString);
    //   }
    //   }).map((elem) => {
    //   const { id, picture, name, descriptions, ingredients, steps } = elem;
    //   return <DrinksCard key={id} img={picture} title={name} description={descriptions} ingredients={ingredients} steps={steps}/>
    // });
    // function arrayContainsArray (superset, subset) {
    //   if (0 === subset.length) {
    //     return false;
    //   }
    //   return subset.every(function (value) {
    //     return (superset.indexOf(value) >= 0);
    //   });
		// }
		const steps = this.state.modalImgInfo.steps.map(el => <li>{el}</li>)


    const modal = this.state.showModal ? (
			<Modal>
				<div className="modalbackground" onClick={() => this.ExitModal()}>
					<div className="modal-container">
						<div className="model-content-container">
						<div className="horizontalContainerModal">
						<div className="verticalContainerModal">
							<div className="modalDrinkTitle">{this.state.modalImgInfo.name}</div>
							<ol>{steps}</ol>
							{/* <div>{this.state.test}</div> */}
							</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		) : null;


		
		const allDrinks = this.state.recipes_arrObject.filter((el) => {
      if (this.state.userSelectedIngredients_arrString.length === 0) {
        return el;
      } else {
        return arrayContainsArray(el.ingredients, this.state.userSelectedIngredients_arrString);
      }
      }).map((elem) => {
      const { id, picture, name, descriptions, ingredients, steps } = elem;
      return <DrinksCard id={id} img={picture} title={name} description={descriptions} ingredients={ingredients} steps={steps} handleShowModal={() => this.handleShowModal()} getCurrentItem={this.getCurrentItem}/>
    });
    function arrayContainsArray (superset, subset) {
      if (0 === subset.length) {
        return false;
      }
      return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
      });
    }
    return (
	  <div>
				<Title showModal={this.state.showModal}/>
			<SearchContainer 
				inputbox_text={this.state.inputbox_text} 
				handleInputChange={this.handleInputChange}
        addIngredient = {this.addIngredient}
        clearIngredients = {this.clearIngredients}
        pickSuggestion = {this.pickSuggestion}
        userIngredient = {this.state.userSelectedIngredients_arrString}
        predictions = {this.state.autocomplete}
        inputbox_text = {this.state.inputbox_text}
				/>
				<div className = "drinksMainContainer">
				<div className = "drinksIconPicturesFlexContainer">
          {/* { this.state.userSelectedIngredients_arrString.length > 0 ? filtered : drinks } */}
          {/* { allDrinks } */}
          { !this.state.showModal ? allDrinks: null }
				</div>
				</div>
        {modal}
	  </div>
    )
  }
}

export default App;