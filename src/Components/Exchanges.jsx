import React from "react";
import {
  useGetExchangesQuery,
} from "../Redux Services/CryptoAPI";
import { Table } from "antd";

function Exchanges() {
  const { data: Exchange, isFetching } = useGetExchangesQuery();
  const ExchangeList = Exchange?.data?.exchanges;
  if (isFetching) return "Loading...";

  const columns = [
    { title: "Rank", dataIndex: "rank", key: "rank" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "No of Market",
      dataIndex: "numberOfMarkets",
      key: "numberOfMarkets",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.coinrankingUrl}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={ExchangeList}
      />
    </div>
  );
}

export default Exchanges;
