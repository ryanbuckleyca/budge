import React, { Component } from 'react';
import { Container, Table, Row, Input, AmountBG, Submit, PlusMinus } from '../styles.tsx'
import { Text, View, RadioButton} from 'react-native';


function EntryForm(props) {
  const { handleChange, handleSubmit, entry } = props;

  return(
    <>
      <AmountBG entry>
        <Input
          type="number"
          placeholder="Amount"
          value={ entry.Amount }
          onChange={(e) => props.handleChange(e, 'Amount')}
        />
        <PlusMinus>{props.entry.Type==='Expense' ? '-' : '+'}</PlusMinus>
      </AmountBG>
      <Input
        style={{marginTop: '.5em'}}
        type="text"
        placeholder="Description"
        value={ entry.Description }
        onChange={(e) => handleChange(e, 'Description')}
      />
      <Input
        style={{marginTop: '.5em'}}
        type="text"
        placeholder="Category"
        value={ entry.Category }
        onChange={(e) => handleChange(e, 'Category')}
      />
      <Input
        style={{marginTop: '.5em'}}
        type="text"
        placeholder="Notes"
        value={ entry.Note }
        onChange={(e) => handleChange(e, 'Notes')}
      />
      <Submit
        style={{marginTop: '.5em'}}
        onPress={(e) => handleSubmit(e)}
        accessibilityLabel="Submit log"
      >
        <>submit</>
      </Submit>
    </>
  )
}

export default EntryForm;
