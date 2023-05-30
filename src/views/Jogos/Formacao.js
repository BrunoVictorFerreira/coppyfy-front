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

import { CREATE_FORMATION_RESULT, CREATE_INFORMATION_RESULT, LIST_MATCHS } from '../../modules/graphql/game'
import { useMutation, useQuery } from '@apollo/client'
import io from 'socket.io-client'
import Swal from 'sweetalert2'

const socket = io('http://localhost:8081')

const formacoes = [
  '1-1-8',
  '1-2-7',
  '2-2-6',
  '2-3-5',
  '3-3-4',
  '3-4-3',
  '3-5-2',
  '3-6-1',
  '4-1-3-2',
  '4-2-3-1',
  '4-2-4',
  '4-3-3',
  '4-3-2-1',
  '4-4-2',
  '4-1-4-1',
  '4-5-1',
  '5-3-2',
]

const Formacao = () => {
  const [jogo, setJogo] = useState(null)
  const [informacaoIndex, setInformacaoIndex] = useState({})
  const [informacao, setInformacao] = useState([])
  const [indexRow, setIndexRow] = useState(0)
  const [arrayInteractor, setArrayInteractor] = useState([{}])
  const [firstFormation, setFirstFormation] = useState("")
  const [secondFormation, setSecondFormation] = useState("")

  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    console.log('informacao')
    console.log(informacao)
  }, [informacao])

  useEffect(() => {
    var first = dataMatch?.matchs?.find((item) => item.id == jogo)?.first_team_description[0]?.id
    var second = dataMatch?.matchs?.find((item) => item.id == jogo)?.second_team_description[0]?.id
  }, [jogo])

  const {
    loading: loadMatch,
    data: dataMatch,
    refetch: refetchMatch,
    error: erroMatch,
  } = useQuery(LIST_MATCHS, {
    fetchPolicy: 'no-cache',
  })

  const [createGameInformation, { loadingResult }] = useMutation(CREATE_FORMATION_RESULT, {
    fetchPolicy: 'no-cache',
  })

  const gameResult = () => {
    if (jogo != null && firstFormation != "") {
      createGameInformation({
        variables: {
          match_id: jogo,
          first_team: parseInt(
            dataMatch?.matchs?.find((item) => item.id == jogo)?.first_team_description[0]?.id,
          ),
          second_team: parseInt(
            dataMatch?.matchs?.find((item) => item.id == jogo)?.second_team_description[0]?.id,
          ),
          first_formation: firstFormation,
          second_formation: secondFormation,
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
              <CCol md={12}>
                <CRow>
                  <CCol md={6}>
                    <CFormLabel style={{ alignSelf: 'center' }} htmlFor="descricao">
                      Formação Time 1{' '}
                    </CFormLabel>
                    <CFormSelect
                      id="jogo"
                      onChange={(data) => {
                        setFirstFormation(data.target.value)
                      }}
                    >
                      <option value={""} key={-1}>
                        Selecione...
                      </option>
                      {formacoes?.map((item, key) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel style={{ alignSelf: 'center' }} htmlFor="descricao">
                      Formação Time 2{' '}
                    </CFormLabel>
                    <CFormSelect
                      id="jogo"
                      onChange={(data) => {
                        setSecondFormation(data.target.value)
                      }}
                    >
                      <option value={""} key={-1}>
                        Selecione...
                      </option>
                      {formacoes?.map((item, key) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
              </CCol>
            </CForm>
            <CButton
              type="button"
              style={{
                marginTop: 40,
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

export default Formacao
