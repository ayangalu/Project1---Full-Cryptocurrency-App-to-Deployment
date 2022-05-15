import React from 'react'
import millify from 'millify'
import { Typography } from 'antd';
import { Statistic, Row, Col} from 'antd';
import { Cryptocurrencies, News} from './indexComponents'
import {Link} from 'react-router-dom'
import { useGetALLCryptosQuery} from '../Redux Services/CryptoAPI';


function Homepage() {
    const { Title } = Typography;
    const {data: cryptos, isFetching} = useGetALLCryptosQuery(10)

    const cryptoStats = cryptos?.data?.stats
    if (isFetching) return 'Loading...'


  return (
    <div>
        <Title>Global Crypto Stats</Title> 
        <Row gutter={16}>
            <Col span={12}>
            <Statistic title="Global Cryptocurrencies" value={cryptoStats?.total} />
            </Col>
            <Col span={12}>
            <Statistic title="Total Exchanges" value={cryptoStats?.totalExchanges} />
            </Col>
            <Col span={12}>
            <Statistic title="Total Market Cap" value={cryptoStats?.totalMarketCap && millify(cryptoStats?.totalMarketCap)} />
            </Col>
            <Col span={12}>
            <Statistic title="Total 24h Volume" value={cryptoStats?.total24Volume && millify(cryptoStats?.total24hVolume)} />
            </Col>
            <Col span={12}>
            <Statistic title="Total Market" value={cryptoStats?.totalMarkets} />
            </Col>
        </Row>

        <Row justify="space-between" style={{paddingTop:16}} >
            <Title level={3}>Top 10 Cryptos in the world</Title>
            <h4><Link to={'/cryptocurrencies'}>See more</Link></h4 >
        </Row>
        <Cryptocurrencies min />
        <Row justify="space-between" style={{paddingTop:16}} >
            <Title level={3}>Latest Cryptocurrency News</Title>
            <h4><Link to={'/cryptocurrencies'}>See more</Link></h4 >
        </Row>
        <News min />

    </div>
  )
}

export default Homepage

