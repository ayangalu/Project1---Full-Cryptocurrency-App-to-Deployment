import React, { useState, useEffect } from "react";
import { useGetALLCryptosQuery } from "../Redux Services/CryptoAPI";
import { Card, Col, Row, Input, Typography } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";

function Cryptocurrencies({ min }) {
  const limited = min ? 10 : 100;
  const { data: allCryptos, isFetching } = useGetALLCryptosQuery(limited);
  const [cryptos, setCryptos] = useState();
  const [searchField, setSearchField] = useState("");
  useEffect(() => {
    const filteredCryptos = allCryptos?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchField.toLowerCase())
    );
    setCryptos(filteredCryptos);
  }, [allCryptos, searchField]);

  if (isFetching) return "Loading...";
  const { Search } = Input;
  const { Title } = Typography;

  return (
    <div className="site-card-wrapper">
      {!min ? (
        <div>
          <Row justify="center" style={{ paddingBottom: 16 }}>
            <Title level={3}>All Crptocurrencies</Title>
          </Row>
          <Row justify="center" style={{ paddingBottom: 16 }}>
            <Search
              placeholder="search cryptocurrencies"
              onChange={(e) => {
                setSearchField(e.target.value);
              }}
              style={{ width: 300 }}
            />
          </Row>
        </div>
      ) : null}
      <Row gutter={[32, 32]}>
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} md={8} lg={6} key={crypto.uuid}>
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={<img src={crypto.iconUrl} className="icon-url" />}
              >
                <p>Price: {millify(crypto.price)} </p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>
                  Daily Change:{" "}
                  <span className={crypto.change > 0 ? "success" : "danger"}>
                    {crypto.change}
                  </span>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Cryptocurrencies;
