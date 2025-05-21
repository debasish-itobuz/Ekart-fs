import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//for buyer
export const getAllProducts = createAsyncThunk(
  "productSlice/getAllProducts",
  async (params = {}, { rejectWithvalue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        "http://localhost:8000/product/searchSortPaginate",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params,
        }
      );
      console.log("res", res.data);
      return res.data;
    } catch (error) {
      console.log("err", error);

      return rejectWithvalue(error);
    }
  }
);

//for seller
export const getAll = createAsyncThunk(
  "productSlice/getAll",
  async (_, { rejectWithvalue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get("http://localhost:8000/product/getAll", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Seller res", res.data);
      return res.data;
    } catch (error) {
      console.log("err", error);

      return rejectWithvalue(error);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    product: [],
    currentPage: 1,
    totalPage: 1,
    loading: false,
    error: null,
    sortField: "name",
    sortOrder: "asc",
    debouncedSearch: "",
    id: "",
    sellerProduct: [],
  },

  reducers: {
    // for parameters and states
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setDebouncedSearch: (state, action) => {
      state.debouncedSearch = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //buyer
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product || [];
        state.totalPage = Math.max(
          1,
          action.payload.pagination?.totalPages || 1
        );
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //seller
      .addCase(getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerProduct = action.payload.data || [];
        state.error = null;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setDebouncedSearch,
  setSortField,
  setSortOrder,
  setCurrentPage,
  setTotalPage,
  setId,
} = productSlice.actions;

export default productSlice.reducer;
