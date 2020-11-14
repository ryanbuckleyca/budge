import React from 'react';
import styles from '../styles.tsx'

function EntryForm(props) {
  const { handleChange, handleSubmit, entry } = props;

  return(
    <tr style={styles.textLeft}>
      <td>
        <input type="number" name="Amount" value={ entry.Amount } onChange={(e) => handleChange(e)} />
        <span>
          <input type="radio" name="Type" value="Expense" selected={entry.Type==='Expense'} onChange={(e) => handleChange(e)} />
          Expense
          <input type="radio" name="Type" value="Income" selected={entry.Type==='Income'} onChange={(e) => handleChange(e)} />
          Income
        </span>
      </td>
      <td>
        <input type="text" name="Description" value={ entry.Description } onChange={(e) => handleChange(e)} />
      </td>
      <td>
        <input type="text" name="Category" value={ entry.Category } onChange={(e) => handleChange(e)} />
      </td>
      <td>
        <span style={styles.nowrap}>
        <input type="text" name="Notes" value={ entry.Notes } onChange={(e) => handleChange(e)} />
        <button onClick={(e) => handleSubmit(e)}>+</button>
        </span>
      </td>
    </tr>
  )
}

export default EntryForm;
