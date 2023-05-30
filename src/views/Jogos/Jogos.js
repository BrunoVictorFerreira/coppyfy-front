import React, { useState, useEffect } from 'react'
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

import {
  CREATE_GAME,
  LIST_TEAMS,
} from '../../modules/graphql/game'
import { useMutation, useQuery } from '@apollo/client'
import io from 'socket.io-client'
import Swal from 'sweetalert2'

const socket = io('http://localhost:8081')

const Jogos = () => {
  const [time1, setTime1] = useState(null)
  const [time2, setTime2] = useState(null)
  const [importante, setImportante] = useState(false)
  const [dataState, setData] = useState(null)

  const {
    loading: load,
    data: data,
    refetch: refetch,
    error: erro,
  } = useQuery(LIST_TEAMS, {
    fetchPolicy: 'no-cache',
  })

  const [createGame, { loading }] = useMutation(CREATE_GAME, {
    fetchPolicy: 'no-cache',
  })

  const game = () => {
    if (time1 != null && time2 != null && dataState != null) {
      if (time1 == time2) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Selecione dois times diferentes!',
        })
      } else {
        createGame({
          variables: {
            first_team: time1,
            second_team: time2,
            important: importante == 0 ? false : true,
            date: dataState,
          },
        })
          .then((resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Jogo salvo com sucesso!',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              
              console.log('resp', resp)
              socket.emit('adicionar_jogo', resp)
            })
          })
          .catch(() => {})
      }
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
            <strong>Novo Jogo</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Adicione um novo jogo</p>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="time1">Primeiro Time</CFormLabel>
                <CFormSelect
                  id="time1"
                  onChange={(data) => {
                    setTime1(data.target.value)
                  }}
                >
                  <option value={null} key={-1}>Selecione...</option>
                  {data?.teams?.map((item, key) => (
                    <option value={item.id} key={key}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="time2">Segundo Time</CFormLabel>
                <CFormSelect
                  id="time2"
                  onChange={(data) => {
                    setTime2(data.target.value)
                  }}
                >
                  <option value={null} key={-1}>Selecione...</option>
                  {data?.teams?.map((item, key) => (
                    <option value={item.id} key={key}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="importante">Importante</CFormLabel>
                <br />
                <CCol md={3}>
                  <input
                    type="radio"
                    style={{ marginRight: 10 }}
                    value={true}
                    id="sim"
                    name="importante"
                    onClick={(data) => {
                      setImportante(data.target.value)
                    }}
                  />
                  <label htmlFor="sim"> Sim</label>
                </CCol>
                <CCol md={3}>
                  <input
                    type="radio"
                    value={false}
                    style={{ marginRight: 10 }}
                    id="nao"
                    name="importante"
                    defaultChecked
                    onClick={(data) => {
                      setImportante(data.target.value)
                    }}
                  />
                  <label htmlFor="nao"> Não</label>
                </CCol>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="data">Data</CFormLabel>
                <CFormInput
                  type="datetime-local"
                  id="data"
                  onChange={(data) => {
                    setData(data.target.value)
                  }}
                />
              </CCol>

              <CCol xs={12}>
                <CButton
                  type="button"
                  onClick={() => {
                    game()
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

export default Jogos
