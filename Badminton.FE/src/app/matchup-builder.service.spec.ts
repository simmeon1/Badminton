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
        service = { pairing1: { player1: }    }); player2:

     }  pairing2: { player1: matchups: Record< player2:number, MatchupCollection }}: Record<number, Matchup[]> {
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Echo" }, pairing2: { player1: "Bravo", player2: "Charlie" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Echo" }, pairing2: { player1: "Bravo", player2: "Charlie" }},
        { pairing1: { player1: "Delta", player2: "Echo" }, pairing2: { player1: "Alfa", player2: "Charlie" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Echo" }, pairing2: { player1: "Bravo", player2: "Charlie" }},
        { pairing1: { player1: "Delta", player2: "Echo" }, pairing2: { player1: "Alfa", player2: "Charlie" }},
            { pairing1: { player1: "Bravo", player2: "Delta" }, pairing2: { player1: "Charlie", player2: "Echo" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Echo" }, pairing2: { player1: "Bravo", player2: "Charlie" }},
        { pairing1: { player1: "Delta", player2: "Echo" }, pairing2: { player1: "Alfa", player2: "Charlie" }},
            { pairing1: { player1: "Alfa", player2: "Delta" }, pairing2: { player1: "Bravo", player2: "Echo" }},
                { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Echo" }},
                    { pairing1: { player1: "Bravo", player2: "Delta" }, pairing2: { player1: "Charlie", player2: "Echo" }},
                        { pairing1: { player1: "Delta", player2: "Echo" }, pairing2: { player1: "Alfa", player2: "Charlie" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Echo", player2: "Foxtrot" }, pairing2: { player1: "Alfa", player2: "Golf" }},
        { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Delta", player2: "Echo" }},
            { pairing1: { player1: "Foxtrot", player2: "Golf" }, pairing2: { player1: "Alfa", player2: "Charlie" }},
                { pairing1: { player1: "Delta", player2: "Foxtrot" }, pairing2: { player1: "Bravo", player2: "Golf" }},
                    { pairing1: { player1: "Charlie", player2: "Echo" }, pairing2: { player1: "Alfa", player2: "Foxtrot" }},
                        { pairing1: { player1: "Bravo", player2: "Delta" }, pairing2: { player1: "Echo", player2: "Golf" }}
                    ]
            },
            {
                2,
                    [
                        { pairing1: { player1: "Hotel", player2: "India" }, pairing2: { player1: "Juliett", player2: "Kilo" }},
                { pairing1: { player1: "Lima", player2: "Mike" }, pairing2: { player1: "Hotel", player2: "November" }},
                    { pairing1: { player1: "India", player2: "Juliett" }, pairing2: { player1: "Kilo", player2: "Lima" }},
                        { pairing1: { player1: "Mike", player2: "November" }, pairing2: { player1: "Hotel", player2: "Juliett" }},
                            { pairing1: { player1: "Kilo", player2: "Mike" }, pairing2: { player1: "India", player2: "November" }},
                                { pairing1: { player1: "Juliett", player2: "Lima" }, pairing2: { player1: "Hotel", player2: "Mike" }},
                                    { pairing1: { player1: "India", player2: "Kilo" }, pairing2: { player1: "Lima", player2: "November" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Echo" }, pairing2: { player1: "Bravo", player2: "Charlie" }},
        { pairing1: { player1: "Delta", player2: "Echo" }, pairing2: { player1: "Alfa", player2: "Charlie" }},
            { pairing1: { player1: "Alfa", player2: "Delta" }, pairing2: { player1: "Bravo", player2: "Echo" }},
                { pairing1: { player1: "Bravo", player2: "Delta" }, pairing2: { player1: "Charlie", player2: "Echo" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Echo", player2: "Foxtrot" }, pairing2: { player1: "Alfa", player2: "Charlie" }},
        { pairing1: { player1: "Delta", player2: "Echo" }, pairing2: { player1: "Alfa", player2: "Foxtrot" }},
            { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Delta", player2: "Foxtrot" }},
                { pairing1: { player1: "Alfa", player2: "Delta" }, pairing2: { player1: "Bravo", player2: "Echo" }},
                    { pairing1: { player1: "Charlie", player2: "Echo" }, pairing2: { player1: "Bravo", player2: "Foxtrot" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Echo", player2: "Foxtrot" }, pairing2: { player1: "Alfa", player2: "Golf" }},
        { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Delta", player2: "Echo" }},
            { pairing1: { player1: "Foxtrot", player2: "Golf" }, pairing2: { player1: "Alfa", player2: "Charlie" }},
                { pairing1: { player1: "Delta", player2: "Foxtrot" }, pairing2: { player1: "Bravo", player2: "Golf" }},
                    { pairing1: { player1: "Charlie", player2: "Echo" }, pairing2: { player1: "Alfa", player2: "Foxtrot" }},
                        { pairing1: { player1: "Bravo", player2: "Delta" }, pairing2: { player1: "Echo", player2: "Golf" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Charlie" }, pairing2: { player1: "Bravo", player2: "Delta" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Charlie" }, pairing2: { player1: "Bravo", player2: "Delta" }},
        { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Alfa", player2: "Delta" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Charlie" }, pairing2: { player1: "Bravo", player2: "Delta" }},
        { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Alfa", player2: "Delta" }},
            { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Alfa", player2: "Delta" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Charlie" }, pairing2: { player1: "Bravo", player2: "Delta" }},
        { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Alfa", player2: "Delta" }},
            { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Alfa", player2: "Delta" }},
                { pairing1: { player1: "Bravo", player2: "Delta" }, pairing2: { player1: "Alfa", player2: "Charlie" }}
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
                        { pairing1: { player1: "Alfa", player2: "Bravo" }, pairing2: { player1: "Charlie", player2: "Delta" }},
            { pairing1: { player1: "Alfa", player2: "Charlie" }, pairing2: { player1: "Bravo", player2: "Delta" }},
        { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Alfa", player2: "Delta" }},
            { pairing1: { player1: "Bravo", player2: "Charlie" }, pairing2: { player1: "Alfa", player2: "Delta" }},
                { pairing1: { player1: "Bravo", player2: "Delta" }, pairing2: { player1: "Alfa", player2: "Charlie" }},
                    { pairing1: { player1: "Charlie", player2: "Delta" }, pairing2: { player1: "Alfa", player2: "Bravo" }}
                    ]
            }
        },
        ExtractMatchups(matchups)
    );
    }
});
