import React from 'react';
import styles from '../styles.tsx'

function ListLogs(props) {
  const logs = props.logs

  return(
    logs.map(log => {
      const { Type, Amount, Description, Category, Notes } = log.fields
      return (
        <tr key={log.id} style={styles.textLeft}>
          <td>
            <h3 style={{ color: Type === 'Expense' ? 'red' : 'green' }}>
              { Amount }
            </h3>
          </td>
          <td><strong>{ Description }</strong></td>
          <td>{ Category }</td>
          <td>{ Notes }</td>
        </tr>
      )
    })
  )
}

export default ListLogs;
