import axios from "axios";

export const fetchContactData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/contacts/");
      console.log("res", res);
      return res; // <-- this line is missing in your code
    } catch (error) {
      console.error("Error fetching organizations", error);
      return { data: [] }; // optional: return empty structure for safety
    }
  };
export const fetchData = async () => {
  try {
      const res = await axios.get("http://127.0.0.1:8000/organizations/");
      console.log("res",res);
  } catch (error) {
      console.error("Error fetching organizations", error);
  }
};