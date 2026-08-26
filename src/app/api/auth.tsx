import { RootState } from "@/src/store/reduxStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const LoginApi = createAsyncThunk<
  any,
  void,
  { rejectValue: { message: string } }
>("auth/login", async (_, { getState, rejectWithValue }) => {
  try {
    const { email, pin } = (getState() as RootState).login;

    const loginRes = await axios.post(
      `https://backend-bele.omnisuiteai.com/auth/login`,
      { identifier: email, pin },
    );

    const { access_token } = loginRes.data;

    if (!access_token) {
      return rejectWithValue({ message: "Login failed: No access token" });
    }

    const meRes = await axios.get(
      `https://backend-bele.omnisuiteai.com/user/me`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    const custNo = meRes.data?.user?.custNo;

    if (custNo) {
      localStorage.setItem("custNo", custNo);
    }

    // Save access_token for components that can't access Redux (e.g. ChatWindow)
    localStorage.setItem("access_token", access_token);

    // Save user data for chatbot
    if (meRes.data) {
      localStorage.setItem("userData", JSON.stringify(meRes.data));
    }

    return {
      ...loginRes.data,
      custNo: custNo || null,
    };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || { message: "Something went wrong" },
    );
  }
});

export const DeleteCustomerApi = createAsyncThunk<
  any,
  void,
  { rejectValue: { message: string } }
>("customer/delete", async (_, { getState, rejectWithValue }) => {
  try {
    const custNo = localStorage.getItem("custNo");

    if (!custNo) {
      return rejectWithValue({ message: "Customer number not found" });
    }

    await axios.delete(
      `https://backend-bele.omnisuiteai.com/api/v1/customers/${custNo}`,
    );

    localStorage.removeItem("custNo");

    return { custNo };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || { message: "Failed to delete customer" },
    );
  }
});
