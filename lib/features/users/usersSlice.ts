import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  followers: User[];
  followings: User[];
  user: User | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: UserState = {
  followers: [],
  followings: [],
  user: null,
  loading: false,
  error: null,
};

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (token: string) => {
    const response = await axios.get(
      process.env["NEXT_PUBLIC_API_URL"] + "me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

export const fetchFollowers = createAsyncThunk(
  "user/fetchFollowers",
  async ({ token, id }: { token: string; id: number }) => {
    const response = await axios.get(
      process.env["NEXT_PUBLIC_API_URL"] + "follow/followers/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchFollowing = createAsyncThunk(
  "user/fetchFollowing",
  async ({ token, id }: { token: string; id: number }) => {
    const response = await axios.get(
      process.env["NEXT_PUBLIC_API_URL"] + "follow/followings/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    // return response.data;
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ token, user }: { token: string; user: User }) => {
    try {
      const response = await axios.post(
        process.env["NEXT_PUBLIC_API_URL"] + "follow/add/" + user.id,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status === 200;
    } catch (e) {
      console.log(e);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async ({ token, id }: { token: string; id: number }) => {
    try {
      const response = await axios.post(
        process.env["NEXT_PUBLIC_API_URL"] + "follow/remove/" + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status === 200;
    } catch (e) {
      console.log(e);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // reset state
    reset: (state) => {
      state.followers = [];
      state.followings = [];
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(fetchFollowers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchFollowers.fulfilled, (state, action) => {
      state.followers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchFollowers.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(fetchFollowing.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchFollowing.fulfilled, (state, action) => {
      state.followings = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchFollowing.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(followUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.loading = false;
      state.followings.push(action.meta.arg.user);
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(unfollowUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      state.loading = false;
      state.followings = state.followings.filter(
        (f) => f.id !== action.meta.arg.id
      );
    });
    builder.addCase(unfollowUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export const { reset } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;
export const selectFollowers = (state: any) => state.user.followers;
export const selectFollowing = (state: any) => state.user.following;
export const selectLoading = (state: any) => state.user.loading;
export const selectError = (state: any) => state.user.error;
