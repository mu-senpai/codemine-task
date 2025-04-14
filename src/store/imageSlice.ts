import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/utils/supabaseClient';

export type ImageType = {
  id: string;
  title: string;
  url: string;
};

export const fetchImages = createAsyncThunk('images/fetchImages', async (page: number) => {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .order('id', { ascending: false })
    .range((page - 1) * 12, page * 12 - 1);

  if (error) throw error;
  return data as ImageType[];
});

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    data: [] as ImageType[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchImages.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const imageReducer = imageSlice.reducer;