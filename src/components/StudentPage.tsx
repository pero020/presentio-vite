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
    <div>
      {!userContext?.currentPresentationId && (
        <div className="mt-8 flex flex-col">
          <label htmlFor="presentationCode" className="text-xl mb-2">
            Enter Presentation Code:
          </label>
          <input
            type="text"
            id="presentationCode"
            name="presentationCode"
            placeholder='ID'
            className="w-64 p-2 rounded border text-center border-blue-300 text-black focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handlePresentationIdSubmit}
          >
            Submit
          </button>
        </div>
      )}

      {userContext?.currentPresentationId && (
        <StudentPresentation />
      )}
    </div>
  );
}

export default StudentPage;
