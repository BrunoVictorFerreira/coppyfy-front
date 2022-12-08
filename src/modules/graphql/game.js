import { gql } from '@apollo/client';

export const CREATE_GAME = gql`
  mutation createGame(
    $first_team: ID!,
	$second_team: ID!,
	$important: Boolean
  ) {
    create_game(
        first_team: $first_team,
        second_team: $second_team,
        important: $important
    )
  }
`;
export const CREATE_GAME_RESULT = gql`
  mutation createGameResult(
    $match_id: ID!,
	$first_team: Int,
	$second_team: Int
  ) {
    create_game_result(
        match_id: $match_id,
        first_team: $first_team,
        second_team: $second_team
    )
  }
`;

export const LIST_TEAMS = gql`
  query teams {
    teams{
        id
        name
        brasao_id
		group_id
		informations{
			pts
			vit
			der
		}
    }
  }
`;
export const LIST_MATCHS = gql`
  query matchs {
    matchs{
        id
        first_team
        second_team
        important
        first_turn
        second_turn
        third_turn
        octaves_turn
        fourth_turn
        semi_turn
        final_turn
        first_team_description{
            name
        }
        second_team_description{
            name
        }
    }
  }
`;