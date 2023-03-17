import React from 'react';
 import './GondolaFilter.css'

const GondolaFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='gondula-filter'>
      <div className='gondula-filter__control'>
        <label>Filter by Gondola#</label>
          <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='0'>1</option>
          <option value='1'>2</option>
          <option value='2'>3</option>
        </select>
      </div>
    </div>
  );
};

export default GondolaFilter;
