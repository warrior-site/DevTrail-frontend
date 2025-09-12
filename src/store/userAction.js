import axios from "axios"
import { removeUser, setError, setLoading, setUser,setMessage } from "./userSlice";

//http://localhost:5000
export const checkAuthStatus = () => async (dispatch,getstate) =>{
  dispatch(setLoading(true));
  try {
    const response = await axios.get("https://devtrail-backend.onrender.com/api/auth/check-auth", { withCredentials: true });
    dispatch(setUser(response.data.user));
    dispatch(setMessage(response.data.message));
    return response
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
}

export const signupUser = (userData) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post("https://devtrail-backend.onrender.com/api/auth/register", userData, { withCredentials: true });
    dispatch(setUser(response.data.user));
    dispatch(setMessage(response.data.message));
    return response
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post("https://devtrail-backend.onrender.com/api/auth/login", userData, { withCredentials: true });
    // ✅ Save only the user, not the whole response
    dispatch(setUser(response.data.user));
    dispatch(setMessage(response.data.message));
    return response
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
   const response = await axios.post("https://devtrail-backend.onrender.com/api/auth/logout",{}, {withCredentials:true});
    // console.log("hitted")
    dispatch(removeUser());
    // console.log("hitted")
    // dispatch(setMessage(response.data.message));
    // console.log("hitted")
    return response
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
}

export const updateProfile = (profileData,userId) => async (dispatch, getState) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.post(`https://devtrail-backend.onrender.com/api/user/update-user/${userId}`, profileData, { withCredentials: true });
    dispatch(setUser(response.data.user));
    dispatch(setMessage(response.data.message));
    console.log("Profile updated successfully");
    return response
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
}


