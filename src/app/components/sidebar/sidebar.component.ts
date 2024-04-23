import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    // Define the trigger for sidebar animation
    trigger('sidebarChange', [
      state('closed', style({ width: '0', padding: '80px' })),
      state('open', style({ width: '250px', padding: '80px' })),
      transition('closed => open', [
        style({ opacity: 0, visibility: 'hidden' }),
        animate('0.3s ease-in-out', style({ opacity: 1, visibility: 'visible' }))
      ]),
      transition('open => closed', [
        animate('0.3s ease-in-out', style({ opacity: 0, visibility: 'hidden' }))
      ])
    ])
  ]
})
export class SidebarComponent {
  // Define a property to track the state of the sidebar
  sidebarState: string = 'closed';

  // Function to toggle the sidebar state
  toggleSidebar() {
    this.sidebarState = this.sidebarState === 'closed' ? 'open' : 'closed';
  }
}
