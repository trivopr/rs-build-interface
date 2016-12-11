import React, { Component, PropTypes } from 'react';

class AppList extends React.Component {

	handleDelete() {
		this.props.onDelete(this.props.whichItem);
	}

    render() {
        return (
			<li className="list-group-item">
            	<span className="petname">{this.props.singleItem.petName} </span>
            	<span className="ownername">{this.props.singleItem.ownerName} </span>
            	<span className="aptdate">{this.props.singleItem.aptDate} </span>
            	<button className="btn btn-danger glyphicon glyphicon-remove pull-right" onClick= {this.handleDelete.bind(this)}></button>	
            	<p className="aptnote">{this.props.singleItem.aptNotes}</p>						
			</li>            
        ); // return
    } // render
} // class

export default AppList;