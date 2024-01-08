import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnInit {
  boards: unknown[] = []
  user = this.auth.currentUser

  constructor(
    private auth: AuthService,
    private dataService: DataService
  ) {}

  async ngOnInit() {
    this.boards = await this.dataService.getBoards()
  }

  async startBoard() {
    const data = await this.dataService.startBoard()
  }

  signOut() {
    this.auth.logout()
  }
}
