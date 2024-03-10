import { useContext, useEffect } from 'react';
import StudentPresentation from '../components/StudentPresentation';
import { UserContext } from '../components/layouts/AppLayout';
import { useNavigate } from 'react-router-dom';

function StudentPage() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handlePresentationIdSubmit = () => {
    const presentationCode = (document.getElementById('presentationCode') as HTMLInputElement)?.value;
    userContext?.setCurrentPresentationId(presentationCode || '');
  };
  
  useEffect(() => {
    if (!userContext?.clientName) {
      userContext?.setCurrentRole("student")
      navigate("/app")
    }
  }, [])

  return (
    <>
      {!userContext?.currentPresentationId && (
        <div className="mt-8 flex flex-col w-full max-w-sm">
          <label className="form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text">Enter the Presentation Code:</span>
            </div>
            <input
            id="presentationCode"
            name="presentationCode"
            placeholder='ID'
            className="input input-bordered w-full max-w-sm"
          />
          </label>
          <button
            type="submit"
            className="btn btn-secondary mt-2"
            onClick={handlePresentationIdSubmit}
          >
            Enter
          </button>
        </div>
      )}

      {userContext?.currentPresentationId && (
        <StudentPresentation />
      )}
    </>
  );
}

export default StudentPage;
