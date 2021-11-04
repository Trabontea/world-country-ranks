import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import CountryTable from "../components/CountriesTable/CountryTable";
import {useState} from "react";

export default function Home({countries}) {
  console.log(countries)
  const [keyword, setKeyword] = useState("")

  const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword)
      // country.subregion.toLowerCase().includes(keyword)
  )

  const onInputChange = (e) =>{
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase())
  }

  return <Layout>
    <div className={styles.inputContainer}>
      <div className={styles.counts}> Found {countries.length} Countries </div>

      <div className={styles.input}>
        <SearchInput
            placeholder="Filter by Name, region or Subregin"
            onChange = {onInputChange}
        />
      </div>
    </div>
     

      <CountryTable countries={filteredCountries} />
      {/*<CountryTable countries={countries} />*/}
    </Layout>


}

export const getStaticProps = async() => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  return {
    props : {
      countries,
    }
  }
}