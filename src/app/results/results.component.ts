import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  gameSummary = "";

  constructor(public gameService: GameService, private router: Router){}

  ngOnInit(): void {
    this.generateGameSummary();
  }

  generateGameSummary() {
    const attempts = this.gameService.attempts;
    if (this.gameService.guessHistory.includes(this.gameService.secretNumber)) {
      this.gameSummary = `You won! It took you ${attempts} attempts.`;
    } else {
      this.gameSummary = `You lost! The secret number was ${this.gameService.secretNumber}.`;
    }
  }

  playAgain() {
    this.router.navigate(["game"]);
  }
}
