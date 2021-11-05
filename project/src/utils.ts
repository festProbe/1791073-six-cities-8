import { City } from './types/offer';

export function getUniqueCities(citiesTest: City[]): City[] {
  const newCities = [];
  newCities.push(citiesTest[0]);
  for (let i = 0; i < citiesTest.length; i++) {
    for (let y = citiesTest.length - 1; y >= i; y--) {
      if (citiesTest[i].name !== citiesTest[y].name && !newCities.some((city) => city.name === citiesTest[i].name)) {
        newCities.push(citiesTest[i]);
      }
    }
  }
  return newCities;
}
