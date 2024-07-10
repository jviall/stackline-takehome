import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductData } from '../actions/productActions';
import { Product } from '../../types/Product';

const initialState: Product = {
  id: '',
  title: '',
  image: '',
  subtitle: '',
  brand: '',
  reviews: [],
  retailer: '',
  details: [],
  tags: [],
  sales: []
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.fulfilled, (__, action: PayloadAction<Product>) => {
      return action.payload;
    });
  }
});

export default productSlice.reducer;
