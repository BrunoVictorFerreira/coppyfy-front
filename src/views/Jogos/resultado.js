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

import { CREATE_GAME_RESULT, LIST_MATCHS } from '../../modules/graphql/game'
import { useMutation, useQuery } from '@apollo/client'
import io from 'socket.io-client'
import Swal from 'sweetalert2'

const socket = io('http://localhost:8081')

const Resultado = () => {
  const [jogo, setJogo] = useState(null)
  const [time1, setTime1] = useState(null)
  const [time2, setTime2] = useState(null)
  const [finalizado, setFinalizado] = useState(0)

  const {
    loading: loadMatch,
    data: dataMatch,
    refetch: refetchMatch,
    error: erroMatch,
  } = useQuery(LIST_MATCHS, {
    fetchPolicy: 'no-cache',
  })

  const [createGameResult, { loadingResult }] = useMutation(CREATE_GAME_RESULT, {
    fetchPolicy: 'no-cache',
  })

  const gameResult = () => {
    if (jogo != null && time1 != null && time2 != null) {
      createGameResult({
        variables: {
          match_id: jogo,
          first_team: parseInt(time1),
          second_team: parseInt(time2),
          finalizado: finalizado == 0 ? false : true
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
            socket.emit('adicionar_resultado_jogo', resp)
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
            <strong>Novo Resultado</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Adicione um novo resultado de jogo</p>
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
              <CCol md={5}>
                <CFormLabel htmlFor="time1">
                  Quantidade de Gols (
                  {
                    dataMatch?.matchs?.filter((item) => item.id === jogo)?.[0]
                      ?.first_team_description?.[0]?.name
                  }
                  ):{' '}
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="time1"
                  onChange={(data) => {
                    setTime1(data.target.value)
                  }}
                />
              </CCol>
              <CCol md={5}>
                <CFormLabel htmlFor="time2">
                  Quantidade de Gols (
                  {
                    dataMatch?.matchs?.filter((item) => item.id === jogo)?.[0]
                      ?.second_team_description?.[0]?.name
                  }
                  ):{' '}
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="time2"
                  onChange={(data) => {
                    setTime2(data.target.value)
                  }}
                />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="finalizado">Finalizado</CFormLabel>
                <br />
                <CCol md={12}>
                  <input
                    type="radio"
                    style={{ marginRight: 10 }}
                    value={true}
                    id="sim"
                    name="finalizado"
                    onClick={(data) => {
                      setFinalizado(data.target.value)
                    }}
                  />
                  <label htmlFor="sim"> Sim</label>
                </CCol>
                <CCol md={4}>
                  <input
                    type="radio"
                    value={false}
                    style={{ marginRight: 10 }}
                    id="nao"
                    name="finalizado"
                    defaultChecked
                    onClick={(data) => {
                      setFinalizado(data.target.value)
                    }}
                  />
                  <label htmlFor="nao"> Não</label>
                </CCol>
              </CCol>
              <CCol xs={12}>
                <CButton
                  type="button"
                  onClick={() => {
                    gameResult()
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

export default Resultado
