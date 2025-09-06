// journalAction.js
import axios from "axios";
import { setJournal, setLoading, setError } from "./journalSlice";

// Fetch all journals for a user
export const fetchJournals = (userId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://devtrail-backend.onrender.com/api/journal/all-journal/${userId}`
      );
      dispatch(setJournal(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Fetch a single journal by ID
export const fetchOneJournal = (journalId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://devtrail-backend.onrender.com/api/journal/get-one-journal/${journalId}`
      );
      dispatch(setJournal(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Create a new journal
export const createJournalAction = (journalData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `https://devtrail-backend.onrender.com/api/journal/create-journal`,
        journalData
      );
      dispatch(fetchJournals(journalData.userId)); // Refresh list
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Update an existing journal
export const updateJournalAction = (journalData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios.post(
        `https://devtrail-backend.onrender.com/api/journal/update-journal`,
        journalData
      );
      dispatch(fetchJournals(journalData.userId)); // Refresh list
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Delete a journal
export const deleteJournalAction = ({ journalId, userId }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios.post(
        `https://devtrail-backend.onrender.com/api/journal/delete-journal`,
        { journalId }
      );
      dispatch(fetchJournals(userId)); // Refresh list
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Star a journal
export const starJournalAction = ({ journalId, userId }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios.post(
        `https://devtrail-backend.onrender.com/api/journal/star-journal`,
        { journalId }
      );
      dispatch(fetchJournals(userId)); // Refresh list
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
