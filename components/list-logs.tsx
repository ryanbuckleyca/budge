import React from 'react';
import styles from '../styles.tsx'

function ListLogs(props) {
  if(!props.logs || props.logs.length < 1)
    return "Loading..."

  const logs = props.logs

  console.log('logs[1].fields is ', logs[1].fields)

  return(
    // TODO: this shouldn't get reached because of the guard clause above
    // but it is, and its causing a 'Cannot read property 'Type' of undefined'
    logs.map(log => {
      console.log('log is ', log)
      const { Type, Amount, Description, Category, Notes } = log.fields
      return (
        <tr key={log.id} style={styles.textLeft}>
          <td>
            <h2 style={{ color: Type === 'Expense' ? 'red' : 'green' }}>
              { Amount }
            </h2>
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
