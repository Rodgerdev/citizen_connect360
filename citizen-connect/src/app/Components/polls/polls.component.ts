import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Poll, PollOption } from '../../models/poll.model';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PollsComponent {
  polls: Poll[] = [
    {
      id: '1',
      question: 'Your opinion on Finance Bill?',
      options: [
        { id: '1', text: 'Reject', votes: 4124, selected: false },
        { id: '2', text: 'Accept', votes: 32, selected: false },
        { id: '3', text: 'Amend', votes: 43, selected: false },
        { id: '4', text: 'Undecided', votes: 41, selected: false }
      ]
    },
    {
      id: '2',
      question: 'Biggest winners last week?',
      options: [
        { id: '1', text: 'Protestors', votes: 4124, selected: false },
        { id: '2', text: 'Government', votes: 32, selected: false },
        { id: '3', text: 'Police', votes: 43, selected: false },
        { id: '4', text: 'IMF', votes: 41, selected: false }
      ]
    }
  ];

  userRole: string = 'government'; // This should be dynamically set based on actual user role
  isAddPollPopupVisible: boolean = false;
  newPollQuestion: string = '';
  newPollOptions: string[] = [''];

  vote(pollId: string, optionId: string) {
    // Logic to handle voting
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
  }

  deletePoll(pollId: string) {
    // Logic to delete poll
    this.polls = this.polls.filter(poll => poll.id !== pollId);
  }

  showAddPollPopup() {
    this.isAddPollPopupVisible = true;
  }

  closeAddPollPopup() {
    this.isAddPollPopupVisible = false;
    this.newPollQuestion = '';
    this.newPollOptions = [''];
  }

  addPollOption() {
    this.newPollOptions.push('');
  }

  submitPoll() {
    const newPoll: Poll = {
      id: (this.polls.length + 1).toString(),
      question: this.newPollQuestion,
      options: this.newPollOptions.map((text, index) => ({
        id: (index + 1).toString(),
        text,
        votes: 0,
        selected: false
      }))
    };

    this.polls.push(newPoll);
    this.closeAddPollPopup();
  }
}
