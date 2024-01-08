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
}
