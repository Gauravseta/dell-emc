import axios from 'axios';
import csv from "csvtojson";

export default async function loadMovies() {
  const data =  await getMovies();
  return data;
}

function getMovies() {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.PUBLIC_URL}/data/restaurants.csv`,
      method: 'GET',

    }).then((succ) => {
      csv({
        noheader: false,
        headers: ['Name','City','Cuisine Style','Ranking','Rating','Number of Reviews']
      }).fromString(succ.data).then((json) => {

        json = json.map((item) => {
          return {
            ...item,
          "CuisineStyle" : item["Cuisine Style"].replace(/\[|\]/gi,'').replace(/'/gi,'')
          }
        })
        resolve(json)
      })
    })
  });
}

