import { Component, OnInit } from '@angular/core';
import { UrlShortnerService } from '../shared/url-shortner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  url: string = "";
  originalUrl: string = "";
  isUrlGenerated: boolean = false;
  isErrorGenerated: boolean = false;
  shortUrl: string = "";
  timestamp: number = 0;
  isValidUrlFormat: boolean = true; // Track the URL validation status
  errorMessage: string = ""; // Store the error message
  isUrlExists: boolean | null = null; // Track if the entered URL exists
  isNewUrlCreated: boolean = false; // Track if a new short URL was created
  constructor(private router: Router, private urlShortnerService: UrlShortnerService) { }

  ngOnInit(): void {
    this.isUrlGenerated = false;
  }

  generateShortUrl() {
    this.isValidUrlFormat = this.isUrlValid(this.url); // Check the URL format
    if (!this.isValidUrlFormat) {
      this.isErrorGenerated = false;
      this.isUrlGenerated = false;
      this.shortUrl = "";
      this.originalUrl = "";
      this.isUrlExists = null;
      this.errorMessage = "Please enter a valid URL format.";
      return;
    }
    this.urlShortnerService.getShortUrl(this.url).subscribe(res => {
      if (res == null) {
        // this.isErrorGenerated=true;
        this.isErrorGenerated = false;
        this.isUrlGenerated = false;
        this.shortUrl = "";
        this.originalUrl = "";
        this.isUrlExists = false; // URL doesn't exist
      } else {
        this.isUrlGenerated = true;
        this.isErrorGenerated = false;
        this.isUrlExists = false; // URL exists
        this.shortUrl = res.shorturl;
        this.originalUrl = res.originalurl;
        this.timestamp = Date.now();
        setTimeout(() => {
          this.checkUrlValidity();
        }, 300000);
        // If a short URL is received, check if it exists in the database
        // if (res.shorturl) {
        //   this.isUrlGenerated = true;
        //   this.isErrorGenerated = false;
        //   this.isUrlExists = true; // URL exists
        //   this.shortUrl = res.shorturl;
        //   this.originalUrl = res.originalurl;
        //   this.timestamp = Date.now();
        //   setTimeout(() => {
        //     this.checkUrlValidity();
        //   }, 300000);
        // }else {
        //   // Short URL doesn't exist (Duplicate URL scenario)
        //   this.isErrorGenerated = false;
        //   this.isUrlGenerated = false;
        //   this.shortUrl = "";
        //   this.originalUrl = "";
        //   this.isUrlExists = false; // URL doesn't exist
        //   this.errorMessage = "This long URL already has a short URL:";
        //   this.shortUrl = res.shorturl; // Display the existing short URL
        // }
      }

    }, (err) => {
      this.isUrlGenerated = false;
      this.isErrorGenerated = true;
      this.isUrlExists = null;
    }
    );
  }
  isUrlValid(url: string): boolean {
    // Use your preferred URL validation regex here
    const urlPattern: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(url);
  }
  checkUrlValidity() {
    const currentTime = Date.now();
    const validityLimit = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (currentTime - this.timestamp > validityLimit) {
      this.isUrlGenerated = false;
      this.isErrorGenerated = true;
      this.shortUrl = "";
      this.originalUrl = "";
      this.timestamp = 0;
    }
  }
  createNewUrl() {
    this.router.navigateByUrl('/create-url');
  }
}
