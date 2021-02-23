import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import CountryTable from "../components/CountriesTable/CountryTable";

export default function Home({countries}) {
  console.log(countries)
  return <Layout>
      <div className={styles.counts}> Found {countries.length} Countries </div>

      <SearchInput placeholder="Filter by Name, region or Subregin"/>

      <CountryTable countries={countries} />
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