import React from 'react';

function AddTransportTypeButtons(props) {
    return (
        <div className="add-transport-buttons">
            <input type="checkbox" name="bus" checked={props.isAddBusChecked} onChange={()=>{}} />
            <label htmlFor="bus" className="add-transport-buttons__item" onClick={()=> props.checkAddTransportButton('directions_bus')} ><i className="pictorams">directions_bus</i></label>

            <input type="checkbox" name="troll" checked={props.isAddTrollChecked} onChange={()=>{}} />
            <label htmlFor="train" className="add-transport-buttons__item" onClick={()=> props.checkAddTransportButton('train')} ><i className="pictorams">train</i></label>

            <input type="checkbox" name="tram" checked={props.isAddTramChecked} onChange={()=>{}} />
            <label htmlFor="tram" className="add-transport-buttons__item" onClick={()=> props.checkAddTransportButton('tram')} ><i className="pictorams">tram</i></label>
        </div>
    );
}

export default AddTransportTypeButtons;
