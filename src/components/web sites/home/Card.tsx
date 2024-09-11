import { Typography } from "antd";

function Card() {
  return (
    <div className="flex  flex-col p-3">
      <div className="rounded-full h-[60px] w-[60px] aspect-square bg-slate-50 flex justify-center items-center mb-3">
        Icon
      </div>
      <Typography.Title level={4} className="font-bold">
        Free Shipping
      </Typography.Title>
      <Typography>
        Upgrade your style today and get FREE shipping on all orders! Don't miss
        out
      </Typography>
    </div>
  );
}

export default Card;
