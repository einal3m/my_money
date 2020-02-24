import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { showFormModal } from '../../../actions/form-actions';

const NewModelButtons = props => (
  <Dropdown id="new-category" alignRight onSelect={newModel}>
    <Dropdown.Toggle>
      <i className="fas fa-plus" /> New
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
  return modelTypes.map((modelType, i) => <Dropdown.Item key={i} eventKey={modelType}>{`New ${modelType}`}</Dropdown.Item>);
}

NewModelButtons.propTypes = {
  modelTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewModelButtons;
