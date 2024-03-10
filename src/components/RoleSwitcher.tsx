import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './layouts/AppLayout';

export default function RoleSwitcher() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const toggleRole = (role: string) => {
    userContext?.setCurrentRole(role);
    navigate("/app" + (role ? "/" + role : ""))
  };

  return (
    <div className="flex items-center">
      <div role="tablist" className="tabs tabs-bordered">
        <a role="tab" className={"tab" + (userContext?.currentRole == "student" ? " tab-active" : "")} onClick={() => toggleRole('student')}>Student</a>
        <a role="tab" className={"tab" + (userContext?.currentRole == "presenter" ? " tab-active" : "")} onClick={() => toggleRole('presenter')}>Presenter</a>
      </div>
    </div>
  );
}
