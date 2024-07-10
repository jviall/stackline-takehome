import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { fetchData } from '../../api/api';

export const fetchProductData: AsyncThunk<Product, void, {}> = createAsyncThunk(
  'product/fetchData',
  fetchData
);
