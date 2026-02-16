import { MatchupBuilder } from './matchup-builder.service';

describe('MatchupBuilder', () => {
  let service: MatchupBuilder;

  beforeEach(() => {
    service = new MatchupBuilder();
  });

  it('should be created', () => {
    expect(service.getMatchups()).toEqual({});
  });
});
