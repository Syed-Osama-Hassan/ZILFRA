import React, { useState, useEffect} from "react";
import Appbar from '../NavBar/NavBar';
import firebase from '../../firebase';
import DrawCard from '../Common/DrawCard/DrawCard';

const db = firebase.database().ref();

const DCases = () => {
  const [draw, setDraw] = useState({});

  useEffect(() => {
    db.child('draw').on('value', snapshot => {
      if (snapshot.val() != null) {
        setDraw({
          ...snapshot.val()
        })
      }
      else {
        setDraw({});
      }
    })
  }, [])

 return(
  <div>
    <Appbar />
    <div>
     <h2 className="text-center mt-5">
       Draw Cases
     </h2>
     </div>

     <div className="container-fluid mb-5">
        <div className="row">
            <div className="col-10 mx-auto">
                <div className="row gy-4">
                    {
                       Object.keys(draw).map(id => {
                         return(
                           <DrawCard
                            title={draw[id].title}
                            description= {draw[id].description}
                            easyPaisaAccount={draw[id].easyPaisaAccount}
                            duration={draw[id].duration}
                            keys={id}
                            />
                         )
                       })
                    }                    
                </div>
            </div>
        </div>
    </div>
  </div>
 ); 
};
export default DCases;
