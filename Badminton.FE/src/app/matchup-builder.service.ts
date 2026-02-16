import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchupBuilder {
  public getMatchups(): Record<number, MatchupCollection> {
      return {};
  }
}

interface Pairing { player1: string, player2: string }
interface Matchup { pairing1: Pairing, pairing2: Pairing }
interface MatchupCollection { players: Record<number, string>, matchups: Matchup[] }
