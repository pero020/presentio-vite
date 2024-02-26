import { useState, useContext } from 'react';
import { UserContext } from '../App';
import PresenterPresentation from './PresenterPresentation';

function PresenterPage() {
  const userContext = useContext(UserContext);
  const [creatingPresentation, setCreatingPresentation] = useState(false);
  const [presentationName, setPresentationName] = useState('');
  const [minimalTopicIssues, setMinimalTopicIssues] = useState(2);
  const [minimalLostIssues, setMinimalLostIssues] = useState(4);
  const handleCreatePresentation = async () => {
    const apiUrl = import.meta.env.VITE_HTTP_URL; // Fetch the API URL from environment variables
    const payload = {
      action: 'createNewPresentation',
      message: {
        data: {
          presenter: {
            id: userContext?.clientId,
            name: userContext?.clientName || 'Guest',
          },
          name: presentationName,
          settings: {
            type: 'free',
            minTopicIssueStudents: minimalTopicIssues,
            minLostIssueStudents: minimalLostIssues
          }
        }
      }
    };

    try {
      const response = await fetch(apiUrl + "/createPresentation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to create presentation');
      }

      const responseData = await response.json();
      const presentationId = responseData.presentationId; // Extract presentationId from response
      console.log(presentationId)
      userContext?.setCurrentPresentationId(presentationId)
      console.log('Presentation created with ID:', presentationId);
    } catch (error) {
      console.error('Error creating presentation:', error);
    }
  };

  const handlePresentationIdSubmit = () => {
    const presentationCode = (document.getElementById('presentationCode') as HTMLInputElement)?.value;
    userContext?.setCurrentPresentationId(presentationCode || '');
  };

  const handleCreatePresentationForm = () => {
    setCreatingPresentation(true);
  };

  return (
    <div>
      {!userContext?.currentPresentationId && !creatingPresentation && (
        <div className="mt-8 flex flex-col items-center">
          <label htmlFor="presentationCode" className="text-xl mb-2">
            Reconnect to your presentation:
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
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handlePresentationIdSubmit}
          >
            Submit
          </button>
          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCreatePresentationForm}
          >
            Create New Presentation
          </button>
        </div>
      )}

      {!userContext?.currentPresentationId && creatingPresentation && (
        <div className="mt-8 flex flex-col">
          <label htmlFor="presentationName" className="text-xl mb-2">
            Presentation Name:
          </label>
          <input
            type="text"
            id="presentationName"
            name="presentationName"
            value={presentationName}
            onChange={(e) => setPresentationName(e.target.value)}
            className="w-64 p-2 rounded border text-center border-blue-300 text-black focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="minimalTopics" className="text-xl mt-4 mb-2">
            Minimal Topics:
          </label>
          <input
            type="number"
            id="minimalTopics"
            name="minimalTopics"
            value={minimalTopicIssues}
            onChange={(e) => setMinimalTopicIssues(parseInt(e.target.value))}
            className="w-64 p-2 rounded border text-center border-blue-300 text-black focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="minimalLostIssues" className="text-xl mt-4 mb-2">
            Minimal Lost Issues:
          </label>
          <input
            type="number"
            id="minimalLostIssues"
            name="minimalLostIssues"
            value={minimalLostIssues}
            onChange={(e) => setMinimalLostIssues(parseInt(e.target.value))}
            className="w-64 p-2 rounded border text-center border-blue-300 text-black focus:outline-none focus:border-blue-500"
          />
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCreatePresentation}
          >
            Create Presentation
          </button>
        </div>
      )}

      {userContext?.currentPresentationId && (
        <PresenterPresentation />
      )}
    </div>
  );
}

export default PresenterPage;
