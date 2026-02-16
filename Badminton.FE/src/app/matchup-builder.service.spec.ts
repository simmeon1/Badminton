import {Matchup, MatchupBuilder, MatchupCollection} from './matchup-builder.service';

describe('MatchupBuilder', () => {
    const names =
        [
            "Alfa",
            "Bravo",
            "Charlie",
            "Delta",
            "Echo",
            "Foxtrot",
            "Golf",
            "Hotel",
            "India",
            "Juliett",
            "Kilo",
            "Lima",
            "Mike",
            "November",
            "Oscar",
            "Papa",
            "Quebec",
            "Romeo",
            "Sierra",
            "Tango",
            "Uniform",
            "Victor",
            "Whiskey",
            "Xray",
            "Yankee",
            "Zulu"
        ];

    let service: MatchupBuilder;

    beforeEach(() => {
        service = new MatchupBuilder();
    });

    function extractMatchups(matchups: Record<number, MatchupCollection>): Record<number, Matchup[]> {
        const result: Record<number, Matchup[]> = {};
        for (const [a, b] of Object.entries(matchups)) {
            // @ts-ignore
            result[a] = b.matchups;
        }
        return result;
    }

    it('MatchupsAsExpectedWith5Players1Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 5), 1, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Echo"), new Pairing("Bravo", "Charlie"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith5Players2Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 5), 2, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Echo"), new Pairing("Bravo", "Charlie")),
                        new Matchup(new Pairing("Delta", "Echo"), new Pairing("Alfa", "Charlie"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith5Players3Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 5), 3, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Echo"), new Pairing("Bravo", "Charlie")),
                        new Matchup(new Pairing("Delta", "Echo"), new Pairing("Alfa", "Charlie")),
                        new Matchup(new Pairing("Bravo", "Delta"), new Pairing("Charlie", "Echo"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith5Players5Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 5), 5, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Echo"), new Pairing("Bravo", "Charlie")),
                        new Matchup(new Pairing("Delta", "Echo"), new Pairing("Alfa", "Charlie")),
                        new Matchup(new Pairing("Alfa", "Delta"), new Pairing("Bravo", "Echo")),
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Echo")),
                        new Matchup(new Pairing("Bravo", "Delta"), new Pairing("Charlie", "Echo")),
                        new Matchup(new Pairing("Delta", "Echo"), new Pairing("Alfa", "Charlie"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith14Players4Games2Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 14), 4, 2);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Echo", "Foxtrot"), new Pairing("Alfa", "Golf")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Delta", "Echo")),
                        new Matchup(new Pairing("Foxtrot", "Golf"), new Pairing("Alfa", "Charlie")),
                        new Matchup(new Pairing("Delta", "Foxtrot"), new Pairing("Bravo", "Golf")),
                        new Matchup(new Pairing("Charlie", "Echo"), new Pairing("Alfa", "Foxtrot")),
                        new Matchup(new Pairing("Bravo", "Delta"), new Pairing("Echo", "Golf"))
                    ]
            },
            {
                2,
                    [
                        new Matchup(new Pairing("Hotel", "India"), new Pairing("Juliett", "Kilo")),
                        new Matchup(new Pairing("Lima", "Mike"), new Pairing("Hotel", "November")),
                        new Matchup(new Pairing("India", "Juliett"), new Pairing("Kilo", "Lima")),
                        new Matchup(new Pairing("Mike", "November"), new Pairing("Hotel", "Juliett")),
                        new Matchup(new Pairing("Kilo", "Mike"), new Pairing("India", "November")),
                        new Matchup(new Pairing("Juliett", "Lima"), new Pairing("Hotel", "Mike")),
                        new Matchup(new Pairing("India", "Kilo"), new Pairing("Lima", "November"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith5Players4Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 5), 4, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Echo"), new Pairing("Bravo", "Charlie")),
                        new Matchup(new Pairing("Delta", "Echo"), new Pairing("Alfa", "Charlie")),
                        new Matchup(new Pairing("Alfa", "Delta"), new Pairing("Bravo", "Echo")),
                        new Matchup(new Pairing("Bravo", "Delta"), new Pairing("Charlie", "Echo"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith6Players4Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 6), 4, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Echo", "Foxtrot"), new Pairing("Alfa", "Charlie")),
                        new Matchup(new Pairing("Delta", "Echo"), new Pairing("Alfa", "Foxtrot")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Delta", "Foxtrot")),
                        new Matchup(new Pairing("Alfa", "Delta"), new Pairing("Bravo", "Echo")),
                        new Matchup(new Pairing("Charlie", "Echo"), new Pairing("Bravo", "Foxtrot"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith7Players4Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 7), 4, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Echo", "Foxtrot"), new Pairing("Alfa", "Golf")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Delta", "Echo")),
                        new Matchup(new Pairing("Foxtrot", "Golf"), new Pairing("Alfa", "Charlie")),
                        new Matchup(new Pairing("Delta", "Foxtrot"), new Pairing("Bravo", "Golf")),
                        new Matchup(new Pairing("Charlie", "Echo"), new Pairing("Alfa", "Foxtrot")),
                        new Matchup(new Pairing("Bravo", "Delta"), new Pairing("Echo", "Golf"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith4Players1Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 4), 1, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith4Players2Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 4), 2, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Charlie"), new Pairing("Bravo", "Delta"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith4Players3Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 4), 3, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Charlie"), new Pairing("Bravo", "Delta")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Alfa", "Delta"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith4Players4Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 4), 4, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Charlie"), new Pairing("Bravo", "Delta")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Alfa", "Delta")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Alfa", "Delta"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith4Players5Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 4), 5, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Charlie"), new Pairing("Bravo", "Delta")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Alfa", "Delta")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Alfa", "Delta")),
                        new Matchup(new Pairing("Bravo", "Delta"), new Pairing("Alfa", "Charlie"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }

    it('MatchupsAsExpectedWith4Players6Games1Courts', () => {
        var matchups = service.getMatchups(names.slice(0, 4), 6, 1);
        expect(extractMatchups(matchups)).toEqual(
            {
                1:
                    [
                        new Matchup(new Pairing("Alfa", "Bravo"), new Pairing("Charlie", "Delta")),
                        new Matchup(new Pairing("Alfa", "Charlie"), new Pairing("Bravo", "Delta")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Alfa", "Delta")),
                        new Matchup(new Pairing("Bravo", "Charlie"), new Pairing("Alfa", "Delta")),
                        new Matchup(new Pairing("Bravo", "Delta"), new Pairing("Alfa", "Charlie")),
                        new Matchup(new Pairing("Charlie", "Delta"), new Pairing("Alfa", "Bravo"))
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }
});
