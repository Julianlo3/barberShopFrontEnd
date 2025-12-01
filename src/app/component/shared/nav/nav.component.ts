import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {StorageService} from "../../../logica/services/storage-service.service";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink, HttpClientModule, NgIf
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  roles: string[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.roles = this.storageService.getUserRoles();
  }

  hasRole(role: string): boolean {
    return this.storageService.hasRole(role);
  }


}
