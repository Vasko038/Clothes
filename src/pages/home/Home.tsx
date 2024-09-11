import { Button, Typography } from "antd";
import section1Image from "../../images/Group 1.svg";
import Card from "../../components/web sites/home/Card";
function Home() {
  return (
    <>
      <div className="flex justify-between items-center bg-slate-100">
        <div className="flex flex-col">
          <Typography.Title level={1}>Fresh Arrivals Online</Typography.Title>
          <Typography.Text>
            Discover Our Newest Collection Today.
          </Typography.Text>

          <Button type="primary" size="large" className="mt-12 flex-shrink-0">
            View Collection
          </Button>
        </div>
        <img src={section1Image} alt="" />
      </div>
      <div className="grid grid-cols-3 gap-3 py-[80px]">
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}

export default Home;
