import ProductCard from '@/components/ProductCard';
import Wrapper from '@/components/Wrapper';
import { fetchDataFromApi } from '@/utils/api';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import  useSWR  from 'swr';


const maxResult = 3;

function Category({ category, products, slug }) {

  const [pageIndex, setPageIndex] = useState(1)

  const { query } = useRouter()


  useEffect(() => {
    setPageIndex(1)
  
    
  }, [query])
  

  const { data, error, isLoading } = useSWR(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`, fetchDataFromApi, {
    fallbackData: products
  })

  // const router = useRouter();
  // const slug = router.query;
  // console.log(slug)
  return (
    <div className='w-full md:py-20 relative'>
      <Wrapper>
        <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
          <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
            {category?.data[0]?.attributes?.name}
          </div>
        </div>

        {/* Product Catalog Start */}
        <div className="grid drid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-14 px-5 md:px-0">
          {data?.data?.map((product) => (
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

        {/* PAGINATION BUTTONS START */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${data && data.meta.pagination.pageCount
              }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={
                pageIndex ===
                (data && data.meta.pagination.pageCount)
              }
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* PAGINATION BUTTONS END */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}

      </Wrapper>
    </div>
  )
}

export default Category

export async function getStaticPaths() {
  const category = await fetchDataFromApi('/api/categories?populate=*');
  const path = category?.data?.map((c) => ({
    params: {
      slug: c.attributes.slug
    }
  }))

  return {
    paths: [],
    fallback: false
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params: { slug } }) {
  const category = await fetchDataFromApi(`/api/categories?filters[slug][$eq]=${slug}`)
  const products = await fetchDataFromApi(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`)

  return {
    // Passed to the page component as props
    props: {
      category,
      products,
      slug,
    },
  }
}