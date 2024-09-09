import Title from "antd/es/typography/Title";
import { Loading } from "../../../components/Loading.tsx";
import { IOrder, IProduct } from "../../../interface";
import { useGetOrdersByUserIdQuery } from "../../../api/orders.ts";
import { useUser } from "../../../App.tsx";
import { useGetProductsQuery } from "../../../api/products.ts";
import { Button } from "antd";
import { Empty } from "antd";

export const Orders = () => {
  const { user } = useUser();
  const {
    data: orders,
    error,
    isLoading,
  } = useGetOrdersByUserIdQuery(user?.id ?? "");

  const { data: products } = useGetProductsQuery(undefined);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-600">Error occured</div>;

  return (
    <div className="ps-5">
      <Title level={3}>Orders</Title>
      <div>
        {orders.length ? (
          orders.map((order: IOrder, index: number) => {
            const product = products.find(
              (p: IProduct) => p.id === order.items[0].productId,
            );

            return (
              <div
                key={order.id}
                className="flex py-5 justify-between"
                style={
                  index % 2 == 0 ? { borderBottom: "1px solid #E9E9EB" } : {}
                }
              >
                <div className="flex">
                  <img
                    src={product.img}
                    style={{ width: "80px", height: "80px" }}
                    alt="product image"
                  />
                  <div className="ps-8 me-3 xl:me-16">
                    <Title level={5}>{product.title}</Title>
                    <p className="text-gray-600">Ordered on: {order.date}</p>
                    <p className="text-lg">
                      ${order.items[0].price * order.items[0].count}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Title
                    level={5}
                    className="mt-1"
                    style={
                      order.status == "Completed"
                        ? { color: "#00b96b" }
                        : { color: "red" }
                    }
                  >
                    {order.status}
                  </Title>
                  <Button type="default" style={{ borderColor: "black" }}>
                    View item
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-[100%] text-center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            <p>Your order history is waiting to be filled</p>
            <Button className="mt-4" type="primary">
              Start shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
