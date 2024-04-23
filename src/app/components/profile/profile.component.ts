import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileImage: string | undefined;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('uploadButton') uploadButton!: ElementRef;

  constructor() { }

  ngOnInit() {
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.profileImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  editProfilePhoto() {
    // Show the "Upload Photo" button when the user clicks "Edit"
    this.uploadButton.nativeElement.style.display = 'block';
  }

}
