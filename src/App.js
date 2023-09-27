import "bootstrap/dist/css/bootstrap.min.css";

import DormAdmin from "./components/DormAdmin";
import DormTypeAdmin from "./components/DormTypeAdmin";
import DormUser from "./components/DormUser";
import DormTypeUser from "./components/DormTypeUser";
import UserInfo from "./components/UsersInfo";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <>
      {/* <UserInfo></UserInfo> */}
      {/* <ImageUpload></ImageUpload> */}
      <DormAdmin></DormAdmin>
      <DormUser></DormUser>
      
      <DormTypeAdmin></DormTypeAdmin>
      <DormTypeUser></DormTypeUser>

      
    </>
  );
}

export default App;
