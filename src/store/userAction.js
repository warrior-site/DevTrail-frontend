import axios from "axios"
import { removeUser, setError, setLoading, setUser,setMessage } from "./userSlice";


export const checkAuthStatus = () => async (dispatch,getstate) =>{
  dispatch(setLoading(true));
  try {
    const response = await axios.get("http://localhost:5000/api/auth/check-auth", { withCredentials: true });
    dispatch(setUser(response.data.user));
    dispatch(setMessage(response.data.message));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
}

export const signupUser = (userData) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", userData, { withCredentials: true });
    dispatch(setUser(response.data.user));
    dispatch(setMessage(response.data.message));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", userData, { withCredentials: true });
    // ✅ Save only the user, not the whole response
    dispatch(setUser(response.data.user));
    dispatch(setMessage(response.data.message));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser =()=> async(dispatch,getState)=>{
  dispatch(setLoading(true));
  // console.log("hitted")
try {
    await axios.post("http://localhost:5000/api/auth/logout",{}, {withCredentials:true});
    // console.log("hitted")
    dispatch(removeUser());
    // console.log("hitted")
    dispatch(setMessage(response.data.message));
    // console.log("hitted")
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
}

export const updateProfile = (profileData,userId) => async (dispatch, getState) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.post(`http://localhost:5000/api/user/update-user/${userId}`, profileData, { withCredentials: true });
    dispatch(setUser(response.data.user));
    dispatch(setMessage(response.data.message));
    console.log("Profile updated successfully");
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
}


