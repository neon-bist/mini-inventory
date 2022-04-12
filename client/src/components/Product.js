import moment from 'moment'
import { FaCalendarAlt, FaMoneyBill } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Product'
import ProductInfo from './ProductInfo'

const Product = ({
  _id,
  productName,
  stock,
  description,
  createdAt,
}) => {
  const { setEditProduct, deleteProduct } = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{productName.charAt(0)}</div>
        <div className='info'>
          <h5>{productName}</h5>
          <p>{description}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ProductInfo icon={<FaMoneyBill />} text={stock} />
          <ProductInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-product'
              className='btn edit-btn'
              onClick={() => setEditProduct(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteProduct(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Product
