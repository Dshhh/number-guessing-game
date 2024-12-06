import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  secretNumber = 0;
  attempts = 0;
  guessHistory: number[] = [];
  highScores: { level: string, attempts: number }[] = [];
  incorrectStreak = 0;  // To track the number of consecutive incorrect guesses
  guessLimit = 0;       // To limit the number of guesses per level

  constructor(){}

  startNewGame(level: string) {
    this.attempts = 0;
    this.guessHistory = [];
    this.incorrectStreak = 0;  // Reset incorrect streak
    this.secretNumber = this.generateSecretNumber(level);
    this.setGuessLimit(level);  // Set the guess limit based on the level
  }

  generateSecretNumber(level: string): number {
    switch(level) {
      case 'easy':
        return Math.floor(Math.random() * 10) + 1;
      case 'medium':
        return Math.floor(Math.random() * 50) + 1;
      case 'hard':
        return Math.floor(Math.random() * 100) + 1;
      default:
        return Math.floor(Math.random() * 50) + 1;
    }
  }

  setGuessLimit(level: string) {
    // Set guess limit based on the difficulty level
    if (level === 'easy') {
      this.guessLimit = 5;
    } else if (level === 'medium') {
      this.guessLimit = 7;
    } else if (level === 'hard') {
      this.guessLimit = 10;
    }
  }

  checkGuess(guess: number, level: string): string {
    this.attempts++;
    this.guessHistory.push(guess);
  
    // Check if user exceeds guess limit
    if (this.attempts > this.guessLimit) {
      return `Game Over! You've exceeded the maximum guesses for ${level} mode. The correct number was ${this.secretNumber}.`;
    }

    // If guess is incorrect, increase incorrect streak and provide hint if needed
    if (guess !== this.secretNumber) {
      this.incorrectStreak++;
      
      if (this.incorrectStreak >= 5) {
        this.incorrectStreak = 0; // Reset streak after hint
        const hint = guess < this.secretNumber ? 'greater' : 'less';
        return `Hint: The number is ${hint} than ${guess}.`;
      }

      const feedback = guess < this.secretNumber ? 'too low' : 'too high';
      return `Your guess is ${feedback}. You have ${this.guessLimit - this.attempts} guesses left.`;
    } else {
      this.saveHighScore(level);  // Save high score only when guess is correct
      return `Congratulations! It took you ${this.attempts} attempts.`;
    }
  }

  saveHighScore(level: string) {
    this.highScores.push({ level, attempts: this.attempts });
    this.highScores.sort((a, b) => a.attempts - b.attempts);
  }
}
