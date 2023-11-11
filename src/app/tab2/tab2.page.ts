import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Define an interface for the Article structure based on your Firestore data
interface Article {
  id?: string; // The id field is optional
  title: string;
  description: string;
  link: string;
  thumbnail: string;
}


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  wasteReductionArticles: Article[] = [];
  energyConservationArticles: Article[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.getArticles('Waste Reduction', this.wasteReductionArticles);
    this.getArticles('Energy Conservation', this.energyConservationArticles);
  }

  private getArticles(collection: string, targetArray: Article[]) {
    this.firestore.collection(collection).valueChanges({ idField: 'id' })
      .subscribe((data: any[]) => { // Use any[] if you are unsure about the data structure
        const articles: Article[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          link: item.link,
          thumbnail: item.thumbnail,
        }));
        targetArray.splice(0, targetArray.length, ...articles);
      }, error => {
        console.error(`Error fetching articles from ${collection}:`, error);
      });
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }
  
}
