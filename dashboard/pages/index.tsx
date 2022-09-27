import type { NextPage } from 'next'
import Head from 'next/head'
import Dashboard from  '../components/pages/Dashboard'


const Home: NextPage = () => {
  
  return (
   <div>
      <Head>
        <title>Diemsion Dashboard</title>
        <meta name="description" content="Best pizza shop in town" />
        <a rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
   </div>
  );
}

export default Home
