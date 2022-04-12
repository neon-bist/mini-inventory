import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    product_name,
    stock,
    description,
    handleChange,
    clearValues,
    createProduct,
    editProduct,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!stock || !product_name) {
      displayAlert()
      return
    }
    if (isEditing) {
      editProduct()
      return
    }
    createProduct()
  }

  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit product' : 'add product'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* Product Name */}
          <FormRow
            type='text'
            name='product_name'
            labelText='Product Name'
            value={product_name}
            handleChange={handleInputChange}
          />
          {/* company */}
          <FormRow
            type='text'
            name='stock'
            value={stock}
            handleChange={handleInputChange}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='Description'
            name='description'
            value={description}
            handleChange={handleInputChange}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
