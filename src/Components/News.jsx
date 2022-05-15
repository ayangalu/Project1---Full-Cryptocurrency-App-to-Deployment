import React, { useState } from "react";
import { useGetNewsQuery } from "../Redux Services/NewsApi";
import { Card, Col, Row, Select, Typography } from "antd";
import moment from "moment";
import { useGetALLCryptosQuery } from "../Redux Services/CryptoAPI";

function News({ min }) {

  const [crypto, setCrypto] = useState("cryptocurrency");
  const count = min ? 6 : 12;
  const { data: cryptos, isFetching1 } = useGetALLCryptosQuery(100);
  const { data: news, isFetching2 } = useGetNewsQuery({ crypto, count });
  const newsList = news?.value;
  const cryptoList = cryptos?.data?.coins;
  if (isFetching1) return "...Loading";
  if (isFetching2) return "...Loading";

  const { Title, Text } = Typography;
  const { Option } = Select;

  function handleChange(value) {
    setCrypto(value);
  }

  const placeholderImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  return (
    <div>
      {!min ? (
        <div>
          <Row justify="center" style={{ paddingBottom: 16 }}>
            <Title level={3}>Latest Cryptocurrencies News</Title>
          </Row>
          <Row justify="center" style={{ paddingBottom: 16 }}>
            <Select
              defaultValue={crypto}
              style={{ width: 240 }}
              onChange={handleChange}
            >
              {cryptos?.data?.coins.map((coin) => {
                return (
                  <Option key={coin.uuid} value={coin.name}>
                    {coin.name}
                  </Option>
                );
              })}
            </Select>
          </Row>
        </div>
      ) : null}

      <Row gutter={[32, 32]}>
        {newsList?.map((item, i) => (
          <Col xs={24} sm={24} md={12} lg={8} key={i}>
            <a href={item.url} target="_blank" rel="noreferrer">
              <Card>
                <div className="news-header">
                  <Title level={5}>{`${item.name.substring(0, 47)}...`}</Title>
                  <img
                    src={item?.image?.thumbnail?.contentUrl || placeholderImage}
                    alt=""
                    className="news-image"
                  />
                </div>

                <p>{`${item.description.substring(0, 40)}...`}</p>
                <div className="news-bottom">
                  <small>{item.provider.map((inner) => inner.name)}</small>
                  <Text style={{ fontSize: 10 }}>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default News;
