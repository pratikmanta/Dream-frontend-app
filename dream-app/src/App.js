import React, { Component } from 'react';
import './App.css';
import { DreamTable } from './components/DreamTable';


class App extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			dream: '',
			dreamData: [],
			errors: false
		}
	}

	// getting data from the local storage 
	componentDidMount() {
		const list = localStorage.getItem('dreamData');
		const parsedList = JSON.parse(list);
		if (list === null || list === undefined) {
			return false;
		}
		else {
			this.setState({ dreamData: parsedList })
		}
	}

	// timeout is triggered to remove error message text
	componentDidUpdate() {
		if (this.state.errors) {
			this.removeErrorMessage = setTimeout(() => {
				this.setState(() => ({ errors: false }))
			}, 1500);
		}
	}

	// clean it up when the component is unmounted.
	componentWillUnmount() {
		clearTimeout(this.removeErrorMessage);
	}

	// handle multiple input change
	handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value })
	}

	// add dream to table and saved data to local storage
	addDreamToTable = () => {
		var listArray = this.state.dreamData;
		if (!this.state.dream || !this.state.name) {
			this.setState({ errors: true })
		}
		if (listArray.length >= 0 && this.state.dream !== "") {
			listArray.push({
				id: listArray.length,
				name: this.state.name,
				dream: this.state.dream
			});
			this.setState({
				dreamData: listArray,
				name: '',
				dream: ''
			}, () => {
				localStorage.setItem('dreamData', JSON.stringify(this.state.dreamData));
			});
		}
		else {
			return null;
		}
	}

	// remove dream by id from table
	removeDreamById = (data) => {
		var selected_dream = this.state.dreamData.filter(el => el.id !== data)
		this.setState({ dreamData: selected_dream }, () => {
			localStorage.setItem('dreamData', JSON.stringify(this.state.dreamData));
		})

	}

	render() {
		const { dreamData } = this.state;

		return (
			<>
				<div className="container">
					<h2 className="text-left display-4 title-text">
						DreamApp
					</h2>
					<div className="box-wrapper">
						<div className="box1">
							<h1 className="dream-text">
								Any <span className="text-warning">Dream</span> Last night !! ?
							</h1>
						</div>
						<div className="box2">
							<div className="form-group ml-4 mr-3">
								<input name="name" className="form-control mt-2 pt-2" placeholder="First Name" onChange={this.handleInputChange} value={this.state.name} autoFocus />
								<textarea name="dream" onChange={this.handleInputChange} className="form-control form-control-lg mt-3" placeholder="Type your message here..." rows="5" value={this.state.dream}></textarea>
							</div>
							{this.state.errors &&
								<span className="text-danger pl-4">All fields are required</span>}

							<div className="button" onClick={() => this.addDreamToTable()}>Submit</div>
						</div>
					</div>
				</div>
				<div className={`container ${dreamData.length > 4 ? 'infi-scroll' : null} table-responsive mt-4`}>
					<DreamTable dreamData={dreamData} removeDreamById={this.removeDreamById} />
				</div>

			</>
		);
	}
}

export default App;
