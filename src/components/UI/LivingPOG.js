
import React, { useCallback, useEffect, useState } from 'react';
import Client from './Client';
import './LivingPOG.css'
import ColorKey from './ColorKey';


const LivingPOG = () => {
  // fetch data
  const [planogram, setPlanogram] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

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

    let clientList = [], storeList = [], gondolaList = [], shelfList = []
    let currStoreID = data[0]["storeID"]
    let currGondolaID = data[0]["displayfixtureID"]
    let currShelfID = data[0]["shelfID"]

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
      currStoreID = facing["storeID"]
      currGondolaID = facing["displayfixtureID"]
      currShelfID = facing["shelfID"]
      shelfList.push(facing)
    }

    gondolaList.push(shelfList)
    storeList.push(gondolaList)
    clientList.push(storeList)
    return clientList
  }

  const fetchPlanogramsHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);
    try {
      //const url = 'https://apiserver.sungalcorp.synology.me/dbGet_displaymatrixforweb?filter=storeID=7'
      const url = 'https://apiserver.sungalcorp.synology.me/dbGet_displaymatrixforweb'
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const POGfacings = await response.json();
      console.log("POGfacings = ", POGfacings)
      let POGdata = transformPOGData(POGfacings)
      setPlanogram(POGdata);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchPlanogramsHandler();
  }, [fetchPlanogramsHandler]);

  let content = <p>Found no planograms.</p>;

  if (planogram.length > 0) {
    content = <Client stores={planogram} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <div>
      <div>
          <ColorKey/>
      </div>
        <div className='LivingPOG' style={{height:'70vw',overflow:'auto'}}>{content}</div>
        {/* {content} */}
     
    </div>
  )

}

// export default App;
export default LivingPOG;

