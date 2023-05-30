import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect,
} from '@coreui/react'

import { CREATE_GAME_HISTORIC, LIST_MATCHS } from '../../modules/graphql/game'
import { useMutation, useQuery } from '@apollo/client'
import io from 'socket.io-client'
import Swal from 'sweetalert2'

const socket = io('http://localhost:8081')

const HistoricoJogo = () => {
  const [jogo, setJogo] = useState(null)
  const [descricao, setDescricao] = useState("")

  const {
    loading: loadMatch,
    data: dataMatch,
    refetch: refetchMatch,
    error: erroMatch,
  } = useQuery(LIST_MATCHS, {
    fetchPolicy: 'no-cache',
  })

  const [createGameHistoric, { loadingResult }] = useMutation(CREATE_GAME_HISTORIC, {
    fetchPolicy: 'no-cache',
  })

  const gameHistoric = () => {
    if (jogo != null && descricao != "") {
      createGameHistoric({
        variables: {
          match_id: jogo,
          descricao,
        },
      })
        .then((resp) => {
          Swal.fire({
            icon: 'success',
            title: 'Resultado salvo com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            console.log('resp', resp)
            socket.emit('adicionar_historico_jogo', resp)
            // window.location.reload()
            // console.log('resp', resp)
            // socket.emit('adicionar_jogo', resp)
            // window.location.reload()
          })
        })
        .catch(() => {})
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!',
      })
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Novo Historico</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Adicione um novo historico de jogo</p>
            <CForm className="row g-3">
              <CCol md={12}>
                <CFormLabel htmlFor="jogo">Jogo</CFormLabel>
                <CFormSelect
                  id="jogo"
                  onChange={(data) => {
                    setJogo(data.target.value)
                  }}
                >
                  <option value={null} key={-1}>
                    Selecione...
                  </option>
                  {dataMatch?.matchs?.filter(item => item.finalizado == false)?.map((item, key) => (
                    <option value={item.id} key={key}>
                      {item.first_team_description[0].name} X {item.second_team_description[0].name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="descricao">
                  Descrição
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="descricao"
                  onChange={(data) => {
                    setDescricao(data.target.value)
                  }}
                />
              </CCol>
              
              <CCol xs={12}>
                <CButton
                  type="button"
                  onClick={() => {
                    gameHistoric()
                  }}
                >
                  Registrar
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default HistoricoJogo
