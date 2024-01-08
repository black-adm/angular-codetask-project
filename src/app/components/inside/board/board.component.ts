import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  lists: any[] = []
  boardId: string | null = null
  editTitle: any = {}
  editCard: any = {}
  boardInfo: any = null
  titleChanged = false

  listCards: any = {}
  addUserEmail = ''

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('id')
    
    if (this.boardId) {
      this.boardInfo = await this.dataService.getBoardById(this.boardId)
      this.lists = await this.dataService.getBoardLists(this.boardId)
      
      for (let list of this.lists) {
        this.listCards[list.id] = await this.dataService.getListCards(list.id)
      }

      this.handleRealtimeUpdates()
    }
  }

  async saveBoardTitle() {
    await this.dataService.updateBoard(this.boardInfo)
    this.router.navigateByUrl('/workspace')
  }

  async deleteBoard() {
    await this.dataService.deleteBoard(this.boardInfo)
    this.router.navigateByUrl('/workspace')
  }

  async addList() {
    const newList = await this.dataService.addBoardList(
      this.boardId!,
      this.lists.length
    )
  }

  editingTitle(list: any, edit = false) {
    this.editTitle[list.id] = edit
  }

  async updateListTitle(list: any) {
    await this.dataService.updateBoardList(list)
    this.editingTitle(list, false)
  }

  async deleteBoardList(list: any) {
    await this.dataService.deleteBoardList(list)
  }

  async addCard(list: any) {
    await this.dataService.addListCard(
      list.id,
      this.boardId!,
      this.listCards[list.id].length
    )
  }

  editingCard(card: any, edit = false) {
    this.editCard[card.id] = edit
  }

  async updateCard(card: any) {
    await this.dataService.updateCard(card)
    this.editingCard(card, false)
  }

  async deleteCard(card: any) {
    await this.dataService.deleteCard(card)
  }

  async inviteUser() {
    await this.dataService.addUserToBoard(this.boardId!, this.addUserEmail)
    this.addUserEmail = ''
  }

  handleRealtimeUpdates() {}
}
