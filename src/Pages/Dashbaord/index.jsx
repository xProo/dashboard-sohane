import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SwapOutlined,
  PhoneFilled,
  LockFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { getOrders, getRevenue } from "../../API";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const proposal = 257;
  const ogprojects = 254;
  const coprojects = 2548;
  const Clients = 174;
  const revenue = 100222;
  const employee = 35;
  const labocontacteds = 374;

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={5}>Dashboard</Typography.Title>
      <Row gutter={20}>
        <Col xs={24} sm={12} md={6} lg={6}>
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 75,
                  fontSize: 48,
                  padding: 30,
                }}
              />
            }
            title={"Proposal"}
            value={proposal}
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 75,
                  fontSize: 48,
                  padding: 30,
                }}
              />
            }
            title={"Ongoing projects"}
            value={ogprojects}
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <DashboardCard
            icon={
              <SwapOutlined
                style={{
                  color: "black",
                  backgroundColor: "yellow",
                  borderRadius: 75,
                  fontSize: 48,
                  padding: 30,
                }}
              />
            }
            title={"Employee"}
            value={employee}
          />
        </Col>
        
        <Col xs={24} sm={12} md={6} lg={6}>
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 75,
                  fontSize: 48,
                  padding: 30,
                }}
              />
            }
            title={"Client"}
            value={Clients}
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <DashboardCard
            icon={
              <LockFilled 
                style={{
                  color: "white",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 75,
                  fontSize: 48,
                  padding: 30,
                }}
              />
            }
            title={"Carried out projects"}
            value={coprojects}
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <DashboardCard
            icon={
              <PhoneFilled 
                style={{
                  color: "white",
                  backgroundColor: "orange",
                  borderRadius: 75,
                  fontSize: 48,
                  padding: 30,
                }}
              />
            }
            title={"Labo contacted"}
            value={labocontacteds}
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 75,
                  fontSize: 48,
                  padding: 30,
                }}
              />
            }
            title={"Revenue"}
            value={revenue}
          />
        </Col>
      </Row>
      <Row gutter={25}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RecentOrders />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <DashboardChart />
        </Col>
      </Row>
    </Space>
  );
};

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 5));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `Pharma-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgb(8, 56, 110)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}

export default Dashboard;
