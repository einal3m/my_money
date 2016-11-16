import React, { PropTypes } from 'react';
import { MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';
import { showFormModal } from '../../../actions/form-actions';

const NewModelButtons = props => (
  <Dropdown id="new-category" pullRight onSelect={newModel}>
    <Dropdown.Toggle>
      <Glyphicon glyph="plus" /> New
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {renderModelTypes(props.modelTypes)}
    </Dropdown.Menu>
  </Dropdown>
);

function newModel(eventKey) {
  showFormModal(eventKey, {}, { allowDelete: false });
}

function renderModelTypes(modelTypes) {
  return modelTypes.map((modelType, i) => <MenuItem key={i} eventKey={modelType}>{`New ${modelType}`}</MenuItem>);
}

NewModelButtons.propTypes = {
  modelTypes: PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default NewModelButtons;
