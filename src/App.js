import React from 'react'
import {Routes, Route} from 'react-router-dom' 
import {Homepage, Cryptocurrencies, Cryptodetails, Exchanges, News, Navbar} from './Components/indexComponents'
import { Layout } from 'antd';
import './App.css'

function App() {
  const { Content, Footer, Sider } = Layout;
  return (
    <div className='app'>
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
         <Navbar />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, paddingTop:8, minHeight: 360 }}>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies/>} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/news' element={<News />} />
              <Route path='/crypto/:coinId' element={<Cryptodetails /> } />
            </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Cryptocurrency Application</Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default App