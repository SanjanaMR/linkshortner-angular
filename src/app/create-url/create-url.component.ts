import { Component, OnInit } from '@angular/core';
import { UrlShortnerService } from '../shared/url-shortner.service';

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['./create-url.component.css']
})
export class CreateUrlComponent implements OnInit {

  longUrl: string = '';
  shortUrl: string = '';
  isUrlGenerated: boolean = false;
  isErrorGenerated: boolean = false;

  constructor(private urlShortnerService: UrlShortnerService) { }

  ngOnInit(): void {
  }

  generateShortUrl() {
    this.isUrlGenerated = false;
    this.isErrorGenerated = false;

    // Check if the long URL is not empty
    if (!this.longUrl.trim()) {
      return;
    }

    this.urlShortnerService.getShortUrl(this.longUrl).subscribe(
      (res) => {
        if (res && res.shorturl) {
          this.shortUrl = res.shorturl;
          this.isUrlGenerated = true;
        } else {
          this.isErrorGenerated = true;
        }
      },
      (err) => {
        this.isErrorGenerated = true;
      }
    );
  }
}
