import { useEffect } from "react";
import request from "@/utils/request";
import axios from "axios";
import { showLoading } from "@/utils/loading";
export default function Login() {

  useEffect(() => {
    //main.tsx 下如果打开了react.strictMode ,那就是开发者模式，会打印多次请求信息，一般是2次
    request.post<string>('/users', {
      id: 12345
    }).then(response => {
      console.log("User data fetched successfully:", response);
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
