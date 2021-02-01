import React, { useEffect, useState } from 'react';
import '../css/Restaurant.css';
import {axios} from './axios';

function buildTitle(prop){

  if(prop != null){
    return prop.Name + " - " + prop.Suburb + " - rated #" + prop.Rank + " overall"
  }
  else{
    return "Test"
  }
}


const Restaurant = (props) => {

  const [ total, setTotal ] = useState(0);
  const [ selected, setSelected ] = useState([]);
  const [ restaurantState, setRestaurantState ] = useState([]);
  const [showButton, setShowButton] = useState(false);

  useEffect( () => {
    setRestaurantState(
      props.data.map( data => {
        return {
          select: false,
          Id: data.Id,
          Name: data.Name,
          Suburb: data.Suburb,
          LogoPath: data.LogoPath,
          Rank: data.Rank,
          ItemCount: data.ItemCount,
          MenuItems: data.MenuItems,
        }
      })
    );
  }, []);

  function handleCheckboxChange (value) {
    
    setShowButton(true);
    
    value.selected = true;

    const updateValue = selected.find( obj => obj === value);
   
    if(updateValue)
    {
      setTotal( total - value.Price);

        // If value exist return list without deselected item
        setSelected(selected.filter( obj => {
          if(JSON.stringify(obj) !== JSON.stringify(value)){
            return obj;
          }
        }))
    }
    else{
        // Else add it
        setTotal(total + value.Price);
        setSelected( item => [...item, value])
    }
  };

  const createOrder = async () => {

    var object = {
      SelectedItems: selected,
      Total: total
    }

    const response = await axios.post("/order", object).catch(err => {console.log("Error: ", err)} )
    
    if(response){
      console.log(response);
    }
  }

  return <div >
      {
        props.data.map( (value, key) => (
            <div key={key} className="restaurant">
              <span>
                <img src={value.LogoPath.toString()} alt={value.Name} className="image"/>
              </span>
              <span className="title">
                  {buildTitle(value)}
              </span>
              {
                value.MenuItems.map((item, key) => (  
                    <div key={key}>
                      <span>
                        <input type="checkbox" checked={item.select} onChange={() => handleCheckboxChange(item)}/>
                      </span>
                      <span>
                        <p className="menuItems">{item.Name} - R{item.Price}</p>
                      </span>

                    </div>
                ))
              }
              
            </div>
          )
        )
      }

      {
        showButton === true && <button onClick={createOrder} className="button">Order - R{total}</button>
      }
  </div>

}

export default Restaurant;
