import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Lobby from './Lobby';
import Sala from './Sala';


const ConfiguraVideoChat = () => {

    const [usuario, setUsuario] = useState('');
    const [nomeSala, setNomeSala] = useState('');
    const [tokenTwilio, setTokenTwilio] = useState(null);
    const [update, salasUpdates] = useState(null);

    const handleNomeUsuario = useCallback(event => {
        setUsuario(event.target.value);
    }, []);

    const handleNomeSala = useCallback(event => {
        setNomeSala(event.target.value);
    }, []);

    useEffect(() => {
        fetch('/lista_salas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(salas => console.log(salas.rooms));

    }, [ update ]);

    const handleSubmit = useCallback(
    async event => {
                event.preventDefault();
                const data = await fetch('/video/token', {
                    method: 'POST',
                    body: JSON.stringify({
                    identity: usuario,
                    room: nomeSala
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
                }).then(res => res.json());
                setTokenTwilio(data.token);
           }, [usuario, nomeSala]);



    const handleLogout = useCallback(event => {
       setTokenTwilio(null);
    }, []);

  let render;
  if (tokenTwilio) {
    render = (
      <Sala roomName={nomeSala} token={tokenTwilio} handleLogout={handleLogout} handleUpdateSalas={handleUpdateSalas}/>
    );
  } else {
      render = (
          <Lobby
              username={usuario}
              roomName={nomeSala}
              handleUsernameChange={handleNomeUsuario}
              handleRoomNameChange={handleNomeSala}
              handleSubmit={handleSubmit}
          />
      );
  }
  return render;
};


export default ConfiguraVideoChat;
