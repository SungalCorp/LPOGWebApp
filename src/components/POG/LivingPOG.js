
import React, { useCallback, useEffect, useState } from 'react';
import Client from './Client';
import './LivingPOG.css';
import ColorKey from '../UI/ColorKey';
//import '../../datacontrols/TableWithCheckboxes';
//import LPogMenu1 from '../Menus/LPOGMenu_1';
import * as globals from '../../lib/Globals.js';
import TableWithCheckboxes from '../../datacontrols/TableWithCheckboxes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faBars, faFilter, faCross, faX, faXmark, faUserXmark, faXmarksLines, faXmarkCircle, faBold, faVolumeXmark, faCircleXmark, faFilterCircleXmark, faXRay, faEarListen, faArrowLeft, faLeftLong, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

const LivingPOG = () => {
  // fetch data
  const [username, setUsername] = localStorage.getItem(globals.USER_NAME)
  const [planogram, setPlanogram] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const [storesList,setStoresList] = useState([])
  const [gondolaList,setGondolaList] = useState([])
  const [superCategoryList,setSuperCategoryList] = useState([])
  const [categoryList,setCategoryList] = useState([])
  
  const [filteredStoreList,setFilteredStoresList] = useState([])
  const [filteredGondolaList,setFilteredGondolaList] = useState([])
  const [filteredSuperCategoryList,setFilteredSuperCategoryList] = useState([])
  const [filteredCategoryList,setFilteredCategoryList] = useState([])
  
  const createGondolaList = (data) => {
    var gondolaList = []
    var lastGondolaID = -1

    data.map((datarow) => {
      if (datarow.displayfixtureID !== lastGondolaID){
          
        lastGondolaID = datarow.displayfixtureID
          
        let addItem = {}

        addItem.gondolaID = datarow.displayfixtureID
        addItem.gondolaName = datarow.displayfixtureIDForUser
        addItem.gondolaLocation = datarow.displayfixtureLocation
        addItem.storeName = datarow.storeName
        gondolaList.push(addItem)
      }
  
      return false
    })
    console.log('gondolaList = ',gondolaList)
    setGondolaList(gondolaList)
  }
  const createStoreList = (data) => {
    var storeList = []
    var lastStoreID = -1
    
    data.map((datarow) => {

      if (datarow.storeID !== lastStoreID){
          
          lastStoreID = datarow.storeID
          
          let addItem = {}
          addItem.storeID = datarow.storeID
          addItem.storeName = datarow.storeName
          addItem.storeLocation = datarow.storeAddress + " " + datarow.storeCity + " " + datarow.storeState
          storeList.push(addItem)
      }
  
      return false
    })
    setStoresList(storeList)
  }
  

  const createListFromDB = async (viewName,fieldNames,hookFunc) => {
    setIsloading(true);
    setError(null);
    
    try {
      console.log("in createListFromDB")
      var retList = []
      //var username = localStorage.getItem(globals.USER_NAME)
      var url = globals.API_SERVER_URL + 'dbGet_'+ viewName
      console.log("url in createListFromDB = ",url)
      const response = await fetch(url);
      var data = await response.json();
      
      for (const datum of data){
        var row = {}
        for(const fieldName of fieldNames){
          row[fieldName]=datum[fieldName]
        }
        retList.push(row)
      }
    } catch (error) {
      setError(error.message);
    }
    hookFunc(retList)
    setIsloading(false);
    return true
  }
 
  const refilterStoreListbyGondola = async () => {
    setIsloading(true);
    setError(null);
    
    try {
   
      console.log("in refilter storelist")
      var username = localStorage.getItem(globals.USER_NAME)
      var selectedGondolaList = localStorage.getItem(username + globals.SELECTED_GONDOLA_LIST_FILTER)
      if (selectedGondolaList.length===0){
        setIsloading(false)
        return
      }
      var filter = "displayfixtureID IN(" + selectedGondolaList +")"
      var url = globals.API_SERVER_URL + 'dbGet_displaymatrixforweb?filter=' + filter
      console.log("url in refilterStoreListbyGondola=",url)
      const response = await fetch(url);
      var POGfacings = await response.json();
      let POGdata = transformPOGData(POGfacings)
      setPlanogram(POGdata);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }

  const transformPOGData = (data) => {
    /* 
    transforms data to:
    (clientlevel)[
                  (storeLevel)[
                               (gondolaLevel)[
                                              (shelfLevel)[ 
                                                           {facing},{facing}
                                                           ]
                                              ]
                                ]
                  ]
    */
    if (data.length === 0) return [];
    
    let clientList = [], storeList = [], gondolaList = [], shelfList = [];
    let currStoreID = data[0]["storeID"];
    let currGondolaID = data[0]["displayfixtureID"];
    let currShelfID = data[0]["shelfID"];

    // go through facings, placing them in groupings 
    // according to gondola and shelf
    for (var facing of data) {
      if (facing["shelfID"] !== currShelfID) {
        gondolaList.push(shelfList);
        shelfList = [];
      }

      if (facing["displayfixtureID"] !== currGondolaID) {
        storeList.push(gondolaList);
        gondolaList = [];
      }

      if (facing["storeID"] !== currStoreID) {
        clientList.push(storeList);
        storeList = [];
      }
      currStoreID = facing["storeID"];
      currGondolaID = facing["displayfixtureID"];
      currShelfID = facing["shelfID"];
      shelfList.push(facing)
    }

    gondolaList.push(shelfList)
    storeList.push(gondolaList)
    clientList.push(storeList)
    return clientList
  }
  
  const fetchPlanograms = async () => {
    
    setIsloading(true);
    setError(null);
    
    try {

      console.log("in fetchPlanograms")
      //data is filtered by AUTHORIZED_STORE_LIST
      //user preferences and authorization are kept in a hashable object in local storage
      // var username = localStorage.getItem(globals.USER_NAME)
      var username = localStorage.getItem(globals.USER_NAME)
      console.log("USERNAME SET!!")
      console.log("username = ",username)
      var selectedStoreList = localStorage.getItem(username + globals.SELECTED_STORE_LIST_FILTER)
      console.log("SelectedStoreList = ",selectedStoreList)
      
      // this should be done with a database read.
      //var authorizedStoreList = localStorage.getItem(username + globals.AUTHORIZED_STORE_LIST_FILTER)
      var authorizedStoreList = ''
      //console.log ("local storage username + globals.AUTHORIZED_STORE_LIST_FILTER=",authorizedStoreList)
        
      var url = globals.API_SERVER_URL + "dbGet_useraccounts?filter=username='" + username + "'"
      console.log("URL TO RETRIEVE USER's AUTHORIZED LIST =",url)
      const response = await fetch(url);
      var userRec = await response.json();
      authorizedStoreList = userRec[0].storeIDs
      console.log("authorizedStoreList====",authorizedStoreList)
    
      console.log("AuthorizedStoreList = ",authorizedStoreList)
  
      // 2 pass process, 1st time create store list for all authorized stores, second time create data for
      // the planogram based on authorized stores AND user selected filtering
      var filter = "storeID IN(" + authorizedStoreList + ")"
      var POGfacings = []
      for (var pass = 1;pass <= 2;pass++){
        if ((pass===1 && authorizedStoreList.length===0) 
        || (pass===2 && (authorizedStoreList.length===0 || selectedStoreList.length ===0))){
          continue
        }
        url = globals.API_SERVER_URL + 'dbGet_displaymatrixforweb?filter=' + filter
        
        const response = await fetch(url);
        POGfacings = await response.json();
        if (!response.ok) {
          throw new Error('Could not connect to database - Store List failed to load');
        }

        if (pass===1){
          console.log("POGfacings = ", POGfacings)
          createStoreList(POGfacings)        
          filter = "storeID IN(" + authorizedStoreList +") AND storeID IN(" + selectedStoreList +")"
          continue
        }
        // if we're here it's the second pass
        if (selectedStoreList.length===0){
          setIsloading(false)
          return
        }
        let POGdata = transformPOGData(POGfacings)
        setPlanogram(POGdata);
      }
      //
      // now build the gondola list
      createGondolaList(POGfacings)
      
      // now build the SuperCategory and category lists
      

      createListFromDB("productSuperCategories",["supercategory"],setSuperCategoryList) 
      createListFromDB("productCategories",["category"],setCategoryList) 
    

    } catch (error) {
      setError(error.message);
      console.error("ERROR IN FETCHPLANOGRAMS")
    }
    setIsloading(false);
  };

  useEffect(() => {
    if (localStorage.getItem(globals.USER_NAME) && 
        localStorage.getItem(globals.USER_NAME)!=="UNAUTH"){
      console.log("Username =", localStorage.getItem(globals.USER_NAME))
      fetchPlanograms()
    }
    
  },[])
  
  useEffect(() => {

    // set local storage filteredStoreList for this user 
    var username = localStorage.getItem(globals.USER_NAME)
    console.log("---> filtered store list =",filteredStoreList)
    console.log("---> sent to local storage::",globals.LIST_TO_COMMA_DELIMITTED_TEXT_STRING(filteredStoreList))
    localStorage.setItem(
      username + globals.SELECTED_STORE_LIST_FILTER,globals.LIST_TO_COMMA_DELIMITTED_TEXT_STRING(filteredStoreList)
    )
    fetchPlanograms()
    console.log("in use effect for filtered store list, filteredStoreList=",filteredStoreList)
  }, [filteredStoreList])

  useEffect(() => {

    // set local storage filteredStoreList for this user 
    var username = localStorage.getItem(globals.USER_NAME)

    localStorage.setItem(
      username + globals.SELECTED_GONDOLA_LIST_FILTER,globals.LIST_TO_COMMA_DELIMITTED_TEXT_STRING(filteredGondolaList)
    )
    refilterStoreListbyGondola()
    console.log("in use effect for filtered gondola list, filteredGondolaList=",filteredGondolaList)
  }, [filteredGondolaList])
  
  let content = <p>Found no planograms.</p>;

  if (planogram.length > 0) {
    content = <Client stores={planogram} />;
    if (error) {
      content = <p>{error}</p>;
    }
  
    if (isLoading) {
      content = <p>Loading...</p>;
    }
  }
  else{   //no stores selected
    content = <p>Please Select any or all stores to display their planograms</p>
  }
  
  //
  // filter handlers for the filter boxes
  // and their associated lists
  
  const supercategoryFilterHandler = (filteredSuperCategoryList) => {
    setFilteredSuperCategoryList(filteredSuperCategoryList)
  }
  const categoryFilterHandler = (filteredCategoryList) => {
    setFilteredCategoryList(filteredCategoryList)
  }
  const storeFilterHandler = (filteredStores) => {
    console.log("filteredStoreList FROM FING picker list =",filteredStores)
    setFilteredStoresList(filteredStores)

  }
  const gondolaFilterHandler = (filteredGondolaList) => {
    setFilteredGondolaList(filteredGondolaList)
  }
  console.error("********filteredStoresList=",filteredStoreList)


  const [expanded, setExpanded] = useState(true);
  const [displayStyle, setDisplayStyle] = useState("default");


  const toggleGondolaLayoutMode = () => {
        setDisplayStyle(prevStyle => prevStyle === "default" ? "alternative" : "default");
        setExpanded(!expanded);
        // toggleGondolaSize(); // Call toggleGondolaSize function here
  };

  const getFilteredList = (filteredListName) => {
    var username = localStorage.getItem(globals.USER_NAME)
    console.log("username=",username,"filteredListName=",filteredListName)
    console.log("localStorage.getItem(username)=",localStorage.getItem(username))
    return localStorage.getItem(globals.USER_NAME + filteredListName)
  }

  return (
    <div className='OuterPOGContainer'>
        <button className={`buttonStyle1 ${displayStyle}`} onClick={toggleGondolaLayoutMode}>
        {displayStyle === "default" ? <FontAwesomeIcon icon={faAngleLeft} /> : <FontAwesomeIcon icon={faAngleRight} />}
        </button>
       
        
        <div className={`LeftSidePanel ${displayStyle}`} >

            <TableWithCheckboxes 
                  data={storesList} 
                  selecteditemlist={getFilteredList(globals.SELECTED_STORE_LIST_FILTER)}
                  //selecteditemlist={'45,17,65'}
                  keyField={'storeID'} 
                  headings = {['Select','Storename','Location']}
                  fieldList = {['storeName','storeLocation']}
                  onFilter = {storeFilterHandler}
                  title = {"Filter By Store"}/> 
            <br/>
            <br/>
            <TableWithCheckboxes 
                  data={gondolaList} 
                  selecteditemlist={'45,17,65'} //{localStorage.getItem(username + globals.SELECTED_GONDOLA_LIST_FILTER)}
                  keyField={'gondolaID'} 
                  headings = {['Select','Gondola','Location','Store']}
                  fieldList = {['gondolaName','gondolaLocation','storeName']}
                  onFilter = {gondolaFilterHandler}
                  title = {"Filter By Gondola"}/> 
            <br/>
            <br/>
            {/* <TableWithCheckboxes 
                  data={superCategoryList} 
                  keyField={'supercategory'} 
                  headings = {['Category']}
                  fieldList = {['supercategory']}
                  onFilter = {supercategoryFilterHandler}/> 

            <br/> */}
            {/* <TableWithCheckboxes 
                  data={categoryList} 
                  keyField={'category'} 
                  headings = {['Select','Sub Category']}
                  fieldList = {['category']}
                  onFilter = {categoryFilterHandler}
                  title = {"Filter By Sub-Category"}/>  */}
        </div>

        <div  className={`LivingPOGContainer ${displayStyle}`}>
          <div>
            <ColorKey/>
          </div>
          <div className='LivingPOG'>
             {content}
          </div>
        
        </div>
        
    </div>
  )

}

// export default App;
export default LivingPOG;

