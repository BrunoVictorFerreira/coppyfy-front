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

import { CREATE_INFORMATION_RESULT, LIST_MATCHS } from '../../modules/graphql/game'
import { useMutation, useQuery } from '@apollo/client'
import io from 'socket.io-client'
import Swal from 'sweetalert2'

const socket = io('http://localhost:8081')

const InformacaoPartida = () => {
  const [jogo, setJogo] = useState(null)
  const [informacaoIndex, setInformacaoIndex] = useState({})
  const [informacao, setInformacao] = useState([])
  const [indexRow, setIndexRow] = useState(0)
  const [arrayInteractor, setArrayInteractor] = useState([{}])

  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    console.log("informacao")
    console.log(informacao)
  }, [informacao])

  useEffect(() => {
    var first = dataMatch?.matchs?.find(item => item.id == jogo)?.first_team_description[0]?.id
    var second = dataMatch?.matchs?.find(item => item.id == jogo)?.second_team_description[0]?.id
  }, [jogo])

  const {
    loading: loadMatch,
    data: dataMatch,
    refetch: refetchMatch,
    error: erroMatch,
  } = useQuery(LIST_MATCHS, {
    fetchPolicy: 'no-cache',
  })

  const [createGameInformation, { loadingResult }] = useMutation(CREATE_INFORMATION_RESULT, {
    fetchPolicy: 'no-cache',
  })

  const gameResult = () => {
    if (jogo != null && informacao?.length > 0) {
      createGameInformation({
        variables: {
          match_id: jogo,
          first_team: parseInt(dataMatch?.matchs?.find(item => item.id == jogo)?.first_team_description[0]?.id),
          second_team: parseInt(dataMatch?.matchs?.find(item => item.id == jogo)?.second_team_description[0]?.id),
          informacoes: JSON.stringify(informacao),
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
            // socket.emit('adicionar_historico_jogo', resp)
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

  const addNewRow = () => {
    if (
      informacaoIndex?.descricao != undefined &&
      informacaoIndex?.first_team != undefined &&
      informacaoIndex?.second_team != undefined
    ) {
      setInformacao([...informacao, informacaoIndex])
      setIndexRow(indexRow + 1)
      var dump = [...arrayInteractor, {}]
      setArrayInteractor(dump)
      setInformacaoIndex([])
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
            <p className="text-medium-emphasis small">Adicione uma nova informação de jogo</p>
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
                  {dataMatch?.matchs
                    ?.filter((item) => item.finalizado == false)
                    ?.map((item, key) => (
                      <option value={item.id} key={key}>
                        {item.first_team_description[0].name} X{' '}
                        {item.second_team_description[0].name}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
              {arrayInteractor.map((teste, key) => (
                <CCol md={12} key={key}>
                  <CRow>
                    <CCol md={4}>
                      <CFormLabel style={{ alignSelf: 'center' }} htmlFor="descricao">
                        Descricao{' '}
                      </CFormLabel>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel style={{ alignSelf: 'center' }} htmlFor="descricao">
                        Time 1{' '}
                      </CFormLabel>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel style={{ alignSelf: 'center' }} htmlFor="descricao">
                        Time 2{' '}
                      </CFormLabel>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={4}>
                      <CFormInput
                        type="text"
                        disabled={key != arrayInteractor.length - 1}
                        id="descricao"
                        onChange={(data) => {
                          setInformacaoIndex({
                            ...informacaoIndex,
                            descricao: data.target.value,
                          })
                        }}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormInput
                        type="text"
                        disabled={key != arrayInteractor.length - 1}
                        id="descricao"
                        onChange={(data) => {
                          setInformacaoIndex({
                            ...informacaoIndex,
                            first_team: data.target.value,
                          })
                        }}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormInput
                        type="text"
                        disabled={key != arrayInteractor.length - 1}
                        id="descricao"
                        onChange={(data) => {
                          setInformacaoIndex({
                            ...informacaoIndex,
                            second_team: data.target.value,
                          })
                        }}
                      />
                    </CCol>
                    {key == arrayInteractor.length - 1 && (
                      <CCol xs={2}>
                        <CButton
                          type="button"
                          onClick={() => {
                            addNewRow()
                          }}
                        >
                          Adicionar
                        </CButton>
                      </CCol>
                    )}
                  </CRow>
                </CCol>
              ))}
            </CForm>
            <CButton
              type="button"
              style={{
                marginTop: 40
              }}
              onClick={() => {
                gameResult()
                // addNewRow()
              }}
            >
              Registrar Informação
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default InformacaoPartida
