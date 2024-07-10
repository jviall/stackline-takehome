import { RootState, useAppSelector } from '../../redux/store';
import './ProductDetails.css';

function ProductDetails() {
  const product = useAppSelector((state: RootState) => state.product);

  return (
    <div className="productDetails">
      <img src={product.image} alt="Product" className="productImage" />
      <h2>{product.title}</h2>
      <p>{product.subtitle}</p>
      <div className="tags">
        {product.tags.map((tag, index) => (
          <span key={index} className='tag'>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
