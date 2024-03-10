export interface UserContextType {
  clientId: string;
  setClientId: React.Dispatch<React.SetStateAction<string>>;
  createNewClientId: () => void;
  clientName: string;
  setClientName: React.Dispatch<React.SetStateAction<string>>;
  currentPresentationId: string;
  setCurrentPresentationId: React.Dispatch<React.SetStateAction<string>>;
  currentRole: string;
  setCurrentRole: React.Dispatch<React.SetStateAction<string>>;
}

export interface TopicType {
  id: string,
  name: string
}

export interface LostIssueType {
  id: string,
  time: string,
  status: string
}
