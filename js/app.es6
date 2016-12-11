import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {bootstrap} from 'bootstrap-sass';
import AppList from './AppList';
import AddAppointment from './AddAppointment';
import _ from 'lodash';

require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('../css/app.css');
require('../css/news.scss');

class MainInterface extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: 'Appointment',
			show: true,
			myAppointMent: [],
			aptBodyVisible: true		
		}

		this.deleteMessage = this.deleteMessage.bind(this);
		this.toggleAptDisplay = this.toggleAptDisplay.bind(this);
	}

	componentDidMount() {
		this.request = $.get('data.json', function(result) {
			var tmpApt = result;
			this.setState({
				myAppointMent: tmpApt
			});
		}.bind(this));
	}

	componentWillUnmount() {
		this.request.abort();
	}

	// Delete Message function
	deleteMessage(idDel) {

		let listItems      = this.state.myAppointMent;	// Cannot read property 'myAppointMent' of undefined
		let renewListItems = _.without(listItems, idDel);

		this.setState({
			myAppointMent: renewListItems
		});

	} // deleteMessage

	toggleAptDisplay() {
		debugger
		let temp = !this.state.aptBodyVisible;
		this.setState({
			aptBodyVisible: temp
		});
	} // toggle AptDisplay

	addItem(dataItem) {
		let arrMyAppointMent = this.state.myAppointMent;
		arrMyAppointMent.push(dataItem);
		this.setState({
			myAppointMent: arrMyAppointMent
		});
	}

	render() {
		let showTitle;
		if (this.state.show) {
			showTitle = "New";
		}

		// Setting status display
		let displaylist = {
			display: this.state.show ? 'block' : 'none',
			color: 'red'
		}

		// Map data from Load Ajax to a variable
		let filterApts = this.state.myAppointMent;

		filterApts =  filterApts.map((item, index) => {
				return (<AppList key={index}
								 singleItem= {item}
								 whichItem = {item}
								 onDelete = {this.deleteMessage} />);
		});	// myAppointMent.map

		return(
			<div className="interface">
				<h1 className="block-section__title">
					{showTitle} {this.state.title}
				</h1>

				<AddAppointment handleToggle={this.toggleAptDisplay} 
								bodyVisible={this.state.aptBodyVisible} 
								addApt={this.addItem}
				/>

                <div className="block-section__content">
                    <ul className="list-group">
                        {filterApts}
                    </ul>
                </div>				
			</div> 
		);
	}
}


render(<MainInterface />, document.getElementById('root'));
