import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController, AlertController } from '@ionic/angular';
import 'core-js/es/array/flat-map';
import 'core-js/es/array/flat';


@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.page.html',
  styleUrls: ['./challenges.page.scss'],
})


export class ChallengesPage implements OnInit {

  correctCount = 0;
  incorrectCount = 0;

  challenges: any;

  feedbackMessages: { [key: string]: string } = {};

  selectedAnswers: { [key: string]: number } = {};

  radioSelections: { [key: string]: number } = {};


  constructor(private firestore: AngularFirestore,
    private navCtrl: NavController,
    private changeDetectorRef: ChangeDetectorRef,
    private alertController: AlertController
    ) {}

    getChallenges() {
      return this.firestore.collection('Challenges').valueChanges({ idField: 'id' });
    }
    

    // ngOnInit() {
    //   this.getChallenges().subscribe(
    //     challengesData => {
    //       this.challenges = challengesData.reduce((acc: any[], challenge: any) => {
    //         // Create an array from the challenge object's own properties
    //         const questions = Object.keys(challenge)
    //           // Filter out properties that are not questions
    //           .filter(key => challenge[key].text && challenge[key].choices)
    //           // Map to a new array of question objects
    //           .map(key => ({
    //             id: key,
    //             text: challenge[key].text,
    //             choices: challenge[key].choices,
    //             correctChoice: challenge[key].correctChoice,
    //           }));
            
    //         // Concatenate the questions to the accumulator
    //         return acc.concat(questions);
    //       }, []); // Initial value is an empty array
    //     },
    //     error => console.error('Error fetching challenges:', error)
    //   );
    // }

    ngOnInit() {
      this.getChallenges().subscribe(
        challengesData => {
          this.challenges = challengesData.reduce((acc: any[], challenge: any) => {
            // Create an array from the challenge object's own properties
            const questions = Object.keys(challenge)
              // Filter out properties that are not questions
              .filter(key => key.startsWith('Question') && challenge[key].text && challenge[key].choices)
              // Map to a new array of question objects with unique ids
              .map(key => ({
                // Create a unique id for each question by combining challenge id and question key
                id: `${challenge.id}_${key}`,
                text: challenge[key].text,
                choices: challenge[key].choices,
                correctChoice: challenge[key].correctChoice,
              }));
            
            // Concatenate the questions to the accumulator
            return acc.concat(questions);
          }, []); // Initial value is an empty array
        },
        error => console.error('Error fetching challenges:', error)
      );
    }
    

    
    openChallenge(challengeId: string) {
      this.navCtrl.navigateForward(`/challenge/${challengeId}`);
    }
    
    

    // updateSelection(challengeId: string, choiceIndex: number) {
    //   this.selectedAnswers[challengeId] = choiceIndex;
    // }
    updateSelection(challengeUniqueId: string, choiceIndex: number) {
      this.selectedAnswers[challengeUniqueId] = choiceIndex;
    }
    
    // getSelection(challengeId: string): number | null {
    //   return this.selectedAnswers[challengeId]|| null;
    // }
    getSelection(challengeUniqueId: string): number | null {
      return this.selectedAnswers[challengeUniqueId] || null;
    }


    // selectChoice(challenge: any, choiceIndex: number) {
    //   this.selectedAnswers[challenge.id] = choiceIndex;
    // }
    selectChoice(challengeUniqueId: string, choiceIndex: number) {
  this.selectedAnswers[challengeUniqueId] = choiceIndex;
    }
    

    submitAnswer(challengeUniqueId: string, challengeText: string, choices: any[], correctChoice: string) {
      console.log(`Submitting answer for challenge: ${challengeUniqueId}`);
      const selectedChoiceIndex = this.selectedAnswers[challengeUniqueId];
    
      console.log('Selected choice index:', selectedChoiceIndex);
    
      if (selectedChoiceIndex !== undefined) {
        const selectedAnswer = `number-${selectedChoiceIndex}`;
        const isCorrect = correctChoice === selectedAnswer;
        console.log('Is the selected answer correct?', isCorrect);
    
        this.feedbackMessages[challengeUniqueId] = isCorrect ? 'Correct answer!' : 'Wrong answer.';
    
        if (isCorrect) {
          this.correctCount++;
        } else {
          this.incorrectCount++;
        }
      } else {
        this.feedbackMessages[challengeUniqueId] = 'Please select an option.';
      }
    
      // Trigger change detection to update the view
      this.changeDetectorRef.detectChanges();

      if (Object.keys(this.selectedAnswers).length === this.challenges.length) {
        this.showResults();
      }
    }
  
    async showResults() {
      let message = `You got ${this.correctCount} out of ${this.challenges.length} correct. `;
    
      // Customize the message based on the success or failure
      message += this.correctCount === this.challenges.length ? 'Success!' : 'Good Try, But Please Try Again.';
    
      const alert = await this.alertController.create({
        header: 'Quiz Results',
        message: message,
        buttons: ['OK']
      });
    
      await alert.present();
    }
    
    
  navigateBack() {
    this.navCtrl.back();
  }

}

