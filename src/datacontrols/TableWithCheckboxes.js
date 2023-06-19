import React, { useState } from 'react';
import './TableWithCheckboxes.css';
import { Card } from 'react-bootstrap';



function TableWithCheckboxes(props) {
  //
  console.log("props=",props)
  console.log("***WWWWWWW*********props.selecteditemlist=",props.selecteditemlist)
  const [checkedItems, setCheckedItems] = useState([]);
  
  const filterHandler = (event) => {
      console.log('checkedItems=',checkedItems)
      props.onFilter(checkedItems)
  }
  const handleCheckboxChange = (event) => {

    console.log("checkedItems before add =",checkedItems)
    const target = event.target;
    const value = target.value;
    //const name = target.name;
    const isChecked = target.checked
    
    if (isChecked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      const filteredItems = checkedItems.filter((item) => item !== value);
      setCheckedItems(filteredItems);
    }
    
  };

  //console.log("props.data=",props.data)
  const ckfunc = (datarow) => {
    console.log("***** in ckfunc ****")
    console.log("datarow = ", datarow)
    console.log("props.keyfield = ", props.keyField)
    console.log("datarow[props.keyField]=",datarow[props.keyField])
    return checkedItems.includes(datarow[props.keyField])
  }
  return (
    <div className='outerContainer'>
      <div className = 'title'>{props.title}</div>
            <table>
                
                {props.data.map((datarow,index )=> 
                    { 
                      console.log('in data.map')
                      
                      return(
                        <tr key={datarow[props.keyField]}>
                    
                        {props.fieldList.map((fieldName,index)=> 
                              { 
                                return(
                                  <td>{datarow[fieldName]}</td>
                                );
                              })
                        }
                        <td>
                          <input className='checkBox'
                            type="checkbox"
                            value={datarow[props.keyField]}
                            // checked={ckfunc(datarow)}
                            // onClick={filterHandler}
                            onChange={handleCheckboxChange}

                          />
                        </td>

                        {/* <td>{props.row.name}</td>
                        <td>{props.row.email}</td> */}
                      </tr>
                          
                      );
                    })
                  }
            </table>      
        <button onClick={filterHandler}>Apply Filter</button>     
    </div>
  );
}
export default TableWithCheckboxes;

