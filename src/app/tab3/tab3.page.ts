import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Define an interface for the Video structure based on your Firestore data
interface Video {
  id?: string; // The id field is optional
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  safeUrl?: SafeResourceUrl; // Add this property to store the safe URL
}

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  videos: Video[] = [];

  constructor(
    private firestore: AngularFirestore,
    private sanitizer: DomSanitizer // Inject the DomSanitizer
  ) {}

  ngOnInit() {
    this.getVideos();
  }

  private getVideos() {
    this.firestore.collection('Videos').valueChanges({ idField: 'id' })
      .subscribe((data: any[]) => {
        // Use any[] if you are unsure about the data structure
        const videos: Video[] = data.map((item: any) => {
          const video: Video = {
            id: item.id,
            title: item.title,
            description: item.description,
            link: item.link,
            thumbnail: item.thumbnail,
            safeUrl: this.getSafeUrl(item.link) // Sanitize the URL for embedding
          };
          return video;
        });
        this.videos.splice(0, this.videos.length, ...videos);
      }, error => {
        console.error('Error fetching videos:', error);
      });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openVideo(url: string) {
    window.open(url, '_blank');
  }
  
}
