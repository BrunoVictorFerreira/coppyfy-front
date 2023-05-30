import React, { useState, useEffect, ChangeEvent } from 'react'
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
  CInputGroup,
} from '@coreui/react'

import { CREATE_JOGADOR_RESULT, LIST_TEAMS } from '../../modules/graphql/game'
import { useMutation, useQuery } from '@apollo/client'
import io from 'socket.io-client'
import Swal from 'sweetalert2'
import { CadastroJogadorRequest } from '../../modules/auth/actions'

import { useDispatch, useSelector } from 'react-redux'

const socket = io('http://localhost:8081')

const Jogador = () => {
  const [jogador, setJogador] = useState(null)
  const [nome, setNome] = useState(null)
  const [numero, setNumero] = useState(null)
  const [time, setTime] = useState(null)
  const [file, setFile] = useState(null)
  const [importante, setImportante] = useState(false)
  const [dataState, setData] = useState(null)
  const dispatch = useDispatch()

  const [createJogador, { loadingResult }] = useMutation(CREATE_JOGADOR_RESULT, {
    fetchPolicy: 'no-cache',
  })

  const {
    loading: load,
    data: data,
    refetch: refetch,
    error: erro,
  } = useQuery(LIST_TEAMS, {
    fetchPolicy: 'no-cache',
  })

  const handleUploadClick = () => {
    if (time != null && nome != null && nome != '' && numero != null && numero != '' && file) {
      createJogador({
        variables: {
          team_id: time,
          nome,
          numero,
        },
      })
        .then((resp) => {
          if (!file) {
            return
          }

          const formData = new FormData()
          formData.append('file', file)
          formData.append('jogador_id', resp?.data?.create_jogador?.id)
          fetch('http://192.168.1.102:8000/api/upload-jogadores', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((result) => {
              Swal.fire({
                icon: 'success',
                title: 'Jogador salvo com sucesso!',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                window.location.reload()
              })
            })
            .catch((error) => {
              console.error('Error:', error)
            })
          console.log('resp', resp)
        })

        .catch(() => {})
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!',
      })
    }

    if (!file) {
      return
    }
  }

  const handleFileChange = (event) => {
    console.log(event.target.files[0])
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Novo Jogador</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Adicione um novo jogador</p>
            <CForm className="row g-3">
              <CCol md={12}>
                <CFormLabel htmlFor="time">Time</CFormLabel>
                <CFormSelect
                  id="time"
                  onChange={(data) => {
                    setTime(data.target.value)
                  }}
                >
                  <option value={null} key={-1}>
                    Selecione...
                  </option>
                  {data?.teams?.map((item, key) => (
                    <option value={item.id} key={key}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="nome">Nome</CFormLabel>
                <CFormInput
                  type="text"
                  id="nome"
                  onChange={(data) => {
                    setNome(data.target.value)
                  }}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="numero">Numero</CFormLabel>
                <CFormInput
                  type="text"
                  id="numero"
                  onChange={(data) => {
                    setNumero(data.target.value)
                  }}
                />
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="file">Foto</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="file"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    onChange={handleFileChange}
                  />
                </CInputGroup>
              </CCol>

              <CCol xs={12}>
                <CButton type="button" onClick={handleUploadClick}>
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

export default Jogador
