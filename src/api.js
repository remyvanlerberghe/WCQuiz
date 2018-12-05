import gql from 'graphql-tag';

export const getAllWorldCups = gql(`
{
    worldcups {
      year
      name
      host {
          name
          code
      }
    }
  }  
`);

export const getDataForWorldCup = year =>
  gql(`
  {
    worldcups(year: ${year}) {
      matches {
        date
        description
        homeTeam {
          name
          code
        }
        awayTeam {
          name
          code
        }
        homeScore
        awayScore
        round
      }
    }
  }
`);
