import styles from "./Layout.module.css";
import Head from "next/head";
import Logo from "./Logo"

const Layout = ({children, title="World Ranks"}) => {
  return (
      <div className={styles.container}>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          <Logo></Logo>
        </header>

        {/***  this is the content ***/}
        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          Footer
        </footer>
      </div>
  )
}

export default Layout;