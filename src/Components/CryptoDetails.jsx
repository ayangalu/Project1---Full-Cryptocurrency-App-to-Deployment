import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoQuery,
  useGetCoinHistoryQuery,
} from "../Redux Services/CryptoAPI";
import { Typography, Row, Col, Select } from "antd";
import LineChart from "./Linechart";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import {
  HourglassOutlined,
  MoneyCollectOutlined,
  RadiusBottomleftOutlined,
  RiseOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  CheckOutlined,
  FundOutlined,
  VerticalAlignMiddleOutlined,
} from "@ant-design/icons";

const Cryptodetails = () => {
  const { coinId } = useParams();

  const { data: coin, isFetching } = useGetCryptoQuery(coinId);
  const { data: coinHistory, isFetching2 } = useGetCoinHistoryQuery(coinId);
  const [timePeriod, setTimePeriod] = useState();

  const coinDetails = coin?.data?.coin;
  if (isFetching) return "Loading...";
  if (isFetching2) return "Loading...";

  const { Title, Text } = Typography;
  const { Option } = Select;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const coinStats = [
    {
      icon: <MoneyCollectOutlined />,
      comment: "Price to USD",
      value: `$ ${coinDetails?.price ? millify(coinDetails?.price) : ""}`,
    },
    { icon: <RiseOutlined />, comment: "Rank", value: coinDetails?.rank },
    {
      icon: <VerticalAlignMiddleOutlined />,
      comment: "24h Volume",
      value: `$ ${coinDetails?.volume ? coinDetails?.numberOfExhanges : ""}`,
    },
    {
      icon: <RadiusBottomleftOutlined />,
      comment: "Market Cap",
      value: `$ ${coinDetails?.marketCap ? coinDetails?.marketCap : ""}`,
    },
    {
      icon: <HourglassOutlined />,
      comment: "All time High",
      value: `$${
        coinDetails?.allTimeHigh?.price ? coinDetails?.allTimeHigh?.price : ""
      }`,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: coinDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        coinDetails?.supply?.total && millify(coinDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coinDetails?.supply?.circulating &&
        millify(coinDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="header-flex">
        <Col className="gutter-row" span={24}>
          <Title>
            {coin?.data?.coin.name} ({coin?.data?.coin.symbol}) Value Statistics
          </Title>
          <Text>
            An overview showing the statistics of {coinDetails.name}, rank and
            many other information
          </Text>
        </Col>
        <Col span={24}>
          <Select
            style={{ width: 240, marginTop: 6 }}
            defaultValue="7d"
            className="select-timeperiod"
            placeholder="Select Timeperiod"
            onChange={(value) => setTimePeriod(value)}
          >
            {time.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
          </Select>
        </Col>
      </Row>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coinDetails?.price)}
        coinName={coinDetails?.name}
      />
      <Row span={24} style={{ marginTop: 16 }} gutter={16}>
        <Col span={12}>
          <Col>
            <Title level={3}>{coinDetails.name} Value Statistics</Title>
            <p>
              An overview showing the statistics of {coinDetails.name}, such as
              the base and quote currency, the rank, and trading volume.
            </p>
          </Col>

          {coinStats.map(({ icon, title, value }, i) => (
            <Col key={i} className="space-align">
              <Col className="space-align-text">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text span={8}>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col span={12}>
          <Col>
            <Title level={3}>Other Stats Info</Title>
            <p>
              An overview showing the statistics of {coinDetails.name}, such as
              the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }, i) => (
            <Col key={i} className="space-align">
              <Col className="space-align-text">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text>{value}</Text>
            </Col>
          ))}
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Row>
          <Title level={3}>What is {coinDetails.name}?</Title>
          {HTMLReactParser(coinDetails.description)}
        </Row>
        <Col>
          <Title level={3}>{coinDetails.name} Links</Title>
          {coinDetails.links?.map((link) => (
            <Row key={link.name}>
              <Title level={5}>{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Cryptodetails;
