import { apiConnector } from "../apiConnector";
import { userendpoints } from "../apis";
import toast from "react-hot-toast";
const {
    GETUSER_API,
    ADDUSER_API
} =userendpoints;

//function to add user
export async function addUser(Data){
  const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", ADDUSER_API,Data, {
            "Content-Type": "multipart/form-data",
            });
            if (!response.data.success) {
              throw new Error(response.data.message);
            }

            toast.success("User added");
        }
        catch(error){
        console.error("Error adding user:", error);
            toast.error("Error adding user");
        }
        toast.dismiss(toastId);
}
//function to get users data
export const getUsers = async (page) => {

  try {
    const response = await apiConnector("GET", GETUSER_API, null, null, {
      page,
    });
    console.log("response",response)
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Error fetching users");
    return { error: "Failed to fetch users" };
  }

};
