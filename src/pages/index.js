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
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  )

  const onInputChange = (e) =>{
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase())
  }

  return <Layout>
      <div className={styles.counts}> Found {countries.length} Countries </div>

      <SearchInput
          placeholder="Filter by Name, region or Subregin"
          onChange = {onInputChange}
      />

      <CountryTable countries={filteredCountries} />
    </Layout>


}

export const getStaticProps = async() => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return {
    props : {
      countries,
    }
  }
}