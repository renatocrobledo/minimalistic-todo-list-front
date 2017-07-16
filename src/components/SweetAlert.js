import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button } from 'react-bootstrap';

const Sweet = (props) => {

if (!props.show) return null;

const { text, id, status, createdAt } = props.selectedTask;
const toggleStatusBtn = status === 'new' ? 'Done' : 'Undone';
const toggleStatusClass = status === 'new' ? 'done' : 'new';

  return (
    <SweetAlert
      confirmBtnText="Go back!"
      title={createdAt}
      required={false}
      onConfirm={props.closeAlert}
    >
    <input type='text' className='Task-imput' defaultValue={text} onKeyPress={(e) => props.setUpdate(id, null, e)} onChange={(e) => props.setUpdate(null, {text: e.target.value})} />
    <br /><br />
    <Button bsStyle='info' onClick={(e) => props.updateTask(id)}>Update</Button>
    <Button bsStyle='danger' onClick={(e) => props.deleteTask(id)}>Delete</Button>
    <Button bsStyle='success' onClick={(e) => props.updateTask(id,{status: toggleStatusClass})} >{toggleStatusBtn}!</Button>
    </SweetAlert>
  );
};

/*

<SweetAlert
	input
	showCancel
	cancelBtnBsStyle="default"
	title="An input!"
	inputPlaceHolder="Write something"
	onConfirm={this.onRecieveInput}
	onCancel={this.hideAlert}
>
	Write something interesting:
</SweetAlert>

*/

export default Sweet;
