import { gql } from '@apollo/client'

export const CREATE_GAME = gql`
  mutation createGame($first_team: ID!, $second_team: ID!, $important: Boolean, $date: String) {
    create_game(
      first_team: $first_team
      second_team: $second_team
      important: $important
      date: $date
    ) {
      id
      first_team_description {
        name
      }
      second_team_description {
        name
      }
    }
  }
`
export const CREATE_GAME_RESULT = gql`
  mutation createGameResult(
    $match_id: ID!
    $first_team: Int
    $second_team: Int
    $finalizado: Boolean!
  ) {
    create_game_result(
      match_id: $match_id
      first_team: $first_team
      second_team: $second_team
      finalizado: $finalizado
    ) {
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
      date
      first_team_description {
        name
      }
      second_team_description {
        name
      }
      result {
        id
        match_id
        first_team
        second_team
        finalizado
      }
    }
  }
`

export const CREATE_GAME_HISTORIC = gql`
  mutation createGameHistoric($match_id: ID!, $descricao: String) {
    create_game_historic(match_id: $match_id, descricao: $descricao) {
      id
      descricao
    }
  }
`

export const LIST_TEAMS = gql`
  query teams {
    teams {
      id
      name
      brasao_id
      group_id
      informations {
        pts
        vit
        der
      }
      jogador {
        id
        team_id
        nome
        numero
        created_at
        updated_at
        deleted_at
      }
    }
  }
`
export const LIST_MATCHS = gql`
  query matchs {
    matchs {
      id
      finalizado
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
      first_team_description {
        id
        name
      }
      second_team_description {
        id
        name
      }
    }
  }
`

export const CREATE_INFORMATION_RESULT = gql`
  mutation createInformation(
    $match_id: ID!
    $first_team: Int
    $second_team: Int
    $informacoes: String!
  ) {
    create_game_information(
      match_id: $match_id
      first_team: $first_team
      second_team: $second_team
      informacoes: $informacoes
    ) {
      informacoes
    }
  }
`

export const CREATE_FORMATION_RESULT = gql`
  mutation createFormation(
    $match_id: ID!
    $first_team: Int
    $second_team: Int
    $first_formation: String!
    $second_formation: String!
  ) {
    create_game_formation(
      match_id: $match_id
      first_team: $first_team
      second_team: $second_team
      first_formation: $first_formation
      second_formation: $second_formation
    ) {
      first_formation
      second_formation
    }
  }
`

export const CREATE_JOGADOR_RESULT = gql`
  mutation createJogador($team_id: ID!, $nome: String, $numero: String) {
    create_jogador(team_id: $team_id, nome: $nome, numero: $numero) {
      id
    }
  }
`

export const MENSAGENS_SUPORTE = gql`
query mensagensSuporteOperator($usuario_id: ID, $operador_id: ID){
  mensagens_suporte_operador(usuario_id: $usuario_id, operador_id: $operador_id){
    id
    usuario_id
    usuario{
      name
      id
    }
    operador{
        name
        id
    }
    mensagens_suporte{
      id
      mensagem
      usuario_id
      created_at
      suporte_id
    }
  }
}
`

export const CREATE_MESSAGE_OPERATOR = gql`
mutation createSuporteOperador($usuario_id: ID!, $mensagem: String!, $suporte_id: ID!){
  create_suporte_operador(usuario_id: $usuario_id,mensagem: $mensagem, suporte_id:$suporte_id
    ){
        id
        usuario_id
        operador_id
        usuario{
          name
          id
        }
        operador{
            name
            id
        }
        mensagens_suporte{
          id
          mensagem
          usuario_id
          created_at
          suporte_id
        } 
    }
}
`