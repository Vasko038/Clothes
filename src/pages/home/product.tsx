import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useGetProductByIdQuery } from "../../api/products.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Loading } from "../../components/Loading.tsx";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Col, Row } from "antd";

export const Product = () => {
  const location = useLocation();
  const params = queryString.parse(location.search, {
    parseNumbers: true,
    parseBooleans: true,
  });

  const { data: product, isLoading } = useGetProductByIdQuery(
    params?.id ? String(params.id) : "",
  );

  if (isLoading) return <Loading />;

  return (
    <div>
      <Row>
        <Col span={12} className="px-2">
          <Swiper
            className="w-[100%] h-[500px] "
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {product.images.map((i: { color: string; image: string }) => (
              <SwiperSlide className="w-[100%]">
                <img className="w-[100%]" src={i.image} alt="product image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col span={12} className="px-2"></Col>
      </Row>
    </div>
  );
};
