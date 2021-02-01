/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import JSONData from '../SampleData.json';
import '../css/Home.css';
import Restaurant from './Restaurant'

export class Home extends Component {
  static displayName = Home.name;

  constructor(props){
    super(props);
    this.state ={
      title: '',
      category: '',
      city: '',
      restaurants: [],
      foundRestaurants: [],
      sortedRestaurants: []
    }
  }

  onSubmit = (e) => {
      e.preventDefault();
      var searchTermArray = this.title.value.split(" ");

      var city = searchTermArray.slice(2).join(' ');

      this.setState({
        city : city,
        category: searchTermArray[0],
      })

      var result = this.filterForCategory(city, searchTermArray[0]);

      var count = 0;
      var items = [];
      var objectList = [];

      result.forEach( restaurant => {
        restaurant.Categories.forEach( mItems => {
              mItems.MenuItems.forEach( item => {
                  if(item.Name.toLowerCase().includes(searchTermArray[0].toLowerCase())){
                      count += 1;
                      let object = {
                        Id: item.Id,
                        Name: item.Name,
                        Price: item.Price,
                        selected: false,
                      }
                      items.push(object)
                  }
              });
        });

        let object = {
          Id: restaurant.Id,
          Name: restaurant.Name,
          Suburb: restaurant.Suburb,
          LogoPath: restaurant.LogoPath,
          Rank: restaurant.Rank,
          ItemCount: count,
          MenuItems: items
        }

        objectList.push(object);
        count = 0;
        items = [];

      });

      this.sortArray(objectList);

      this.setState({ sortedRestaurants : []});
      this.setState( ({
        sortedRestaurants:objectList
      }));
  };

  filterForCategory = (city, category) => {
    let resultRestaurants = JSONData.filter(res => {
      if(city === ""){
        return res;
      }
      else if(res.City.toLowerCase().includes(city.toLowerCase())){
        return res;
      }
    });

    let result = resultRestaurants.filter( val => {
        let items = val.Categories.some(({MenuItems}) => MenuItems.some(({Name}) => Name.toLowerCase().includes(category.toLowerCase())));
        return items;
    })

    return result;
  }

  sortArray = (list) => {

    var data = list.sort( (a, b) => {
        if(a.ItemCount < b.ItemCount){
          return 1
        }
        else if(a.ItemCount === b.ItemCount){
          if(a.Rank > b.Rank){
            return 1
          }
          else{
            -1
          }
        }
        else{
          return -1
        }
    });

    return data;
  }

  render () {
    
    const noCategory = !this.state.category || (this.state.category && this.state.category.length === 0);

    return (
      <div className="Home">
        <span >
          <input type="text" placeholder="Search..." ref={(c) => this.title = c} name="title" />
          <button onClick={this.onSubmit}>Search</button>
        </span>
        { !noCategory && <h4><strong>{this.state.category}</strong> restaurants in <strong>{this.state.city}</strong> we found for you:</h4> }
        { <Restaurant data={this.state.sortedRestaurants}/> }
      </div>
    );
  }
}
