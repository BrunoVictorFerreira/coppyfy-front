import React, { useState, useMemo, useEffect } from 'react'
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
  CREATE_GAME_HISTORIC,
  CREATE_MESSAGE_OPERATOR,
  LIST_MATCHS,
  MENSAGENS_SUPORTE,
} from '../../modules/graphql/game'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import io from 'socket.io-client'
import Swal from 'sweetalert2'
import moment from 'moment/moment'

const socket = io('http://localhost:8081')

const Suporte = () => {
  const [jogo, setJogo] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [mensagens, setMensagens] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [usuarioSelected, setUsuarioSelected] = useState(null)
  const [suporteId, setSuporteId] = useState(null)

  const [getData, { loading, data }] = useLazyQuery(MENSAGENS_SUPORTE)

  useEffect(() => {
    console.log(suporteId)
  }, [suporteId])

  useEffect(() => {
    getData()
    socket.on('enviar_mensagem_response', (data) => {
      console.log('caiu')
      console.log(data.payload)
      
        var array = []
        
        setSuporteId(data.payload.id)
        data.payload.mensagens_suporte?.map((mensagem) => {
          array.push({
            id: mensagem.usuario_id,
            usuario:
              mensagem.usuario_id === data.payload.usuario_id ? data.payload?.usuario?.name : data.payload?.operador?.name,
            tipo: mensagem.usuario_id === data.payload.usuario_id ? 'Usuario' : 'Operador',
            message: mensagem.mensagem,
            date: mensagem.created_at,
          })
        })

        // array.push(data.payload)
        console.log('array')
        console.log(array)
        setMensagens(array)
    
    })
  }, [])

  useEffect(() => {
    console.log('usuarioSelected', usuarioSelected)
    if (usuarioSelected != null) {
      if (data?.mensagens_suporte_operador?.length > 0) {
        var array = []
        data?.mensagens_suporte_operador
          ?.filter((item) => item.usuario.id == usuarioSelected)
          ?.map((item) => {
            setSuporteId(item.id)
            item.mensagens_suporte?.map((mensagem) => {
              array.push({
                id: mensagem.usuario_id,
                usuario:
                  mensagem.usuario_id === item.usuario.id
                    ? item?.usuario?.name
                    : item?.operador?.name,
                tipo: mensagem.usuario_id === item.usuario.id ? 'Usuario' : 'Operador',
                message: mensagem.mensagem,
                date: mensagem.created_at,
              })
            })
          })
        // array.push(data.payload)
        console.log('array')
        console.log(array)
        setMensagens(array)
      }
    }
  }, [usuarioSelected])

  useEffect(() => {
    console.log('data')
    console.log(data?.mensagens_suporte_operador)
    if (data?.mensagens_suporte_operador?.length > 0) {
      var usuariosArray = []
      data?.mensagens_suporte_operador?.map((item) => {
        usuariosArray.push({
          id: item.usuario.id,
          usuario: item.usuario.name,
        })
      })
      // array.push(data.payload)
      console.log('usuariosArray')
      console.log(usuariosArray)
      setUsuarios(usuariosArray)
    }
  }, [data])

  function filtrarArray(array, id) {
    return array.filter(function (val) {
      return val.id === id
    })
  }

  const [createMessageSupport, { loadingResult }] = useMutation(CREATE_MESSAGE_OPERATOR, {
    fetchPolicy: 'no-cache',
  })

  function enviarMensagem() {
    if (mensagem != '') {
      createMessageSupport({
        variables: {
          usuario_id: parseInt(2),
          mensagem: mensagem,
          suporte_id: parseInt(suporteId),
        },
      }).then((resp) => {
        socket.emit('enviar_mensagem')
        console.log('data')
        console.log(resp.data.create_suporte_operador)

        console.log('data2')
        console.log(resp?.data?.create_suporte_operador)
        var array = []

        setSuporteId(resp?.data?.create_suporte_operador?.id)
        resp?.data?.create_suporte_operador.mensagens_suporte?.map((mensagem) => {
          array.push({
            id: mensagem.usuario_id,
            usuario:
              mensagem.usuario_id === resp?.data?.create_suporte_operador.usuario.id
                ? resp?.data?.create_suporte_operador?.usuario?.name
                : resp?.data?.create_suporte_operador?.operador?.name,
            tipo:
              mensagem.usuario_id === resp?.data?.create_suporte_operador.usuario.id
                ? 'Usuario'
                : 'Operador',
            message: mensagem.mensagem,
            date: mensagem.created_at,
          })
        })
        setMensagens(array)
        setMensagem('')
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Preencha a mensagem!',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    // setMensagem("")
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Suporte ao usuário</strong>
          </CCardHeader>
          <CCardBody>
            {/* <p className="text-medium-emphasis small">Adicione um novo historico de jogo</p> */}
            <CForm className="row g-3">
              <CCol md={12}>
                <CFormLabel htmlFor="jogo">Usuário</CFormLabel>
                <CFormSelect
                  id="jogo"
                  onChange={(data) => {
                    setUsuarioSelected(data.target.value)
                    getData()
                  }}
                >
                  <option value={null} key={-1}>
                    Selecione...
                  </option>
                  {usuarios?.map((item, key) => (
                    <option value={item.id} key={key}>
                      {item.usuario}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              {/* <CCol md={12}>
                <CFormLabel htmlFor="descricao">Descrição</CFormLabel>

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
              </CCol> */}
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="mb-4 p-5">
          {mensagens?.length > 0 &&
            mensagens
              ?.filter((item) => item.id == usuarioSelected || item.id == 2)
              ?.map((item, key) => (
                <div key={key}>
                  {item.tipo == 'Usuario' ? (
                    <div
                      style={{
                        padding: '25px 15px',
                        marginBottom: 20,
                        width: '60%',
                        backgroundColor: '#321fdb',
                        borderRadius: 20,
                      }}
                    >
                      <h6
                        style={{
                          padding: 5,
                          color: 'white',
                          fontWeight: 'bold',
                          borderBottom: '1px solid white',
                        }}
                      >
                        {item.usuario}
                      </h6>
                      <p style={{ paddingLeft: 15, color: 'white' }}>{item.message}</p>
                      <small style={{ float: 'right', color: 'white' }}>{item.date}</small>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '25px 15px',
                        width: '60%',
                        backgroundColor: '#321fdb',
                        borderRadius: 20,
                        float: 'right',
                        marginBottom: 20,
                      }}
                    >
                      <h6
                        style={{
                          padding: 5,
                          color: 'white',
                          fontWeight: 'bold',
                          borderBottom: '1px solid white',
                        }}
                      >
                        {item.usuario}
                      </h6>
                      <p style={{ paddingLeft: 15, color: 'white' }}>{item.message}</p>
                      <small style={{ float: 'right', color: 'white' }}>{item.date}</small>
                    </div>
                  )}
                </div>
              ))}
          {usuarioSelected != null && !isNaN(usuarioSelected) && (
            <>
              <CFormInput
                type="text"
                id="numero"
                placeholder="Digite aqui a sua mensagem..."
                style={{ marginTop: 20 }}
                onChange={(data) => {
                  setMensagem(data.target.value)
                }}
              />
              <CButton
                style={{ marginTop: 20 }}
                type="button"
                onClick={() => {
                  enviarMensagem()
                }}
              >
                Registrar
              </CButton>
            </>
          )}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Suporte
