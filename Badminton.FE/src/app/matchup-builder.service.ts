// Interfaces and Types (Replacing Records)
interface ILogger {
    writeLine(str: string): void;
}

class DefaultLogger implements ILogger {
    writeLine(str: string): void {}
}

export type Pairing = { player1: string; player2: string };
export type Matchup = { pairing1: Pairing; pairing2: Pairing };

export interface MatchupCollection {
    players: Map<number, string>;
    matchups: Matchup[];
}

export class MatchupBuilder {
    private logger: ILogger;

    constructor() {
        this.logger = new DefaultLogger();
    }

    public getMatchups(
        names: string[],
        minGames: number,
        courtCount: number
    ): Record<number, MatchupCollection> {
        const namesList = [...new Set(names.map((n) => n.trim()))];
        const ceiling = Math.ceil(namesList.length / courtCount);

        // Chunking logic
        const nameChunks: string[][] = [];
        for (let i = 0; i < namesList.length; i += ceiling) {
            nameChunks.push(namesList.slice(i, i + ceiling));
        }

        const resultMap: Record<number, MatchupCollection> = {};
        let courtIndex = 1;

        for (const nameChunk of nameChunks) {
            const currentNames: string[] = [];
            const currentPairs: Pairing[] = [];
            const currentMatchups: Matchup[] = [];

            const getPairing = (p1: string, p2: string): Pairing => {
                const [player1, player2] = [p1, p2].sort();
                return { player1, player2 };
            };

            let queue = [...nameChunk];

            while (true) {
                this.logger.writeLine(`Player count is ${currentNames.length}`);

                // Sorting logic (Mimicking .OrderBy().ThenBy())
                const pick = [...queue].sort((a, b) => {
                    // 1. Prioritize players not in the last 4 spots
                    const lastFour = currentNames.slice(- (currentNames.length % 4));
                    const aInLast = lastFour.includes(a) ? 1 : 0;
                    const bInLast = lastFour.includes(b) ? 1 : 0;
                    if (aInLast !== bInLast) return aInLast - bInLast;

                    // 2. Prioritize players who haven't met minGames
                    const aCount = currentNames.filter(n => n === a).length;
                    const bCount = currentNames.filter(n => n === b).length;
                    const aDone = aCount >= minGames ? 1 : 0;
                    const bDone = bCount >= minGames ? 1 : 0;
                    if (aDone !== bDone) return aDone - bDone;

                    // 3. Avoid repeat pairings if we are picking the second person of a pair
                    if (currentNames.length % 2 !== 0) {
                        const lastPlayer = currentNames[currentNames.length - 1];
                        const aPairCount = currentPairs.filter(p =>
                            JSON.stringify(p) === JSON.stringify(getPairing(lastPlayer, a))).length;
                        const bPairCount = currentPairs.filter(p =>
                            JSON.stringify(p) === JSON.stringify(getPairing(lastPlayer, b))).length;
                        return aPairCount - bPairCount;
                    }

                    return 0;
                })[0];

                // Update queue (Rotation logic)
                const indexOf = nameChunk.indexOf(pick);
                const nextIndex = indexOf === nameChunk.length - 1 ? 0 : indexOf + 1;
                queue = [
                    ...nameChunk.slice(nextIndex),
                    ...nameChunk.slice(0, nextIndex)
                ];

                this.logger.writeLine(`Picked ${pick}`);
                currentNames.push(pick);

                // Pairing and Matchup logic
                if (currentNames.length > 0 && currentNames.length % 2 === 0) {
                    const lastTwo = currentNames.slice(-2);
                    const pairing = getPairing(lastTwo[0], lastTwo[1]);
                    this.logger.writeLine(`Paired ${JSON.stringify(pairing)}`);
                    currentPairs.push(pairing);

                    if (currentPairs.length % 2 === 0) {
                        const lastTwoPairs = currentPairs.slice(-2);
                        const matchup = { pairing1: lastTwoPairs[0], pairing2: lastTwoPairs[1] };
                        this.logger.writeLine(`Matched up ${JSON.stringify(matchup)}`);
                        currentMatchups.push(matchup);
                    }
                }

                // Break condition
                const allMetMinGames = nameChunk.every(
                    (n) => currentNames.filter((cn) => cn === n).length >= minGames
                );
                if (currentNames.length % 4 === 0 && allMetMinGames) {
                    break;
                }
            }

            // Populate Result
            const playerMap = new Map<number, string>();
            nameChunk.forEach((name, idx) => playerMap.set(idx, name));

            resultMap[courtIndex++] = {
                players: playerMap,
                matchups: currentMatchups,
            };
        }

        return resultMap;
    }
}
