import { useContext } from 'react';
import { UserContext } from '../App';
import StudentPresentation from './StudentPresentation';

function StudentPage() {
  const userContext = useContext(UserContext);

  const handlePresentationIdSubmit = () => {
    const presentationCode = (document.getElementById('presentationCode') as HTMLInputElement)?.value;
    userContext?.setCurrentPresentationId(presentationCode || '');
  };

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
