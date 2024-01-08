import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

export const BOARD_TABLE = 'boards'
export const USER_BOARD_TABLE = 'user_boards'
export const LISTS_TABLE = 'lists'
export const CARDS_TABLE = 'cards'
export const USERS_TABLE = 'users'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient

  constructor() { 
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  async startBoard() {
    return this.supabase
        .from(BOARD_TABLE)
        .insert({ returning: 'minimal' })
  }

  async getBoards() {
    const boards = await this.supabase
        .from(USER_BOARD_TABLE)
        .select('boards:board_id(*)')
    return boards.data || []
  }

  async getBoardById(boardId: string) {
    return await this.supabase
        .from(BOARD_TABLE)
        .select('*')
        .match({ id: boardId })
        .single()
  }

  async updateBoard(board: any) {
    return await this.supabase
        .from(BOARD_TABLE)
        .update(board)
        .match({ id: board.id })
  }

  async deleteBoard(board: any) {
    return await this.supabase
        .from(BOARD_TABLE)
        .delete(board)
        .match({ id: board.id })
  }

  async getBoardLists(boardId: string) {
    const lists = await this.supabase
        .from(LISTS_TABLE)
        .select('*')
        .eq('board_id', boardId)
        .order('position')

        return lists.data || []
  }

  async addBoardList(boardId: string, position = 0) {
    return await this.supabase
        .from(LISTS_TABLE)
        .insert({ board_id: boardId, position, title: 'Nova lista' })
        .select('*')
        .single()
  }

  async updateBoardList(list: any) {
    return await this.supabase
        .from(LISTS_TABLE)
        .update(list)
        .match({ id: list.id })
  }   

  async delteBoardList(list: any) {
    return await this.supabase
        .from(LISTS_TABLE)
        .delete()
        .match({ id: list.id })
  } 
}
