import { useEffect } from "react";
import request from "@/utils/request";
import axios from "axios";
import { showLoading } from "@/utils/loading";
export default function Login() {

  useEffect(() => {

    request.get('/users', {
      params: {
        id: 12345
      }
    }).then(response => {
      console.log("User data fetched successfully:", response.data);
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  //  request.get('/users',{
  //   id: 12345
  //  }).catch(error => {
  //   alert("Error fetching user data");
  //    console.error("Error fetching user data:", error);
  //  });
  }, []);
  return (
    <div className="welcome">
      Login
    </div>
  );
}
