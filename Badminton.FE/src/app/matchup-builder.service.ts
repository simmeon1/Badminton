import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchupBuilder {
  public getMatchups(names: string[], minGames: number, courtCount: number): Record<number, MatchupCollection> {
      return {};
  }
}

export interface Pairing { player1: string, player2: string }
export interface Matchup { pairing1: Pairing, pairing2: Pairing }
export interface MatchupCollection { players: Record<number, string>, matchups: Matchup[] }
