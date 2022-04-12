import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Product from './Product'
import Wrapper from '../assets/wrappers/ProductsContainer'
import PageBtnContainer from './PageBtnContainer'

const ProductsContainer = () => {
  const {
    getProducts,
    products,
    isLoading,
    page,
    totalProducts,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return <Loading center />
  }

  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>No products to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalProducts} product{products.length > 1 && 's'} found
      </h5>
      <div className='products'>
        {products.map((product) => {
          return <Product key={product._id} {...product} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default ProductsContainer
