import { useParams } from 'react-router-dom'
export const ProductPage = () => {
  const { id } = useParams()
  return (
    <div>Product {id}</div>
  )
}
