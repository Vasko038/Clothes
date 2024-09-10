import { useUser } from "../../../App.tsx";
import { useGetProductsQuery } from "../../../api/products.ts";
import { Loading } from "../../../components/Loading.tsx";
import {
  useDeleteWishlistMutation,
  useGetWishlistByUserIdQuery,
} from "../../../api/wishlist.ts";
import Title from "antd/es/typography/Title";
import { IProduct, IWishlist } from "../../../interface";
import { Button, Empty, message } from "antd";

export const Wishlist = () => {
  const { user } = useUser();
  const {
    data: wishlist,
    error,
    isLoading,
  } = useGetWishlistByUserIdQuery(user?.id ?? "");

  const { data: products } = useGetProductsQuery(undefined);
  const [deleteWishlist] = useDeleteWishlistMutation();

  const onDelete = (id: number | string) => {
    try {
      deleteWishlist(id);
      message.success("Wishlist deleted");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-600">Error occured</div>;

  return (
    <div className="ps-5">
      <Title level={3}>Wishlist</Title>
      <div>
        {wishlist.length ? (
          wishlist.map((wish: IWishlist) => {
            const product = products.find(
              (p: IProduct) => p.id === wish.productId,
            );

            return (
              <div
                key={wish.id}
                className="flex py-5 justify-between"
                style={{ borderBottom: "1px solid #E9E9EB" }}
              >
                <div className="flex">
                  <img
                    src={product.img}
                    style={{ width: "80px", height: "80px" }}
                    alt="product image"
                  />
                  <div className="ps-8 me-3 xl:me-16">
                    <Title level={5}>{product.title}</Title>
                    <p className="text-lg">${product.price}.00</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Title
                    level={5}
                    className="mt-1"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      if (wish.id) onDelete(wish.id);
                    }}
                  >
                    Remove
                  </Title>
                  <Button type="default" style={{ borderColor: "black" }}>
                    Add to cart
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-[100%] text-center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            <p>Your wishlist is waiting to be filled</p>
            <Button className="mt-4" type="primary">
              Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
