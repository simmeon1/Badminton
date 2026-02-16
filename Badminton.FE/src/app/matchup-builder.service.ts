import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchupBuilder {
  public getMatchups(names: string[], minGames: number, courtCount: number): Record<number, MatchupCollection> {
      const namesList = [...new Set(names.map(n => n.trim())).values()];
      const ceiling = Math.ceil(namesList.length / courtCount);
      const nameChunks: string[][] = [];
      for (let i = 0; i < namesList.length; i += ceiling) {
          const chunk = namesList.slice(i, i + ceiling);
          nameChunks.push(chunk)
      }
      const resultMap: Record<number, MatchupCollection> = {};

      const courtIndex = 1;
      for (const nameChunk of nameChunks) {
      {
          const currentNames: string[] = [];
          const currentPairs: Pairing[] = [];
          const currentMatchups: Matchup[] = [];

          // Pairing GetPairing(string p1, string p2)
          // {
          //     const sorted = new[] { p1, p2 }.OrderBy(p => p).ToList();
          //     return new Pairing(sorted[0], sorted[1]);
          // }

          const queue = nameChunk.slice(0)
          while (true)
          {
              const pick = queue.sort((n1, n2) => {

              })

              const pick = queue
                  .OrderBy(n => currentNames.TakeLast(currentNames.Count % 4).Contains(n) ? int.MaxValue : 0)
                  .ThenBy(n => currentNames.Count(nn => nn == n) >= minGames)
                  .ThenBy(n =>
                      currentNames.Count % 2 == 0 ? 0 : currentPairs.Count(p => GetPairing(currentNames[^1], n) == p)
          ).First();
              const indexOf = nameChunkList.IndexOf(pick);
              const nextIndex = indexOf == nameChunkList.Count - 1 ? 0 : indexOf + 1;
              queue = nameChunkList
                  .Slice(nextIndex, nameChunkList.Count - nextIndex)
                  .Concat(nameChunkList[..nextIndex])
          .ToList();
              logger.WriteLine($"Picked {pick}");
              currentNames.Add(pick);

              if (currentNames.Count != 0 && currentNames.Count % 2 == 0)
              {
                  const lastTwoNames = currentNames.TakeLast(2).ToList();
                  const pairing = GetPairing(lastTwoNames[0], lastTwoNames[1]);
                  logger.WriteLine($"Paired {pairing}");
                  currentPairs.Add(pairing);
                  if (currentPairs.Count % 2 == 0)
                  {
                      const lastTwoPairs = currentPairs.TakeLast(2).ToList();
                      const matchup = new Matchup(lastTwoPairs[0], lastTwoPairs[1]);
                      logger.WriteLine($"Matched up {matchup}");
                      currentMatchups.Add(matchup);
                  }
              }
              if (currentNames.Count % 4 == 0 &&
                  nameChunkList.All(n => currentNames.Count(nn => nn == n) >= minGames))
              {
                  break;
              }
          }
          resultMap.Add(
              courtIndex++,
              new MatchupCollection(nameChunk.Index().ToDictionary(x => x.Index, x => x.Item), currentMatchups)
          );
      }
      return resultMap;
  }
}

export interface Pairing { player1: string, player2: string }
export interface Matchup { pairing1: Pairing, pairing2: Pairing }
export interface MatchupCollection { players: Record<number, string>, matchups: Matchup[] }
