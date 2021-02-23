import styles from './CountryTable.module.css';
import {KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@material-ui/icons";
import {useState} from 'react';
import {format} from '../../utils.js';

const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)
  }

  if (direction === 'desc') {
    return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
  }
  return countries;
}

const SortArrow = ({direction}) => {
  if (!direction) {
    return <></>
  }
  if (direction === "desc") {
    return (
        <div className={styles.heading_arrow}>
          <KeyboardArrowDownRounded color="inherit"/>
        </div>
    );
  } else {
    return (
        <div className={styles.heading_arrow}>
          <KeyboardArrowUpRounded color="inherit"/>
        </div>
    );
  }
}

const CountryTable = ({countries}) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  // Order sort
  const orderedCountries = orderBy(countries, value, direction);

  // Switch arrow direction
  const switchDirection = () => {
    if(!direction) {
      setDirection('desc')
    } else if (direction === 'desc') {
      setDirection('asc')
    } else {
      setDirection(null)
    }
  }

  const setValueAndDirection = (value) => {
    switchDirection()
    setValue(value);
  }

  return <div>
    <div className={styles.heading}>
      <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}
      >
        <div>Name</div>
        <SortArrow direction={direction}/>
      </button>

      <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}>
        <div>Population</div>
        <SortArrow direction={direction}/>
      </button>

      <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}>
        <div>Area</div>
        <SortArrow direction={direction}/>
      </button>
    </div>
    {orderedCountries.map((country) => <div className={styles.row} key={country.alpha2Code}>
          <div className={styles.name}>{country.name}</div>
          <div className={styles.population}>{format(country.population)}</div>
          <div className={styles.area}>{format(country.area)}</div>
        </div>
    )}
  </div>
}

export default CountryTable;