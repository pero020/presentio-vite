import { useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';
import { generateRandomId } from '../lib/utils';
import Spinner from './Spinner';
import useWebSocket, { ReadyState } from "react-use-websocket"
import { UserContext } from './layouts/AppLayout';
import { LostIssueType, TopicType } from '../types/types';

const StudentPresentation = () => {
  const userContext = useContext(UserContext);
  const [connectedToPresentation, setConnectedToPresentation] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [submittedTopics, setSubmittedTopics] = useState<TopicType[]>([]);
  const [lostIssue, setLostIssue] = useState<LostIssueType | null>()
  const [endedPresentation, setEndedPresentation] = useState<boolean>(false);
  const [showExitButton, setShowExitButton] = useState(false);
  const [lostIssueButtonDisabled, setLostIssueButtonDisabled] = useState(false);

  const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || "wss://lob45ipd7l.execute-api.eu-central-1.amazonaws.com/production/";
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    WEBSOCKET_URL,
    {
      shouldReconnect: () => true,
    },
  )

  useEffect(() => {
    console.log("Connection state changed")
    console.log(readyState)
    console.log(userContext)
    if (readyState === ReadyState.OPEN && userContext?.currentPresentationId) {
      sendJsonMessage({
        action: 'enterPresentation',
        message: {
          data: {
            studentId: userContext.clientId,
            name: userContext.clientName,
            presentationId: userContext.currentPresentationId,
          },
        },
      })
    } else {
      setConnectedToPresentation(false)
    }
  }, [readyState])

  useEffect(() => {
    if (lastMessage) {
      const { data } = lastMessage;
      console.log(lastMessage)
      if (data === 'Entered presentation') {
        setConnectedToPresentation(true);
        setShowExitButton(false);
        toast.success('Connected to presentation');
      } else if (data === "Presentation doesn't exist") {
        toast.info('Presentation not found');
        handleStopConnection();
      } else if (data === "Presentation is finished") {
        toast.info('Presentation finished');
        setEndedPresentation(true);
      }
    }
  }, [lastMessage, userContext?.currentPresentationId])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExitButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [connectedToPresentation]);

  const handleStopConnection = () => {
    setConnectedToPresentation(false);
    setEndedPresentation(false);
    setSubmittedTopics([]);
    userContext?.setCurrentPresentationId('');
  };

  const handleTopicSubmit = () => {
    if (!userContext) {
      toast.error('No user');
      return;
    }

    if (!topicName) {
      toast.info('Enter topic description');
      return;
    }

    const newTopic = {
      id: generateRandomId(8),
      name: topicName
    } as TopicType

    const message = {
      action: 'sendTopicIssue',
      message: {
        data: {
          presentationId: userContext.currentPresentationId,
          studentId: userContext.clientId,
          description: newTopic.name,
          issueId: newTopic.id,
          issueStatus: 'active',
        },
      },
    };
    sendJsonMessage(message);

    console.log('Topic submitted:', topicName);
    setSubmittedTopics([...submittedTopics, newTopic]);
    setTopicName('');
  };

  const handleDiscardTopic = (index: number) => {
    if (!userContext) {
      toast.error('No user');
      return;
    }

    const message = {
      action: 'resolveTopicIssue',
      message: {
        data: {
          presentationId: userContext.currentPresentationId,
          studentId: userContext.clientId,
          issueId: submittedTopics[index].id
        },
      },
    };
    sendJsonMessage(message);
    const updatedTopics = [...submittedTopics];
    updatedTopics.splice(index, 1);
    setSubmittedTopics(updatedTopics);
  };

  const handleLostSubmit = () => {
    if (!lostIssue) {
      const currTime = new Date();
      const newLostIssue = {
        time: currTime.toISOString(),
        id: generateRandomId(8),
        status: "started"
      } as LostIssueType;
  
      const message = {
        action: 'sendLostIssue',
        message: {
          data: {
            presentationId: userContext?.currentPresentationId,
            studentId: userContext?.clientId,
            dateTimeResolved: "",
            issueStatus: newLostIssue.status, 
            issueId: newLostIssue.id
          }
        }
      };
      sendJsonMessage(message);
      setLostIssue(newLostIssue);
      toast.success("Lost issue sent")
      setLostIssueButtonDisabled(true); // Disable the button after sending the lost issue
      setTimeout(() => {
        setLostIssueButtonDisabled(false); // Enable the button after 2 minutes
      }, 12000);
    } else if (lostIssue.status == "started") {
      handleLostConfirm()
    } else if (lostIssue.status == "confirmed") {
      handleLostResolve()
    }
  }

  const handleLostConfirm = () => {
    const message = {
      action: 'confirmLostIssue',
      message: {
        data: {
          issueId: lostIssue?.id,
          studentId: userContext?.clientId,
          presentationId: userContext?.currentPresentationId
        }
      }
    };
      sendJsonMessage(message);
      toast.success("Lost issue confirmed")
      setLostIssue(prevLostIssue => {
        if (prevLostIssue) {
          return { ...prevLostIssue, status: 'confirmed' };
        }
        return prevLostIssue;
      });
  }

  const handleLostResolve = () => {
    if (!lostIssue) {
      return;
    }
  
    const message = {
      action: 'resolveLostIssue',
      message: {
        data: {
          issueId: lostIssue.id,
          studentId: userContext?.clientId,
          presentationId: userContext?.currentPresentationId
        }
      }
    };
  
    sendJsonMessage(message);
    toast.success("Lost issue resolved")
    setLostIssue(null);
  };
  
  

  return (
    <>
      {!connectedToPresentation && <>
        <Spinner />
        {showExitButton && 
          <button
            className="btn btn-error"
            onClick={handleStopConnection}
          >
            Exit
          </button>
        }
      </>}

      {connectedToPresentation && (
        <div className="mt-4 w-full flex justify-center">
          <div className="flex flex-col items-center justify-center flex-1 max-w-sm w-full">
            <div className="mt-4">
              <p className="text-green-500">{endedPresentation ? "Presentation ended" : "Entered Presentation"}</p>
            </div>
            {!endedPresentation && (
              <div className="mt-8 flex w-full flex-col">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Topic you don't understand:</span>
                  </div>
                  <input
                  type="text"
                  id="topicName"
                  name="topicName"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="input input-bordered w-full"
                />
                </label>
                <button
                  type="submit"
                  className="mt-4 btn btn-secondary"
                  onClick={handleTopicSubmit}
                >
                  Send
                </button>
                { lostIssue?.status != "confirmed" ? 
                <button
                  type="submit"
                  className="mt-4 btn btn-secondary"
                  onClick={handleLostSubmit}
                  disabled={lostIssueButtonDisabled} // Disable the button if the lost issue has been submitted
                >
                  {lostIssueButtonDisabled ? "Please wait..." : lostIssue ? "Confirm lost issue" : "Send Lost Issue" }
                </button>
                :
                <button
                  type="submit"
                  className="mt-4 btn btn-secondary"
                  onClick={handleLostSubmit}
                  disabled={lostIssueButtonDisabled} // Disable the button if the lost issue has been submitted
                >
                  Issue resolved
                </button>
              }
              </div>
            )}

            <div className="mt-4 text-left" style={{ width: "100%", maxWidth: "768px" }}>
              <h2 className="text-xl text-center">Submitted Topics:</h2>
              <ul className='w-full max-h-24 overflow-y-auto'>
                {submittedTopics.map((topic, index) => (
                  <li key={index} className='flex flex-row w-full justify-between items-center' >
                    <p>{topic.name}</p>
                    <button onClick={() => handleDiscardTopic(index)}><img src='/icon-x.svg' width={24} /></button> {/* Discard button */}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="mt-4 btn btn-error min-w-24"
              onClick={handleStopConnection}
            >
              EXIT
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentPresentation;

