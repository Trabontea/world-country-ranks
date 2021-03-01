import { StylesProvider } from "@material-ui/core";
import Layout from "../../components/layout/Layout"
import styles from "./Country.module.css"
import {format} from '../../utils.js';
import { useEffect, useState } from "react";

const getCountry = async(id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();
  return country
}

const Country = ({country}) => {
  console.log(country)
  const translations = Object.entries(country.translations);

  const [borders, setBorders] = useState([])

  const getBorders = async() => {
    // cand luam tarile de granita se mai face un request ptr acele tari
    const borders = await Promise.all(country.borders.map((border)=> getCountry(border)));
    
    // adaugam in state
    setBorders(borders)
  }

  useEffect(() => {
    getBorders();
  }, []);

  console.log(borders)

  
  return <Layout title={country.name}>
    <div>
      <div className={styles.overview_panel}>
        <div className={styles.overview_head}>
          <h1>{country.name}</h1>
          <img src={country.flag} alt={country.name} />
        </div>
        <div className={styles.overview_region}>
          <span className={styles.label}>Region: </span>
          <span className={styles.value}>{country.region}</span>
        </div>
        
        <div className={styles.overview_subregion}>
          <span className={styles.label}>Subregion: </span>
          <span className={styles.value}>{country.subregion}</span>
        </div>

        <div className={styles.overview_numbers}>
          <div className={styles.overview_population}>
            <span className={styles.label}>Population: </span>
            <span className={styles.value}>{format(country.population)}</span>
          </div>
      
          <div className={styles.overview_area}>
            <span className={styles.label}>Area: </span>
            <span className={styles.value}>{format(country.area)}</span>
          </div>
        </div>
      </div>
      <div className={styles.details_panel}>
        <h4 className={styles.details_panel_heading}>Details</h4>
        
        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Capital</div>
          <div className={styles.details_panel_value}>{country.capital}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Languages</div>
          <div className={styles.details_panel_value}>{country.languages.map(({name}) => name).join(", ")}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Currencies</div>
          <div className={styles.details_panel_value}>
            {country.currencies.map(({ name }) => name).join(", ")}
            <span> {country.currencies.map(({ symbol }) => symbol).join(", ")}</span>
          </div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Native Languages</div>
          <div className={styles.details_panel_value}>{country.nativeName}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Gini</div>
          <div className={styles.details_panel_value}>{country.gini}%</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Regional Block</div>
          <div className={styles.details_panel_value}>{country.regionalBlocs.map(({name}) => name).join(", ")}
            <span> - {country.regionalBlocs.map(({acronym}) => acronym).join(", ")}</span>
          </div>

        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Numeric Code</div>
          <div className={styles.details_panel_value}>{country.numericCode}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Time Zone</div>
          <div className={styles.details_panel_value}>{
            country.timezones.length <= 1 ? country.timezones : country.timezones.map((el, i) =>
              <span key={i}> {el}, </span>)}
            </div>
         
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Calling Code</div>
          <div className={styles.details_panel_value}>{country.callingCodes}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Top Level Domain</div>
          <div className={styles.details_panel_value}>{country.topLevelDomain}</div>
        </div>

        
        {/* <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Translations</div>
          <div className={styles.details_panel_value}>
            {translations.map((el)=><span key={el[0]}><span>{el[0]}</span><span> :{el[1]} </span></span> )}
          </div>
        </div> */}

        <div className={styles.details_panel_borders}>
          <div className={styles.details_panel_border_label}>Neighbouring countries</div>
          
          <div className={styles.details_panel_borders_cnt}>
            {borders.map(({alpha2Code ,flag, name})=> (
              <div className={styles.details_panel_borders_country} key={alpha2Code}>
                <img src={flag} alt={name} />
                <div className={styles.details_panel_borders_name}>{name}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </Layout>
}

export default Country;

export const getServerSideProps = async({params}) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country
    },
  };
};