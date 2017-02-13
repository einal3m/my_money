import React, { PropTypes } from 'react';
import Date from '../common/date';
import Button from '../common/controls/button';
import { confirmDeleteBankStatement } from '../../actions/bank-statement-actions';

export default class BankStatementRow extends React.Component {

  handleClick = () => {
    confirmDeleteBankStatement(this.props.bankStatement);
  };

  render() {
    return (
      <tr>
        <td><Date date={this.props.bankStatement.date} /></td>
        <td>{this.props.bankStatement.fileName}</td>
        <td className="right-justify">{this.props.bankStatement.transactionCount}</td>
        <td className="right-justify"><Button onClick={this.handleClick}>Delete</Button></td>
      </tr>
    );
  }
}

BankStatementRow.propTypes = {
  bankStatement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    transactionCount: PropTypes.number.isRequired,
  }),
};
