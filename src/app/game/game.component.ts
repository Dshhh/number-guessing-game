import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { GameService } from '../game.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  guess!: number | null;
  message = "";
  selectedLevel = "easy";

  constructor(private router: Router, private session: SessionService, public gameService: GameService){}

  startGame() {
    this.gameService.startNewGame(this.selectedLevel);
    this.message = "";
    this.guess = null;
  }

  checkGuess() {
    if (this.guess !== null) {
    this.message = this.gameService.checkGuess(this.guess, this.selectedLevel);  // Only call this once
      if (this.message.includes("Congratulations")) {
        this.router.navigate(["results"]);
      }
    }
  }

  result() {
    this.router.navigate(["results"]);
  }

  logout() {
    this.session.logout();
    this.router.navigate(["login"]);
  }
}
