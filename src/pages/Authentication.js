import { redirect } from 'react-router-dom';
import LoginBox from '../components/POG/LoginBox';
import * as globals from '../lib/Globals.js'
import LivingPOG from '../components/POG/LivingPOG';
import React, {useState } from 'react';


const useraccountsURL = globals.API_SERVER_URL + 'dbGet_useraccounts';



function AuthenticationPage() {

  return (

    <LoginBox />

  )
  }
export default AuthenticationPage;

export async function action({ request }) {
  const data = await request.formData();
  const username = data.get('username').trim();
  const password = data.get('password');

  const userRecListRaw = await fetch(`${useraccountsURL}?filter=username='${username}'`);
  const userRecList = await userRecListRaw.json();

  if (userRecList.length === 0) {
    alert('Invalid user ID');
    return false;
  }
  localStorage.setItem(globals.USER_NAME,"UNAUTH")
  const userRec = userRecList[0];
  
  if (userRec.password !== password) {
    alert('Invalid password');
    return false;
  }
  //here is where we write the authorized store list in local storage variable AUTHORIZED_STORE_LIST
  // create the AUTHORIZED_STORE_LIST if userRec.storeIDs=='' then get all stores in client
  
  localStorage.setItem(globals.USER_NAME,userRec.username)
  //localStorage.setItem( userRec.username + globals.AUTHORIZED_STORE_LIST_FILTER,userRec.storeIDs)
  var selectedStoreList = localStorage.getItem(userRec.username + globals.SELECTED_STORE_LIST_FILTER)
  console.log('selectedStoreList (IN Authentication.js)=',selectedStoreList)
  // if (!(userRec.username + globals.SELECTED_STORE_LIST_FILTER in localStorage)){
  //    localStorage.setItem( userRec.username + globals.SELECTED_STORE_LIST_FILTER,userRec.storeIDs) 
  // } 
  // uncomment the following line and run login screen once to clear local storage
  //localStorage.clear()
  
  return redirect('/LivingPOG');
}
