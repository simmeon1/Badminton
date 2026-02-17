import {Matchup, MatchupBuilder, MatchupCollection} from "./matchup-builder.service";

describe("MatchupBuilder", () => {
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
        const matchups = service.getMatchups(names.slice(0, 5), 1, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Echo","player2":"Alfa"},"pairing2":{"player1":"Bravo","player2":"Charlie"}}]})
    })

    it('MatchupsAsExpectedWith5Players2Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 5), 2, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Echo","player2":"Alfa"},"pairing2":{"player1":"Bravo","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Echo"},"pairing2":{"player1":"Alfa","player2":"Charlie"}}]})
    })

    it('MatchupsAsExpectedWith5Players3Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 5), 3, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Echo","player2":"Alfa"},"pairing2":{"player1":"Bravo","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Echo"},"pairing2":{"player1":"Alfa","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Bravo"},"pairing2":{"player1":"Echo","player2":"Charlie"}}]})
    })

    it('MatchupsAsExpectedWith5Players5Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 5), 5, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Echo","player2":"Alfa"},"pairing2":{"player1":"Bravo","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Echo"},"pairing2":{"player1":"Alfa","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Alfa"},"pairing2":{"player1":"Bravo","player2":"Echo"}},{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Echo"}},{"pairing1":{"player1":"Bravo","player2":"Delta"},"pairing2":{"player1":"Echo","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Echo"},"pairing2":{"player1":"Alfa","player2":"Charlie"}}]})
    })

    it('MatchupsAsExpectedWith14Players4Games2Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 14), 4, 2);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Echo","player2":"Foxtrot"},"pairing2":{"player1":"Golf","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Echo"}},{"pairing1":{"player1":"Foxtrot","player2":"Golf"},"pairing2":{"player1":"Alfa","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Foxtrot"},"pairing2":{"player1":"Golf","player2":"Bravo"}},{"pairing1":{"player1":"Charlie","player2":"Echo"},"pairing2":{"player1":"Foxtrot","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Delta"},"pairing2":{"player1":"Echo","player2":"Golf"}}],"2":[{"pairing1":{"player1":"Hotel","player2":"India"},"pairing2":{"player1":"Juliett","player2":"Kilo"}},{"pairing1":{"player1":"Lima","player2":"Mike"},"pairing2":{"player1":"November","player2":"Hotel"}},{"pairing1":{"player1":"India","player2":"Juliett"},"pairing2":{"player1":"Kilo","player2":"Lima"}},{"pairing1":{"player1":"Mike","player2":"November"},"pairing2":{"player1":"Hotel","player2":"Juliett"}},{"pairing1":{"player1":"Kilo","player2":"Mike"},"pairing2":{"player1":"November","player2":"India"}},{"pairing1":{"player1":"Juliett","player2":"Lima"},"pairing2":{"player1":"Mike","player2":"Hotel"}},{"pairing1":{"player1":"India","player2":"Kilo"},"pairing2":{"player1":"Lima","player2":"November"}}]},
        )
    })

    it('MatchupsAsExpectedWith5Players4Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 5), 4, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Echo","player2":"Alfa"},"pairing2":{"player1":"Bravo","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Echo"},"pairing2":{"player1":"Alfa","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Alfa"},"pairing2":{"player1":"Bravo","player2":"Echo"}},{"pairing1":{"player1":"Bravo","player2":"Delta"},"pairing2":{"player1":"Echo","player2":"Charlie"}}]})
    })

    it('MatchupsAsExpectedWith6Players4Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 6), 4, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Echo","player2":"Foxtrot"},"pairing2":{"player1":"Alfa","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Echo"},"pairing2":{"player1":"Foxtrot","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Foxtrot"}},{"pairing1":{"player1":"Alfa","player2":"Delta"},"pairing2":{"player1":"Echo","player2":"Bravo"}},{"pairing1":{"player1":"Charlie","player2":"Echo"},"pairing2":{"player1":"Foxtrot","player2":"Bravo"}}]})
    })

    it('MatchupsAsExpectedWith7Players4Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 7), 4, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Echo","player2":"Foxtrot"},"pairing2":{"player1":"Golf","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Echo"}},{"pairing1":{"player1":"Foxtrot","player2":"Golf"},"pairing2":{"player1":"Alfa","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Foxtrot"},"pairing2":{"player1":"Golf","player2":"Bravo"}},{"pairing1":{"player1":"Charlie","player2":"Echo"},"pairing2":{"player1":"Foxtrot","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Delta"},"pairing2":{"player1":"Echo","player2":"Golf"}}]})
    })

    it('MatchupsAsExpectedWith4Players1Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 4), 1, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}}]}        )
    })

    it('MatchupsAsExpectedWith4Players2Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 4), 2, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Alfa","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Bravo"}}]})
    })

    it('MatchupsAsExpectedWith4Players3Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 4), 3, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Alfa","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Bravo"}},{"pairing1":{"player1":"Charlie","player2":"Bravo"},"pairing2":{"player1":"Delta","player2":"Alfa"}}]})
    })

    it('MatchupsAsExpectedWith4Players4Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 4), 4, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Alfa","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Bravo"}},{"pairing1":{"player1":"Charlie","player2":"Bravo"},"pairing2":{"player1":"Delta","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Alfa"}}]})
    })

    it('MatchupsAsExpectedWith4Players5Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 4), 5, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Alfa","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Bravo"}},{"pairing1":{"player1":"Charlie","player2":"Bravo"},"pairing2":{"player1":"Delta","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Delta"},"pairing2":{"player1":"Alfa","player2":"Charlie"}}]})
    })

    it('MatchupsAsExpectedWith4Players6Games1Courts', () => {
        const matchups = service.getMatchups(names.slice(0, 4), 6, 1);
        expect(extractMatchups(matchups)).toEqual(
{"1":[{"pairing1":{"player1":"Alfa","player2":"Bravo"},"pairing2":{"player1":"Charlie","player2":"Delta"}},{"pairing1":{"player1":"Alfa","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Bravo"}},{"pairing1":{"player1":"Charlie","player2":"Bravo"},"pairing2":{"player1":"Delta","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Charlie"},"pairing2":{"player1":"Delta","player2":"Alfa"}},{"pairing1":{"player1":"Bravo","player2":"Delta"},"pairing2":{"player1":"Alfa","player2":"Charlie"}},{"pairing1":{"player1":"Delta","player2":"Charlie"},"pairing2":{"player1":"Alfa","player2":"Bravo"}}]})
    })
})
;
