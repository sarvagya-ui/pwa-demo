import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  deferredPrompt: any;

  constructor() {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', async (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Store the event
      this.deferredPrompt = e;
      // Automatically trigger installation
      await this.installPWA();
    });
  }

  private async installPWA() {
    if (this.deferredPrompt) {
      // Show the install prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await this.deferredPrompt.userChoice;
      // Clear the deferredPrompt variable
      this.deferredPrompt = null;
    }
  }
}
