import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
export default function Home({ products }) {
  return (
    <>
      <main>
        <HeroBanner />
        {/* <h1>{products?.data?.[0].attributes.name}</h1> */}
        <Wrapper>
          {/* Heading & paragraph start */}
          <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Cushioning for your miles
            </div>
            <div className="text-md md:text-xl">
              A lightweight Nike ZoomX midsole is combined with increased stack heights to help provide cushioning during extended streches of running.
            </div>
          </div>
          {/* Heading & paragraph end */}

          {/* Product Catalog Start */}
          <div className="grid drid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-14 px-5 md:px-0">
            {products.data.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
            {/* <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />  */}
          </div>
          {/* Product Catalog End */}


        </Wrapper>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const products = await fetchDataFromApi("/api/products?populate=*")

  return {
    props: {products: products}
  }
}