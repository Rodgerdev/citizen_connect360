export interface PollOption {
  id: string;
  text: string;
  votes: number;
  selected: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdBy?: string;
}
