import { StylesProvider } from "@material-ui/core";
import Layout from "../../components/layout/Layout";
// import Link from "next/Link"
import styles from "../../styles/Country.module.css"
import {format} from '../../utils.js';
import { useEffect, useState } from "react";
import {removePathTrailingSlash} from "next/dist/client/normalize-trailing-slash";

const getCountry = async(name) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const country = await res.json();
  return country
}

const Country = ({country}) => {
  console.log('country', country)
  const translations = Object.entries(country[0].translations);
  console.log(translations)

  // const [borders, setBorders] = useState([])
  // const getBorders = async() => {
  //   //cand luam tarile de granita se mai face un request ptr acele tari
  //   const borders = await Promise.all(country[0].borders.map((border)=> getCountry(border)));
  //
  //   //adaugam in state
  //   setBorders(borders)
  // }
  // useEffect(() => {
  //   getBorders();
  // }, []);

  return <Layout >
    <div>
      <div className={styles.overview_panel}>
        <div className={styles.overview_head}>
          <div>
            <h1>{country[0].name.common}</h1>
            <h2>{country[0].name.official}</h2>
          </div>

          <img src={country[0].flags.svg} alt={country[0].name.common} />
        </div>
        <div className={styles.overview_region}>
          <span className={styles.label}>Region: </span>
          <span className={styles.value}>{country[0].region}</span>
        </div>

        <div className={styles.flx_sp}>
          <div className={styles.overview_subregion}>
            <span className={styles.label}>Subregion: </span>
            <span className={styles.value}>{country[0].subregion}</span>
          </div>

          <div className={styles.overview_subregion}>
            <span className={styles.label}>Continents: </span>
            <span className={styles.value}>{country[0].continents[0]}</span>
          </div>
        </div>

        <div className={styles.overview_numbers}>
          <div className={styles.overview_population}>
            <span className={styles.label}>Population: </span>
            <span className={styles.value}>{format(country[0].population)}</span>
          </div>

          <div className={styles.overview_area}>
            <span className={styles.label}>Area: </span>
            <span className={styles.value}>{format(country[0].area)}</span>
          </div>
        </div>
      </div>

      <div className={styles.overview_panel}>
        <div className={styles.overview_head}>
          <div>
            <h2>Coat of Arms</h2>
          </div>
          <img src={country[0].coatOfArms.svg}  className={styles.stema} alt={country[0].name.common} />
        </div>
      </div>


      <div className={styles.details_panel}>
        <h4 className={styles.details_panel_heading}>Details</h4>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Capital</div>
          <div className={styles.details_panel_value}>{country[0].capital[0]}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Capital Info</div>
          <div className={styles.details_panel_value}>Lat: {country[0].capitalInfo.latlng[0]}, Lon:{country[0].capitalInfo.latlng[1]} </div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Languages</div>
          <div className={styles.details_panel_value}>{Object.values(country[0].languages).join(" , ")}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Currencies</div>
          <div className={styles.details_panel_value}>
            {Object.values(Object.values(country[0].currencies)[0]).join(" , Symbol: ")}
          </div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Start of the week</div>
          <div className={styles.details_panel_value}>{country[0].startOfWeek}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Gini</div>
          <div className={styles.details_panel_value}>{country[0].gini === undefined ? 'N/A' : Object.values(country[0].gini)[0]}%</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Status</div>
          {/*<div className={styles.details_panel_value}>{country[0].regionalBlocs.map(({name}) => name).join(", ")}*/}
          {/*  <span> - {country[0].regionalBlocs.map(({acronym}) => acronym).join(", ")}</span>*/}
          {/*</div>*/}
          <div className={styles.details_panel_value}>
            {country[0].status}
          </div>

        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Numeric Code</div>
          <div className={styles.details_panel_value}>{country[0].idd.root}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Calling Code</div>
          <div className={styles.details_panel_value}>{country[0].idd.suffixes[0]}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Time Zone</div>
          <div className={styles.details_panel_value}>{
            country[0].timezones.length <= 1 ? country[0].timezones : country[0].timezones.map((el, i) =>
              <span key={i}> {el}, </span>)}
            </div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Top Level Domain</div>
          <div className={styles.details_panel_value}>{country[0].tld[0]}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Google Map</div>
          <div className={styles.details_panel_value}>
            <a href={country[0].maps ? country[0].maps.googleMaps : ''} className="href" target="_blank">Map</a>
          </div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Street Map</div>
          <div className={styles.details_panel_value}>
            <a href={country[0].maps ? country[0].maps.openStreetMaps : ''} className="href" target="_blank">Map</a>
          </div>
        </div>

        {/*<div className={styles.details_panel_borders}>*/}
        {/*  <div className={styles.details_panel_border_label}>Neighbouring countries</div>*/}
        {/*  <div className={styles.details_panel_borders_cnt}>*/}
        {/*    {borders.map(({alpha3Code ,flag, name})=> (*/}
        {/*      <Link href={`/country/${alpha3Code}`} key={alpha3Code}>*/}
        {/*        <div className={styles.details_panel_borders_country} >*/}
        {/*          <img src={flag} alt={name} />*/}
        {/*          <div className={styles.details_panel_borders_name}>{name}</div>*/}
        {/*        </div>*/}
        {/*      </Link>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Translations</div>
          <div className={styles.details_panel_value}>
            {translations.map((el)=><span key={el[0]}><span>{el[0]}</span><span> :{el[1]} </span></span> )}
          </div>
        </div> */}

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Neighbouring countries</div>
          <div className={styles.details_panel_value}>
            {country[0].borders ? country[0].borders.map((name, i)=> <span key={i}>{name} </span>): 'N/A'}
          </div>
        </div>
      </div>
    </div>
  </Layout>
}

export default Country;

export const getServerSideProps = async({params}) => {
  const country = await getCountry(params.name);
  return {
    props: {
      country
    },
  };
};