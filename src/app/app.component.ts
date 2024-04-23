import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isSidebarOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    // Calculate and apply padding to the top of the wrapper div
    const headerElement = document.querySelector('app-header') as HTMLElement;
    if (headerElement) {
      const headerHeight = headerElement.offsetHeight;
      const wrapperElement = document.querySelector('.wrapper') as HTMLElement;
      if (wrapperElement) {
        wrapperElement.style.paddingTop = headerHeight + 'px';
      }
    }
  }

  title = 'website';

  onToggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleSidebar.emit(); // Emit the event to update the sidebar icon
  }
  
}
