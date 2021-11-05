import styles from './CountryTable.module.css';
import {KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@material-ui/icons";
import {useState} from 'react';
import {format} from '../../utils.js';
import Link from 'next/link';

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
    if (!direction) {
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
      <div className={styles.heading_flag}/>

      <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection('cca2')}
      >
        <div>Name</div>
        {value === 'cca3' && <SortArrow direction={direction}/>}
      </button>

      <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}>
        <div>Population</div>
        {value === 'population' && <SortArrow direction={direction}/>}
      </button>

      <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}>
        <div>Area <span className={styles.heading_km}>(km<sup style={{fontSize: "0.5rem"}}>2</sup>)</span></div>
        {value === 'area' && <SortArrow direction={direction}/>}
      </button>

      <button
          className={styles.heading_gini}>
          {/*onClick={() => setValueAndDirection('gini')}>*/}

        <div>Gini</div>
        {/*{value === 'gini' && <SortArrow direction={direction}/>}*/}
      </button>

    </div>
    {orderedCountries.map((country) => (
        <Link href={`/country/${country.name.common}`} key={country.cca3}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img className={styles.flag_img} src={country.flags.svg} alt={country.flag}/>
            </div>
            <div className={styles.name}>{country.name.common}</div>
            <div className={styles.population}>{format(country.population)}</div>
            <div className={styles.area}>{format(country.area) || 0}</div>
            <div className={styles.gini}>{country.gini === undefined ? 'N/A' : Object.values(country.gini)[0]}</div>
          </div>
        </Link>
      )
    )}
  </div>
}

export default CountryTable;